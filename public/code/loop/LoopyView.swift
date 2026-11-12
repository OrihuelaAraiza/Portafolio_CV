// Loop — source excerpt (not a standalone compilable file)
// Source: Loop/Design/LoopyView.swift, starting at line 37
// Local git commit: 2efd3c0eb40b5928eeb3b5e37647034bd947c269
// Captured version: November 2026. Whitespace adapted for presentation.

private var motionEnabled: Bool {
    appeared && LoopyPresence.canAnimate(
        size: renderedSize,
        active: isActive,
        reduceMotion: motionReduced,
        foreground: scenePhase == .active
    )
}
