# Guía de Comandos CANACO App

comandos necesarios para el desarrollo, compilación y despliegue de la aplicación

## 1. Instalación y Configuración Inicial
```bash
# Instalar dependencias (Recomendado usar yarn para evitar conflictos)
yarn install

# Iniciar sesión en Expo (Solo la primera vez)
npx eas-cli login
```

## 2. Desarrollo con Expo Go
```bash
# Iniciar servidor local
npx expo start

# Iniciar con túnel (útil para pruebas en redes distintas o datos móviles)
npx expo start --tunnel

# Limpiar caché si hay errores extraños
npx expo start -c
```

## 3. Emuladores y Dispositivos
```bash
# Abrir en emulador de Android (debe estar abierto antes)
a

# Abrir en simulador de iOS (solo en Mac)
i

# Recargar app en el emulador
r
```

## 4. Compilación de APK (Android - Pruebas)
```bash
# Generar APK local (requiere Android Studio configurado)
npx eas build --platform android --profile preview --local

# Generar APK en la nube (EAS Cloud)
npx eas build --platform android --profile preview
```

## 5. Compilación para Producción (Tiendas)

### Android (Play Store - .aab)
```bash
# Generar bundle para Play Store
npx eas build --platform android --profile production
```

### iOS (App Store - .ipa)
```bash
# Generar build para App Store
npx eas build --platform ios --profile production
```

## 6. Variables de Entorno (Secrets)
Para no exponer llaves en el código ni en `eas.json`:
1. Ve a [expo.dev](https://expo.dev).
2. Entra a tu proyecto -> **Settings** -> **Secrets**.
3. Agrega tus variables del `.env` (Ej: `API_URL`, `MAPS_KEY`).
4. EAS las inyectará automáticamente durante el build en la nube.

## 7. Publicación y Envío a Tiendas
```bash
# Subir el último build de Android a Play Store
npx eas submit --platform android --path ./ruta-del-archivo.aab

# Subir el último build de iOS a App Store
npx eas submit --platform ios
```

## 8. Comandos Útiles de Mantenimiento
```bash
# Revisar versiones de paquetes compatibles con Expo
npx expo install --check

# Corregir automáticamente versiones de paquetes
npx expo install --fix
```

---
**Nota para iOS:** Si realizas cambios en los iconos o splash screen, recuerda que Apple es muy estricto con las dimensiones. Revisa la carpeta `./assets` antes de compilar.
