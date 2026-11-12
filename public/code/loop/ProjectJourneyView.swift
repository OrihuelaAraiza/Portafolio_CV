// Loop — source excerpt (not a standalone compilable file)
// Source: Loop/Features/Projects/ProjectJourneyView.swift, starting at line 299
// Local git commit: 2efd3c0eb40b5928eeb3b5e37647034bd947c269
// Captured version: November 2026. Whitespace adapted for presentation.

@Environment(\.dynamicTypeSize) private var typeSize
@Environment(\.accessibilityReduceMotion)
private var systemReduceMotion

private var gutter: CGFloat {
    typeSize.isAccessibilitySize ? 24 : 36
}
private var simple: Bool { project.attempts.count > 40 }
