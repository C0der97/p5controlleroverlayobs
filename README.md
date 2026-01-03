# 🎮 PS5 Input Overlay

Aplicación para mostrar visualmente los inputs del control DualSense (PS5) en tiempo real. Ideal para streaming y tutoriales.

![DualSense Edge](https://img.shields.io/badge/DualSense-Edge-blue) ![Tauri](https://img.shields.io/badge/Tauri-v2-orange) ![React](https://img.shields.io/badge/React-18-blue)

## ✨ Características

- 🎮 Visualización completa del DualSense (botones, joysticks, gatillos analógicos)
- 🎨 4 Temas: DualSense Edge, Oscuro, Neon, Realista
- 📏 Escala ajustable (50% - 150%)
- ✨ Animaciones de glow al presionar botones
- 📺 Página standalone para OBS Browser Source
- 💾 Ejecutable ligero para Windows/Linux (~5-10MB)

---

## 🚀 Requisitos Previos

### Linux (Ubuntu/Debian)

**1. Instalar Rust:**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source ~/.cargo/env

# Agregar a bashrc para que persista
echo 'source ~/.cargo/env' >> ~/.bashrc
```

**2. Instalar dependencias del sistema:**
```bash
sudo apt-get update
sudo apt-get install -y \
    pkg-config \
    libglib2.0-dev \
    libwebkit2gtk-4.1-dev \
    librsvg2-dev \
    libgtk-3-dev \
    libsoup-3.0-dev \
    libjavascriptcoregtk-4.1-dev \
    build-essential \
    curl \
    wget \
    file
```

### Windows

1. **Rust**: Descargar e instalar desde [rust-lang.org](https://www.rust-lang.org/tools/install)
2. **Visual Studio Build Tools**: Instalar con "Desktop development with C++"
   - Descargar desde [Visual Studio](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
3. **WebView2**: Generalmente ya viene con Windows 10/11

### macOS

```bash
# Instalar Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source ~/.cargo/env

# Instalar Xcode Command Line Tools
xcode-select --install
```

---

## 📦 Instalación del Proyecto

```bash
# Navegar al proyecto
cd ps5-input-overlay

# Instalar dependencias de npm
npm install
```

---

## 🔧 Desarrollo

### Modo desarrollo (solo frontend)

```bash
npm run dev
```

Esto abre:
- **App principal**: http://localhost:1420/
- **OBS Overlay**: http://localhost:1420/obs-overlay.html

### Modo desarrollo con Tauri (app de escritorio)

```bash
npm run tauri dev
```

> **Nota**: La primera vez descargará las dependencias de Rust, puede tomar varios minutos.

---

## 🏗️ Compilar Ejecutable

### Paso 1: Verificar que Rust está configurado

```bash
rustc --version
cargo --version
```

Si no funcionan, ejecuta:
```bash
source ~/.cargo/env
```

### Paso 2: Compilar

```bash
npm run tauri build
```

> **Nota**: La primera compilación puede tomar 5-15 minutos mientras descarga y compila las dependencias de Rust.

### Ubicación del ejecutable

| Sistema | Ruta |
|---------|------|
| Linux (binario) | `src-tauri/target/release/ps5-input-overlay` |
| Linux (AppImage) | `src-tauri/target/release/bundle/appimage/` |
| Linux (deb) | `src-tauri/target/release/bundle/deb/` |
| Windows (exe) | `src-tauri/target/release/ps5-input-overlay.exe` |
| Windows (msi) | `src-tauri/target/release/bundle/msi/` |

---

## 🔧 Solución de Problemas

### Error: "cargo not found"
```bash
source ~/.cargo/env
```

### Error: "pkg-config not found"
```bash
sudo apt-get install pkg-config
```

### Error: "glib-2.0 not found"
```bash
sudo apt-get install libglib2.0-dev
```

### Error: "webkit2gtk not found"
```bash
sudo apt-get install libwebkit2gtk-4.1-dev
```

### Reinstalar todas las dependencias (Linux)
```bash
sudo apt-get install -y pkg-config libglib2.0-dev libwebkit2gtk-4.1-dev librsvg2-dev libgtk-3-dev libsoup-3.0-dev libjavascriptcoregtk-4.1-dev build-essential
```

---

## 📺 Uso en OBS

1. Ejecuta `npm run dev` o la app compilada
2. En OBS, añade **Browser Source**
3. URL: `http://localhost:1420/obs-overlay.html`
4. Dimensiones: **520 x 400**
5. Selecciona tu tema en el dropdown

### URL Recomendada para Streaming

Para usar el tema **Realista** (botones rojos al presionar, fondo transparente):

```
http://localhost:1420/obs-overlay.html?theme=realistic&hideUI=true
```

---

## 🎮 Conexión del Control

1. Conecta tu DualSense vía **USB** o **Bluetooth**
2. Abre la aplicación
3. **Presiona cualquier botón** para activar la detección
4. ¡Listo!

---

## 📁 Estructura del Proyecto

```
ps5-input-overlay/
├── src/
│   ├── components/
│   │   ├── DualSenseController.tsx   # Componente visual SVG
│   │   └── DualSenseController.css   # Estilos y temas
│   ├── hooks/
│   │   └── useGamepad.ts             # Hook para Gamepad API
│   ├── App.tsx                       # App principal
│   └── App.css                       # Estilos globales
├── public/
│   └── obs-overlay.html              # Página standalone para OBS
└── src-tauri/                        # Código Rust de Tauri
```

---

## 🛠️ Tecnologías

- **Tauri v2** - Framework de apps de escritorio
- **React 18** - Librería de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **Gamepad API** - Captura de inputs

---

## 📄 Licencia

MIT
