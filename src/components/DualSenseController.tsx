import React from 'react';
import { GamepadState } from '../hooks/useGamepad';
import './DualSenseController.css';

interface DualSenseControllerProps {
    gamepadState: GamepadState;
    scale?: number;
    theme?: 'default' | 'dark' | 'neon';
}

export const DualSenseController: React.FC<DualSenseControllerProps> = ({
    gamepadState,
    scale = 1,
    theme = 'default'
}) => {
    const {
        cross, circle, square, triangle,
        l1, r1, l2, r2, l2Pressed, r2Pressed,
        dpadUp, dpadDown, dpadLeft, dpadRight,
        leftStick, rightStick,
        create, options, ps, touchpad
    } = gamepadState;

    return (
        <div
            className={`dualsense-container theme-${theme}`}
            style={{ transform: `scale(${scale})` }}
        >
            <svg
                viewBox="0 0 520 340"
                className="dualsense-svg"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Gradients */}
                    <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--body-light)" />
                        <stop offset="50%" stopColor="var(--body-main)" />
                        <stop offset="100%" stopColor="var(--body-dark)" />
                    </linearGradient>

                    <linearGradient id="gripGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--grip-dark)" />
                        <stop offset="50%" stopColor="var(--grip-main)" />
                        <stop offset="100%" stopColor="var(--grip-light)" />
                    </linearGradient>

                    <linearGradient id="gripGradientRight" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="var(--grip-dark)" />
                        <stop offset="50%" stopColor="var(--grip-main)" />
                        <stop offset="100%" stopColor="var(--grip-light)" />
                    </linearGradient>

                    <linearGradient id="touchpadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1a1a1a" />
                        <stop offset="100%" stopColor="#0a0a0a" />
                    </linearGradient>

                    <linearGradient id="stickGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--stick-light)" />
                        <stop offset="100%" stopColor="var(--stick-dark)" />
                    </linearGradient>

                    {/* Filters */}
                    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
                    </filter>

                    <filter id="innerShadow">
                        <feOffset dx="0" dy="2" />
                        <feGaussianBlur stdDeviation="2" result="offset-blur" />
                        <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                        <feFlood floodColor="black" floodOpacity="0.3" result="color" />
                        <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                        <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                    </filter>

                    <filter id="buttonGlow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Clip path for touchpad LEDs */}
                    <clipPath id="touchpadClip">
                        <rect x="185" y="95" width="150" height="75" rx="12" />
                    </clipPath>
                </defs>

                {/* Main Controller Body - More curved shape like DualSense */}
                <g filter="url(#softShadow)">
                    {/* Main white body */}
                    <path
                        d="M 50,140 
               C 30,160 25,200 35,250
               C 45,300 80,330 120,335
               C 150,338 170,320 185,290
               L 200,250
               C 210,220 240,200 260,200
               C 280,200 310,220 320,250
               L 335,290
               C 350,320 370,338 400,335
               C 440,330 475,300 485,250
               C 495,200 490,160 470,140
               C 440,100 380,70 260,70
               C 140,70 80,100 50,140
               Z"
                        fill="url(#bodyGradient)"
                        className="controller-body"
                    />

                    {/* Left Grip - Blue */}
                    <path
                        d="M 35,250
               C 25,200 30,160 50,140
               C 60,128 75,118 95,112
               L 105,115
               C 80,130 65,160 60,200
               C 55,240 65,280 85,310
               L 75,315
               C 50,300 42,280 35,250
               Z"
                        fill="url(#gripGradientLeft)"
                        className="grip grip-left"
                    />

                    {/* Right Grip - Blue */}
                    <path
                        d="M 485,250
               C 495,200 490,160 470,140
               C 460,128 445,118 425,112
               L 415,115
               C 440,130 455,160 460,200
               C 465,240 455,280 435,310
               L 445,315
               C 470,300 478,280 485,250
               Z"
                        fill="url(#gripGradientRight)"
                        className="grip grip-right"
                    />
                </g>

                {/* L2 Trigger */}
                <g className="trigger-group">
                    <rect
                        x="80" y="58"
                        width="65" height="22"
                        rx="6"
                        className={`trigger trigger-l2 ${l2Pressed ? 'pressed' : ''}`}
                    />
                    {/* Trigger pressure indicator */}
                    <rect
                        x="82" y="82"
                        width={61 * l2}
                        height="5"
                        rx="2"
                        className="trigger-bar"
                    />
                </g>

                {/* R2 Trigger */}
                <g className="trigger-group">
                    <rect
                        x="375" y="58"
                        width="65" height="22"
                        rx="6"
                        className={`trigger trigger-r2 ${r2Pressed ? 'pressed' : ''}`}
                    />
                    <rect
                        x="377" y="82"
                        width={61 * r2}
                        height="5"
                        rx="2"
                        className="trigger-bar"
                    />
                </g>

                {/* L1 Bumper */}
                <rect
                    x="80" y="90"
                    width="65" height="16"
                    rx="5"
                    className={`bumper bumper-l1 ${l1 ? 'pressed' : ''}`}
                />

                {/* R1 Bumper */}
                <rect
                    x="375" y="90"
                    width="65" height="16"
                    rx="5"
                    className={`bumper bumper-r1 ${r1 ? 'pressed' : ''}`}
                />

                {/* Touchpad - Black with LED effect */}
                <g className="touchpad-group">
                    <rect
                        x="185" y="95"
                        width="150" height="75"
                        rx="12"
                        className={`touchpad ${touchpad ? 'pressed' : ''}`}
                        fill="url(#touchpadGradient)"
                    />

                    {/* LED Dots Pattern - Animated */}
                    <g className="led-pattern" clipPath="url(#touchpadClip)">
                        {/* Left LED cluster */}
                        {[...Array(8)].map((_, row) => (
                            [...Array(6)].map((_, col) => (
                                <circle
                                    key={`led-l-${row}-${col}`}
                                    cx={210 + col * 8}
                                    cy={112 + row * 7}
                                    r="2"
                                    className="led-dot"
                                    style={{ animationDelay: `${(row + col) * 0.05}s` }}
                                />
                            ))
                        ))}
                        {/* Right LED cluster */}
                        {[...Array(8)].map((_, row) => (
                            [...Array(6)].map((_, col) => (
                                <circle
                                    key={`led-r-${row}-${col}`}
                                    cx={280 + col * 8}
                                    cy={112 + row * 7}
                                    r="2"
                                    className="led-dot"
                                    style={{ animationDelay: `${(row + col) * 0.05 + 0.3}s` }}
                                />
                            ))
                        ))}
                    </g>

                    {/* Touchpad divider line */}
                    <line x1="260" y1="100" x2="260" y2="165" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </g>

                {/* D-Pad - Cross style like the image */}
                <g className="dpad-group">
                    {/* D-Pad base */}
                    <circle cx="130" cy="175" r="35" className="dpad-base" />

                    {/* D-Pad Up */}
                    <path
                        d="M 120,150 L 140,150 L 140,165 L 145,165 L 130,145 L 115,165 L 120,165 Z"
                        className={`dpad-arrow dpad-up ${dpadUp ? 'pressed' : ''}`}
                    />

                    {/* D-Pad Down */}
                    <path
                        d="M 120,200 L 140,200 L 140,185 L 145,185 L 130,205 L 115,185 L 120,185 Z"
                        className={`dpad-arrow dpad-down ${dpadDown ? 'pressed' : ''}`}
                    />

                    {/* D-Pad Left */}
                    <path
                        d="M 100,165 L 100,185 L 115,185 L 115,190 L 95,175 L 115,160 L 115,165 Z"
                        className={`dpad-arrow dpad-left ${dpadLeft ? 'pressed' : ''}`}
                    />

                    {/* D-Pad Right */}
                    <path
                        d="M 160,165 L 160,185 L 145,185 L 145,190 L 165,175 L 145,160 L 145,165 Z"
                        className={`dpad-arrow dpad-right ${dpadRight ? 'pressed' : ''}`}
                    />
                </g>

                {/* Face Buttons - Outline style like image */}
                <g className="face-buttons">
                    {/* Triangle */}
                    <circle
                        cx="405" cy="130" r="17"
                        className={`face-button ${triangle ? 'pressed' : ''}`}
                    />
                    <polygon
                        points="405,117 394,140 416,140"
                        className={`face-icon triangle-icon ${triangle ? 'active' : ''}`}
                    />

                    {/* Circle */}
                    <circle
                        cx="435" cy="160" r="17"
                        className={`face-button ${circle ? 'pressed' : ''}`}
                    />
                    <circle
                        cx="435" cy="160" r="9"
                        className={`face-icon circle-icon ${circle ? 'active' : ''}`}
                    />

                    {/* Cross */}
                    <circle
                        cx="405" cy="190" r="17"
                        className={`face-button ${cross ? 'pressed' : ''}`}
                    />
                    <g className={`face-icon cross-icon ${cross ? 'active' : ''}`}>
                        <line x1="397" y1="182" x2="413" y2="198" />
                        <line x1="413" y1="182" x2="397" y2="198" />
                    </g>

                    {/* Square */}
                    <circle
                        cx="375" cy="160" r="17"
                        className={`face-button ${square ? 'pressed' : ''}`}
                    />
                    <rect
                        x="367" y="152" width="16" height="16" rx="1"
                        className={`face-icon square-icon ${square ? 'active' : ''}`}
                    />
                </g>

                {/* Left Analog Stick */}
                <g className="stick-group">
                    <circle
                        cx="170" cy="235" r="32"
                        className="stick-base"
                    />
                    <circle
                        cx="170" cy="235" r="28"
                        className="stick-ring"
                    />
                    <circle
                        cx={170 + leftStick.x * 12}
                        cy={235 + leftStick.y * 12}
                        r="22"
                        className={`stick ${leftStick.pressed ? 'pressed' : ''}`}
                        fill="url(#stickGradient)"
                    />
                    {/* Stick texture */}
                    <circle
                        cx={170 + leftStick.x * 12}
                        cy={235 + leftStick.y * 12}
                        r="18"
                        className="stick-texture"
                    />
                </g>

                {/* Right Analog Stick */}
                <g className="stick-group">
                    <circle
                        cx="350" cy="235" r="32"
                        className="stick-base"
                    />
                    <circle
                        cx="350" cy="235" r="28"
                        className="stick-ring"
                    />
                    <circle
                        cx={350 + rightStick.x * 12}
                        cy={235 + rightStick.y * 12}
                        r="22"
                        className={`stick ${rightStick.pressed ? 'pressed' : ''}`}
                        fill="url(#stickGradient)"
                    />
                    <circle
                        cx={350 + rightStick.x * 12}
                        cy={235 + rightStick.y * 12}
                        r="18"
                        className="stick-texture"
                    />
                </g>

                {/* Create Button (left of touchpad) */}
                <ellipse
                    cx="165" cy="115"
                    rx="12" ry="8"
                    className={`special-button ${create ? 'pressed' : ''}`}
                />

                {/* Options Button (right of touchpad) */}
                <ellipse
                    cx="355" cy="115"
                    rx="12" ry="8"
                    className={`special-button ${options ? 'pressed' : ''}`}
                />

                {/* Mic Button (below touchpad) */}
                <g className="mic-group">
                    <rect x="252" y="175" width="16" height="12" rx="3" className="mic-button" />
                    {/* Mic holes */}
                    <circle cx="256" cy="181" r="1.5" className="mic-hole" />
                    <circle cx="260" cy="181" r="1.5" className="mic-hole" />
                    <circle cx="264" cy="181" r="1.5" className="mic-hole" />
                </g>

                {/* PS Button */}
                <g className={`ps-button-group ${ps ? 'pressed' : ''}`}>
                    <circle
                        cx="260" cy="275" r="16"
                        className="ps-button"
                    />
                    {/* PS Logo simplified */}
                    <text x="260" y="279" className="ps-logo">󰐎</text>
                    <text x="260" y="280" className="ps-text">PS</text>
                </g>

                {/* USB-C Port indicator */}
                <rect x="255" y="295" width="10" height="4" rx="1" className="usb-port" />

                {/* Light bar at top - glowing blue */}
                <rect
                    x="190" y="72"
                    width="140" height="5"
                    rx="2"
                    className="lightbar"
                />
            </svg>

            {/* Connection Status */}
            <div className={`connection-status ${gamepadState.connected ? 'connected' : 'disconnected'}`}>
                <span className="status-dot"></span>
                {gamepadState.connected ? 'Conectado' : 'Conecta tu control DualSense'}
            </div>
        </div>
    );
};

export default DualSenseController;
