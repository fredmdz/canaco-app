# Guía para Subir a Play Store y App Store

## 📱 Checklist Pre-Lanzamiento

Tu aplicación ya cumple con los requisitos críticos de Apple y Google:

- ✅ Política de Privacidad
- ✅ Términos de Servicio  
- ✅ Función de eliminar cuenta
- ✅ Función de recuperación de contraseña
- ✅ Permisos solicitados apropiadamente
- ✅ Credenciales protegidas
- ✅ Validación de formularios

---

## 🔗 PASO 1: Crear URLs para Políticas

Sube los documentos a tu sitio web:

1. **Hosting de Políticas**
   - Option A: Sitio web propio (recomendado)
   - Option B: GitHub Pages (gratis)
   - Option C: Herramientas especializadas (Termly, iubenda)

### Ejemplo usando GitHub Pages (Gratis)

1. Crea un repositorio llamado `policies` en GitHub
2. Sube `PRIVACY_POLICY.md` y `TERMS_OF_SERVICE.md`
3. Habilita GitHub Pages:
   - Settings → Pages → Source: main branch
4. URLs públicas:
   - `https://tuusuario.github.io/policies/PRIVACY_POLICY.md`
   - `https://tuusuario.github.io/policies/TERMS_OF_SERVICE.md`

---

## 📝 PASO 2: Preparar Documentos para Suscripción

### Para Play Store (Google)

Copiar las URLs:
```
Política de privacidad: https://tudominio.com/privacy-policy
```

### Para App Store (Apple)

Nota: Apple requiere que la política esté disponible desde la app. Opciones:

**Option 1: Enlace web** (Más fácil)
```
App Privacy Policy URL: https://tudominio.com/privacy-policy
```

**Option 2: Dentro de la app** (Más control)
- Crear pantalla `VerPolitica` que muestre el contenido
- Enlazarla desde Opciones

---

## 🚀 PASO 3: Google Play Store

### 3.1 Crear Cuenta de Desarrollador
1. Ve a [Google Play Console](https://play.console.google.com/)
2. Paga $25 (única vez)
3. Acepta acuerdos

### 3.2 Crear tu Aplicación

1. Click en "Crear aplicación"
2. Nombre: "CANACO SERVYTUR TGZ"
3. Categoría: "Estilo de vida" o "Servicios"

### 3.3 Configuración de la Aplicación

**Información de la aplicación:**
```
Título: CANACO SERVYTUR TGZ
Descripción: 
Aplicación que conecta propietarios de mascotas con veterinarios, cursos y empresas afiliadas en tu zona.

Categoría: Estilo de vida

Clasificación de contenido: 
☑ Cuestionario de clasificación de contenido (COMPLETA)

Categoría de edad: Todos (13+)

Contacto: contacto@canaco-servytur.com
```

### 3.4 Pestaña **Almacenamiento de Datos**

Google Play ha añadido requisitos de privacidad:

1. ¿Recopila datos personales/sensibles? 
   - ✅ SÍ
   
2. ¿Qué datos?
   - ☑ Nombre
   - ☑ Email
   - ☑ Ubicación
   - ☑ Fotos
   - ☑ Teléfono

3. ¿Vende datos terceros?
   - ⭕ NO

4. ¿Encripta en tránsito?
   - ✅ SÍ (Firebase/SSL)

5. ¿Permite eliminar cuenta?
   - ✅ SÍ (En Opciones → Eliminar Cuenta)

### 3.5 Enlazar Política de Privacidad

En **Aplicación → Información de la aplicación → Enlaces obligatorios:**

```
Política de privacidad: https://tudominio.com/privacy-policy
```

### 3.6 Enlazar Términos de Servicio

En **Política de la aplicación:**
```
URL de los Términos de servicio: https://tudominio.com/terms-of-service
```

### 3.7 Versión Android en app.json

Verifica que sea correcta:
```json
{
  "android": {
    "package": "com.mashuezus.app",
    "versionCode": 15,
    "targetSdkVersion": 34
  }
}
```

**Incrementa `versionCode` cada actualización: 15 → 16 → 17**

### 3.8 Crear APK/AAB

```bash
# Instala EAS si no lo tienes
npm install -g eas-cli

# Build para Play Store (necesita Google Play key)
eas build --platform android

# O local (requiere Android Studio)
expo build:android
```

### 3.9 Subir a Play Store Console

1. Genera firma (signing)
2. Sube el `.aab` (Android App Bundle)
3. Espera validación (1-3 horas)

---

## 🍎 PASO 4: Apple App Store

### 4.1 Crear Cuenta de Desarrollador

1. Ve a [Apple Developer](https://developer.apple.com/)
2. Registra cuenta ($99/año)
3. Verifica correo

### 4.2 App Store Connect

1. Ve a [App Store Connect](https://appstoreconnect.apple.com/)
2. Click en "Mis Aplicaciones"
3. Click en "+"

### 4.3 Crear Nueva Aplicación

```
Nombre: CANACO SERVYTUR TGZ
ID de paquete: com.mashuezus.app
Bundle Identifier: com.mashuezus.app.ios
SKU: (único ID interno, ej: canaco-servytur-001)
Plataformas: iOS + iPadOS
```

### 4.4 Información de la Aplicación

**Información:**
```
Nombre: CANACO SERVYTUR TGZ
Descripción primaria:
Conecta propietarios de mascotas con veterinarios, servicios y empresas afiliadas en tu zona.

Categoría: Lifestyle
Subcategoría: Pets

Derechos de autor: ©2026 CANACO SERVYTUR TGZ
```

### 4.5 Preguntas de privacidad

Apple requiere responder:

**¿Recopila información personal?**
- ✅ Sí

**Información que recopila:**
- ☑ Nombre
- ☑ Email
- ☑ Ubicación
- ☑ Fotos
- ☑ Contact info

**¿Vende datos?**
- ⭕ No

**¿Encripta en tránsito?**
- ✅ Sí

**¿Permite eliminar datos/cuenta?**
- ✅ Sí (Opciones → Eliminar Cuenta)

### 4.6 Enlazar Política de Privacidad

En **Privacidad → URL de Política de privacidad:**
```
https://tudominio.com/privacy-policy
```

### 4.7 Clasificación de contenido

Completa el cuestionario:
- Violencia: Nulo
- Drogas: Nulo
- Contenido adulto: Nulo
- Resultado típico: 4+

### 4.8 Información de versión

```
Versión: 3.6.1 (o tu versión)
Descripción: Mejoras de seguridad y estabilidad

Build: Sube el .ipa generado por Expo
```

### 4.9 Información de contacto

```
Nombre: Tu nombre
Email: contacto@canaco-servytur.com
Teléfono: Tu teléfono
```

### 4.10 Crear Build para iOS

```bash
eas build --platform ios

# O simulación local (requiere Mac)
expo build:ios
```

### 4.11 Enviar a revisión

1. Sube el `.ipa`
2. Completa test information
3. Click "Enviar para revisión"
4. Espera 24-48 horas

---

## 📋 INFORMACIÓN REQUERIDA ANTES DE SUBIR

### Datos de Contacto
- [ ] Nombre de contacto
- [ ] Email de contacto
- [ ] Teléfono

### Legal
- [ ] Política de privacidad en URL pública
- [ ] Términos de servicio en URL pública

### Imágenes
- [ ] App icon (1024x1024)
- [ ] Screenshots (mínimo 2, máximo 5)
- [ ] Preview de la app (opcional)

### Información de la Empresa
- [ ] Razón social
- [ ] Dirección
- [ ] Teléfono comercial

---

## 🏠 HOSTING RECOMENDADO PARA POLÍTICAS

### Opción 1: GitHub Pages (GRATIS)

```bash
# 1. Crear repo publico: policies
# 2. Archivos formato HTML o Markdown
# 3. Settings > Pages > Enable
# 4. URL: https://tuusuario.github.io/policies/privacy-policy.html
```

### Opción 2: Netlify (GRATIS)

```bash
# 1. Conecta GitHub
# 2. Deploy automático
# 3. URL: https://tu-policies.netlify.app/privacy-policy
```

### Opción 3: Tu propio sitio

Si ya tienes un dominio web, simplemente sube los archivos `.md` o conviértelos a HTML.

---

## ✅ CHECKLIST FINAL

### Antes de enviar
- [ ] Configuré variables de entorno (.env)
- [ ] Política de Privacidad disponible en URL pública
- [ ] Términos de Servicio disponibles en URL pública
- [ ] App compila sin errores
- [ ] Testeé función de eliminar cuenta
- [ ] Testeé recuperación de contraseña
- [ ] Permisos están solicitados correctamente
- [ ] Información de contacto actualizada
- [ ] Screenshots preparados

### Play Store
- [ ] Cuenta de desarrollador activa ($25)
- [ ] Información de aplicación completada
- [ ] Almacenamiento de datos declarado
- [ ] Política de privacidad enlazada
- [ ] Build .aab generado y testado
- [ ] Versioncode incrementado

### App Store
- [ ] Cuenta de desarrollador activa ($99/año)
- [ ] Información de app completa
- [ ] Preguntas de privacidad respondidas
- [ ] Clasificación de contenido hecha
- [ ] Política de privacidad enlazada
- [ ] Build .ipa generado y testado
- [ ] Certificados de firma configurados

---

## 🔗 Enlaces Útiles

- [Google Play Console](https://play.console.google.com/)
- [Apple App Store Connect](https://appstoreconnect.apple.com/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)

---

## 📞 Soporte

Si tienes problemas:

1. **Google Play Help:** https://support.google.com/googleplay/
2. **Apple Developer Support:** https://developer.apple.com/contact/
3. **Expo Community:** https://forums.expo.dev/

---

**¡Felicidades! Tu app está lista para distribución! 🎉**

Tiempo estimado:
- Play Store: 1-3 horas para revisión
- App Store: 24-48 horas para revisión
