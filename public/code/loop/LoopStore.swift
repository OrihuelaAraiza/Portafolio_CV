// Loop — source excerpt (not a standalone compilable file)
// Source: Loop/Persistence/LoopStore.swift, starting at line 376
// Local git commit: 2efd3c0eb40b5928eeb3b5e37647034bd947c269
// Captured version: November 2026. Whitespace adapted for presentation.

do { try persist(context); Self.dataRevision &+= 1 }
catch {
    preparingRollback()
    context.rollback()
    restore()
    context.processPendingChanges()
    throw error
}
