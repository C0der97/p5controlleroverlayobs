import { useState, useEffect, useCallback, useRef } from 'react';

export interface GamepadState {
    connected: boolean;
    id: string;
    // Face buttons
    cross: boolean;      // X
    circle: boolean;     // O
    square: boolean;     // □
    triangle: boolean;   // △
    // Shoulder buttons
    l1: boolean;
    r1: boolean;
    l2: number;         // 0-1 (analog trigger)
    r2: number;         // 0-1 (analog trigger)
    l2Pressed: boolean;
    r2Pressed: boolean;
    // D-Pad
    dpadUp: boolean;
    dpadDown: boolean;
    dpadLeft: boolean;
    dpadRight: boolean;
    // Sticks
    leftStick: { x: number; y: number; pressed: boolean };
    rightStick: { x: number; y: number; pressed: boolean };
    // Special buttons
    create: boolean;
    options: boolean;
    ps: boolean;
    touchpad: boolean;
}

const DEFAULT_STATE: GamepadState = {
    connected: false,
    id: '',
    cross: false,
    circle: false,
    square: false,
    triangle: false,
    l1: false,
    r1: false,
    l2: 0,
    r2: 0,
    l2Pressed: false,
    r2Pressed: false,
    dpadUp: false,
    dpadDown: false,
    dpadLeft: false,
    dpadRight: false,
    leftStick: { x: 0, y: 0, pressed: false },
    rightStick: { x: 0, y: 0, pressed: false },
    create: false,
    options: false,
    ps: false,
    touchpad: false,
};

// Button mapping for DualSense (Standard Gamepad API mapping)
const BUTTON_MAP = {
    cross: 0,
    circle: 1,
    square: 2,
    triangle: 3,
    l1: 4,
    r1: 5,
    l2: 6,
    r2: 7,
    create: 8,
    options: 9,
    leftStickPress: 10,
    rightStickPress: 11,
    dpadUp: 12,
    dpadDown: 13,
    dpadLeft: 14,
    dpadRight: 15,
    ps: 16,
    touchpad: 17,
};

export function useGamepad(pollRate: number = 16): GamepadState {
    const [state, setState] = useState<GamepadState>(DEFAULT_STATE);
    const rafRef = useRef<number | null>(null);
    const lastPollRef = useRef<number>(0);

    const updateGamepadState = useCallback(() => {
        const gamepads = navigator.getGamepads();
        const gamepad = gamepads[0]; // Use first connected gamepad

        if (!gamepad) {
            if (state.connected) {
                setState(DEFAULT_STATE);
            }
            return;
        }

        const buttons = gamepad.buttons;
        const axes = gamepad.axes;

        // Apply deadzone to analog sticks
        const applyDeadzone = (value: number, threshold: number = 0.1): number => {
            return Math.abs(value) < threshold ? 0 : value;
        };

        const newState: GamepadState = {
            connected: true,
            id: gamepad.id,
            // Face buttons
            cross: buttons[BUTTON_MAP.cross]?.pressed || false,
            circle: buttons[BUTTON_MAP.circle]?.pressed || false,
            square: buttons[BUTTON_MAP.square]?.pressed || false,
            triangle: buttons[BUTTON_MAP.triangle]?.pressed || false,
            // Shoulder buttons
            l1: buttons[BUTTON_MAP.l1]?.pressed || false,
            r1: buttons[BUTTON_MAP.r1]?.pressed || false,
            l2: buttons[BUTTON_MAP.l2]?.value || 0,
            r2: buttons[BUTTON_MAP.r2]?.value || 0,
            l2Pressed: buttons[BUTTON_MAP.l2]?.pressed || false,
            r2Pressed: buttons[BUTTON_MAP.r2]?.pressed || false,
            // D-Pad
            dpadUp: buttons[BUTTON_MAP.dpadUp]?.pressed || false,
            dpadDown: buttons[BUTTON_MAP.dpadDown]?.pressed || false,
            dpadLeft: buttons[BUTTON_MAP.dpadLeft]?.pressed || false,
            dpadRight: buttons[BUTTON_MAP.dpadRight]?.pressed || false,
            // Sticks
            leftStick: {
                x: applyDeadzone(axes[0] || 0),
                y: applyDeadzone(axes[1] || 0),
                pressed: buttons[BUTTON_MAP.leftStickPress]?.pressed || false,
            },
            rightStick: {
                x: applyDeadzone(axes[2] || 0),
                y: applyDeadzone(axes[3] || 0),
                pressed: buttons[BUTTON_MAP.rightStickPress]?.pressed || false,
            },
            // Special buttons
            create: buttons[BUTTON_MAP.create]?.pressed || false,
            options: buttons[BUTTON_MAP.options]?.pressed || false,
            ps: buttons[BUTTON_MAP.ps]?.pressed || false,
            touchpad: buttons[BUTTON_MAP.touchpad]?.pressed || false,
        };

        setState(newState);
    }, [state.connected]);

    const pollGamepad = useCallback((timestamp: number) => {
        if (timestamp - lastPollRef.current >= pollRate) {
            updateGamepadState();
            lastPollRef.current = timestamp;
        }
        rafRef.current = requestAnimationFrame(pollGamepad);
    }, [updateGamepadState, pollRate]);

    useEffect(() => {
        const handleConnect = () => updateGamepadState();
        const handleDisconnect = () => setState(DEFAULT_STATE);

        window.addEventListener('gamepadconnected', handleConnect);
        window.addEventListener('gamepaddisconnected', handleDisconnect);

        rafRef.current = requestAnimationFrame(pollGamepad);

        return () => {
            window.removeEventListener('gamepadconnected', handleConnect);
            window.removeEventListener('gamepaddisconnected', handleDisconnect);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [pollGamepad, updateGamepadState]);

    return state;
}
