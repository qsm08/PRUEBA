# EnglishMaster - App de Aprendizaje de Inglés (Sin Anuncios)

## Cómo generar tu APK en 5 minutos

### Prerrequisitos
1. **Flutter SDK**: Descarga e instala Flutter desde [flutter.dev](https://flutter.dev/docs/get-started/install)
2. **Android Studio** (o Android SDK): Instala el SDK de Android
3. **Android Virtual Device** (AVD) para probar

---

### Paso 1: Crear el proyecto de Flutter
Abre una terminal (PowerShell/CMD) en la carpeta `EnglishMaster_App` y ejecuta:

```bash
# Crear un proyecto nuevo
flutter create .

# Esto generará: pubspec.yaml, android/, ios/, lib/main.dart, etc.
```

### Paso 2: Reemplazar el código principal
Abre `lib/main.dart` y pega el contenido del archivo `src/main.dart` que he proporcionado. Este archivo contiene:
- El currículo embebido (A1 a C2)
- La interfaz de aprendizaje visual
- El sistema de puntuación y rachas (Streak)
- Barra de progreso superior (sin anuncios)

### Paso 3: Configurar pubspec.yaml (sin dependencias externas)
Asegúrate de que tu `pubspec.yaml` tenga:

```yaml
name: english_master
description: A no-ads English learning app like Duolingo
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter

dev_dependencies:
  flutter_test:
    sdk: flutter

flutter:
  uses-material-design: true
```

### Paso 4: Ejecutar y probar
```bash
# Ejecutar en el emulador
flutter run

# Para generar el APK de producción (release)
flutter build apk --release
```

### Paso 5: Buscar el APK
El archivo `.apk` se generará en:
`EnglishMaster_App/build/app/outputs/apk/release/app-release.apk`

---

## Técnicas de Aprendizaje Integradas

### 1. Spaced Repetition System (SRS)
Las palabras se muestran justo antes de que expire el intervalo de olvido, maximizando la retención.

### 2. Active Recall
No se muestra la respuesta directamente; el usuario debe recordarla y traducirla.

### 3. Progresión Scaffolding
- **A1 (Beginner):** Saludos y frases esenciales
- **A2 (Elementary):** Vida cotidiana y compras
- **B1 (Intermediate):** Viajes y situaciones independientes
- **B2 (Professional):** Reuniones de negocio y vocabulario técnico
- **C1 (Advanced):** Idiomas y expresiones idiomáticas

### 4. Gamificación sin Anuncios
- Sistema de rachas (Streaks)
- Puntos de experiencia
- Barra de progreso visual
- Feedback inmediato

---

## Estructura de la Carpeta

```
EnglishMaster_App/
├── README.md           # Este archivo
├── src/
│   ├── main.dart       # Código Flutter principal
│   ├── App.js          # Versión React Native (alternativa)
│   ├── curriculum.json # Datos del currículo
│   └── engine.js       # Motor de aprendizaje (SRS)
└── assets/             # Para imágenes y sonidos (opcional)
```

---

## Características de la App

✅ **Sin anuncios** - Interfaz limpia, sin interrupciones  
✅ **Progresión adaptativa** - De menor a mayor dificultad  
✅ **Visual y minimalista** - Interfaz similar a Duolingo  
✅ **Offline** - Todo el contenido está embebido  
✅ **Sin dependencias externas** - Solo usa Flutter nativo  
✅ **Racha diaria** - Motivación constante  

---

## Nota sobre el APK
Como IA, puedo escribir todo el código necesario pero no puedo "compilar" el archivo `.apk` directamente en este entorno. Sin embargo, siguiendo los pasos anteriores, podrás generar tu propio APK en menos de 5 minutos.