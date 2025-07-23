import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { getAuth } from 'firebase/auth';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function sendTokenToServer(expoPushToken, userId) {
  const backendUrl = ''; 

  if (!userId) {
    console.warn("No userId provided for sending Expo Push Token to backend. Skipping.");
    return;
  }

  try {
    const auth = getAuth();
    const user = auth.currentUser;
    let idToken = null;
    if (user) {
      idToken = await user.getIdToken();
    }

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(idToken && { 'Authorization': `Bearer ${idToken}` }),
      },
      body: JSON.stringify({
        expoPushToken: expoPushToken,
        userId: userId,
      }),
    });

    if (response.ok) {
      console.log('Expo Push Token enviado exitosamente al backend.');
    } else {
      console.error('Error al enviar el token al backend. Estado:', response.status);
      const errorData = await response.text();
      console.error('Detalles del error del backend:', errorData);
    }
  } catch (error) {
    console.error('Fallo la conexión al backend para enviar el token:', error);
  }
}

async function registerForPushNotificationsAsync(userId) {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'General Notifications',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Falló al obtener el token push para las notificaciones. Los permisos no fueron concedidos.');
      return;
    }

    try {
      const projectId = Constants?.expoConfig?.extra?.eas?.projectId;
      if (!projectId) {
        throw new Error('Project ID no encontrado en app.json. Por favor, configura EAS Build para notificaciones.');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log('Expo Push Token obtenido:', token);

      if (userId) {
        await sendTokenToServer(token, userId);
      } else {
        console.warn("Usuario no logeado. El token no será enviado al backend hasta que el usuario inicie sesión.");
      }

    } catch (e) {
      console.error(`Error al obtener o enviar el Expo Push Token: ${e}`);
      token = `Error: ${e}`;
    }
  } else {
    alert('Debes usar un dispositivo físico o un emulador/simulador configurado para Notificaciones Push (no Expo Go).');
  }

  return token;
}

export async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "¡Tienes un mensaje! 📬",
      body: 'Este es el cuerpo de la notificación local.',
      data: { someData: 'Aquí va información extra' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
    },
  });
}

export function useNotifications() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(undefined);

  useEffect(() => {
    const auth = getAuth();
    let unsubscribeAuth;

    unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        console.log('Firebase User Logged In:', userId);
        const token = await registerForPushNotificationsAsync(userId);
        if (token) {
          setExpoPushToken(token);
        }
      } else {
        console.log('Firebase User Logged Out. Not registering push token.');
        setExpoPushToken('');
      }
    });

    const notificationListener = Notifications.addNotificationReceivedListener(notif => {
      setNotification(notif);
      console.log('Notificación recibida en primer plano:', notif);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Usuario interactuó con la notificación:', response);
      const { data } = response.notification.request.content;

      if (data && data.eventType === 'newEvent' && data.eventId) {
        alert(`¡Notificación tocada! Navegando al evento con ID: ${data.eventId}`);
      } else if (data) {
        alert(`Notificación tocada con datos: ${JSON.stringify(data)}`);
      }
    });

    return () => {
      unsubscribeAuth && unsubscribeAuth();
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return { expoPushToken, notification };
}