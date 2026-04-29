# Configuración de Seguridad - CANACO SERVYTUR TGZ

## 🔒 Protección de Credenciales

Esta aplicación ha sido actualizada para proteger las credenciales sensibles de Firebase y otras APIs usando variables de entorno.

### ⚠️ IMPORTANTE: Variables de Entorno

**Nunca subas archivos `.env` a Git**, contienen credenciales sensibles.

## Pasos para Configurar

### 1. Crear archivo `.env` Local

En la raíz del proyecto (donde está `package.json`), crea un archivo llamado `.env`:

```bash
# Windows (PowerShell)
New-Item -Path .env -ItemType File

# Mac/Linux
touch .env
```

### 2. Copiar valores de `.env.example`

Abre `.env.example` y copia el contenido a `.env`:

```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_DATABASE_URL=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

### 3. Obtener tus credenciales de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Entra en tu proyecto "nuevo-ca802"
3. Haz clic en ⚙️ (Configuración del proyecto) en la esquina superior izquierda
4. Ve a "Configuración"
5. Desplázate a "Tus aplicaciones" y selecciona tu app
6. Copia el objeto `firebaseConfig`
7. Pega los valores en tu archivo `.env`

**Ejemplo:**
```
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyC_-nhp9IxWhx5IBtt6PWGTrSLiOMu5DZA
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=nuevo-ca802.firebaseapp.com
EXPO_PUBLIC_FIREBASE_DATABASE_URL=https://nuevo-ca802-default-rtdb.firebaseio.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=nuevo-ca802
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=nuevo-ca802.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=463796709710
EXPO_PUBLIC_FIREBASE_APP_ID=1:463796709710:web:285ba13da19306bd71961f
```

### 4. Verificar que `.gitignore` está actualizado

Asegúrate de que `.gitignore` contenga:
```
.env
.env.local
.env.*.local
```

Puedes verificar esto listando qué archivos Git va a incluir:
```bash
git status
```

El archivo `.env` NO debe aparecer en la lista.

## Uso en Desarrollo

Una vez configurado el archivo `.env`:

```bash
# Instala dependencias (si no lo has hecho)
npm install

# Ejecuta la app en desarrollo
npm start
# o
expo start
```

Expo cargará automáticamente las variables de `.env`.

## Variables de Entorno Disponibles

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `EXPO_PUBLIC_FIREBASE_API_KEY` | API Key de Firebase | ✅ Sí |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` | Auth Domain de Firebase | ✅ Sí |
| `EXPO_PUBLIC_FIREBASE_DATABASE_URL` | URL de base de datos Realtime | ✅ Sí |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | Project ID | ✅ Sí |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` | Storage Bucket | ✅ Sí |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Messaging Sender ID | ✅ Sí |
| `EXPO_PUBLIC_FIREBASE_APP_ID` | App ID | ✅ Sí |

## Para Producción / Build

### Android (Google Play Store)

1. Crea un archivo `.env.production`:
```
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
[etc]
```

2. Usa EAS Build:
```bash
eas build --platform android --env production
```

### iOS (App Store)

```bash
eas build --platform ios --env production
```

**Nota:** Asegúrate de que EAS tenga acceso seguro a tus variables. Puedes guardarlas de forma segura en la configuración de EAS.

## Seguridad Adicional

### Reducir exposición de claves (Recomendado)

Firebase permite crear claves de API con restricciones:

1. En Firebase Console → Configuración → APIs y servicios → Credenciales
2. Haz clic en tu clave de API
3. Bajo "Restricciones de aplicación", selecciona "Android" o "iOS"
4. Añade las restricciones de paquete/bundle

### Cloud Storage Rules

Añade reglas de seguridad en Firebase Firestore Console:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /afiliados/{document=**} {
      allow read: if request.auth != null;
      allow write: if false; // Solo admin puede escribir
    }
  }
}
```

## Troubleshooting

### Error: "Missing Firebase config"

**Causa:** Las variables de `.env` no se cargaron correctamente.

**Solución:**
1. Verifica que el archivo `.env` existe en la raíz del proyecto
2. Reinicia el servidor: `Ctrl+C` y ejecuta `npm start` nuevamente
3. Asegúrate de que no haya errores de typo en los nombres de variables

### Error: "Cannot find module ../config/firebaseConfig"

**Causa:** El archivo `config/firebaseConfig.js` no existe.

**Solución:**
- Verifica que el archivo existe en `config/firebaseConfig.js`
- Verifica que está importado correctamente en `services/servicesFirebase.js`

### Variables no se cargan

**Causa:** Expo sólo carga variables prefijadas con `EXPO_PUBLIC_`

**Solución:**
- Todas tus variables Firebase deben comenzar con `EXPO_PUBLIC_`
- Ejemplo: ✅ `EXPO_PUBLIC_FIREBASE_API_KEY` vs ❌ `FIREBASE_API_KEY`

## Después de estos cambios

✅ Tu aplicación ahora cumple con:
- ✅ Protección de credenciales
- ✅ Política de Privacidad
- ✅ Términos de Servicio
- ✅ Derecho a eliminar cuenta (ya existía)
- ✅ Recuperación de contraseña (ya existía)

**¡Lista para subir a Play Store y App Store!** 🎉

---

Para preguntas o soporte:
- Email: contacto@canaco-servytur.com
