import { useGamepad } from "./hooks/useGamepad";
import { DualSenseController } from "./components/DualSenseController";
import { useState } from "react";
import "./App.css";

function App() {
  const gamepadState = useGamepad(16); // 60fps polling
  const [theme, setTheme] = useState<'default' | 'dark' | 'neon'>('default');
  const [scale, setScale] = useState(1);

  return (
    <div className="app-container">
      {/* Settings Bar */}
      <div className="settings-bar">
        <div className="setting-group">
          <label>Tema:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'default' | 'dark' | 'neon')}
          >
            <option value="default">DualSense Edge</option>
            <option value="dark">Oscuro</option>
            <option value="neon">Neon</option>
          </select>
        </div>

        <div className="setting-group">
          <label>Escala: {Math.round(scale * 100)}%</label>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
          />
        </div>
      </div>

      {/* Controller Overlay */}
      <div className="overlay-container">
        <DualSenseController
          gamepadState={gamepadState}
          theme={theme}
          scale={scale}
        />
      </div>

      {/* Debug Info (development only) */}
      {gamepadState.connected && (
        <div className="debug-info">
          <p>Control: {gamepadState.id.substring(0, 40)}...</p>
          <p>L-Stick: ({gamepadState.leftStick.x.toFixed(2)}, {gamepadState.leftStick.y.toFixed(2)})</p>
          <p>R-Stick: ({gamepadState.rightStick.x.toFixed(2)}, {gamepadState.rightStick.y.toFixed(2)})</p>
          <p>L2: {(gamepadState.l2 * 100).toFixed(0)}% | R2: {(gamepadState.r2 * 100).toFixed(0)}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
