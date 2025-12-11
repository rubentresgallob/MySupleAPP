# 🔧 Configurar URL del Backend en Flutter

## ⚡ Paso Crítico Antes de Ejecutar la App

Antes de ejecutar `flutter run`, **DEBES configurar la URL de tu backend**.

---

## 📍 Ubicación del Archivo

```
/home/ubuntu/supplement_app/flutter_app/lib/core/constants/api_constants.dart
```

---

## 🛠️ Configuración por Entorno

### Opción 1: Backend Desplegado en Producción (Recomendado)

Si ya desplegaste el backend usando el botón "Deploy" en DeepAgent:

```dart
class ApiConstants {
  // Cambia esta URL por la de tu backend desplegado
  static const String baseUrl = 'https://tu-backend-desplegado.abacus.ai';
  
  // ... resto del código
}
```

**Dónde encontrar tu URL desplegada:**
1. Después de desplegar, verás la URL en la UI de DeepAgent
2. Copia esa URL (sin el trailing slash)
3. Pégala en `baseUrl`

---

### Opción 2: Backend Local (Desarrollo)

#### Para Android Emulator:

```dart
static const String baseUrl = 'http://10.0.2.2:3000';
```

⚠️ **Importante**: `10.0.2.2` es la IP especial que apunta a `localhost` desde el emulador Android.

#### Para iOS Simulator:

```dart
static const String baseUrl = 'http://localhost:3000';
```

#### Para Dispositivo Físico:

1. Encuentra tu IP local:
   ```bash
   # Linux/Mac
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. Configura:
   ```dart
   static const String baseUrl = 'http://192.168.1.100:3000'; // Tu IP local
   ```

⚠️ **Nota**: Tu dispositivo y computadora deben estar en la misma red WiFi.

---

## ✅ Verificar Backend

Antes de ejecutar la app, verifica que el backend está funcionando:

```bash
# Si es local:
curl http://localhost:3000/api

# Si es producción:
curl https://tu-backend-desplegado.abacus.ai/api
```

Deberías ver la página de Swagger.

---

## 🚀 Después de Configurar

```bash
cd /home/ubuntu/supplement_app/flutter_app
flutter pub get
flutter run
```

---

## 🐛 Problemas Comunes

### Error: "Connection refused" o "Failed to connect"

**Causa**: URL incorrecta o backend no está corriendo.

**Solución**:
1. Verifica que el backend está corriendo
2. Verifica la URL en `api_constants.dart`
3. Si usas emulador Android, usa `http://10.0.2.2:3000`
4. Si usas dispositivo físico, usa tu IP local

### Error: "Bad certificate" o SSL error

**Causa**: Problema con HTTPS en desarrollo.

**Solución**: Usa HTTP en lugar de HTTPS para desarrollo local.

### Error: "401 Unauthorized" en /api

**Causa**: Esto es normal para endpoints protegidos sin token.

**Solución**: Registra un usuario desde la app y haz login.

---

## 📝 Ejemplo Completo

```dart
/// Constantes para la API del backend
class ApiConstants {
  // CAMBIAR ESTA URL SEGÚN TU ENTORNO
  // Producción:
  static const String baseUrl = 'https://supplement-backend.abacus.ai';
  
  // O desarrollo local (Android emulator):
  // static const String baseUrl = 'http://10.0.2.2:3000';
  
  // O desarrollo local (iOS simulator):
  // static const String baseUrl = 'http://localhost:3000';
  
  // O desarrollo local (dispositivo físico):
  // static const String baseUrl = 'http://192.168.1.100:3000';
  
  // Auth endpoints
  static const String register = '/auth/register';
  static const String login = '/auth/login';
  // ... resto del código
}
```

---

## ✅ Checklist

Antes de ejecutar la app:

- [ ] Backend está corriendo (local o desplegado)
- [ ] URL configurada en `api_constants.dart`
- [ ] URL verificada con curl o navegador
- [ ] Dependencias instaladas (`flutter pub get`)
- [ ] Dispositivo/emulador conectado (`flutter devices`)

---

¡Listo! Ahora puedes ejecutar `flutter run` 🚀
