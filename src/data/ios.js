// This content stays in the deferred iOS chunk, including its English copy.
export const sourceRoot = "/code/loop/";
export const chapters = [
  {
    id: "welcome",
    label: ["Empezar", "Begin"],
    title: [
      "Una bienvenida que deja espacio.",
      "A welcome that gives you room.",
    ],
    text: [
      "Un primer paso breve y saltable. La privacidad y el guardado local se explican antes de crear el primer proyecto.",
      "A brief, skippable first step. Privacy and local storage are explained before creating a first project.",
    ],
    tag: "SwiftUI · Onboarding",
    file: "Loop/Features/Onboarding/OnboardingView.swift",
  },
  {
    id: "resume",
    label: ["Retomar", "Resume"],
    title: [
      "Volver con una pista, a tu ritmo.",
      "Come back with a clue, at your own pace.",
    ],
    text: [
      "El próximo paso permanece junto al proyecto. La biblioteca conserva el contexto para volver sin rachas ni presión.",
      "The next step stays with the project. The library preserves context so you can return without streaks or pressure.",
    ],
    tag: "SwiftData · State",
    file: "Loop/Features/Projects/ProjectsView.swift",
  },
  {
    id: "journey",
    label: ["Recorrer", "Explore"],
    title: ["Los pequeños avances dejan huella.", "Small steps leave a trace."],
    text: [
      "Fotos, notas e ideas construyen un recorrido que abre en el presente. La interfaz se adapta al tamaño de texto y al movimiento reducido.",
      "Photos, notes and ideas form a journey that opens in the present. The interface adapts to text size and reduced motion.",
    ],
    tag: "SwiftUI · Dynamic Type",
    file: "Loop/Features/Projects/ProjectJourneyView.swift",
  },
];
export const decisions = [
  {
    id: "storage",
    label: ["Persistencia", "Persistence"],
    title: [
      "El éxito llega después de guardar.",
      "Success follows a saved change.",
    ],
    text: [
      "Los formularios editan valores temporales. El guardado es explícito; si falla, se revierte el contexto y se restauran las referencias de la interfaz. Las fotos se eliminan solo cuando ya no están referenciadas.",
      "Forms edit temporary values. Saving is explicit; on failure, the context rolls back and UI references are restored. Photos are removed only when they are no longer referenced.",
    ],
    file: "Loop/Persistence/LoopStore.swift",
    line: 376,
    code: "do { try persist(context); Self.dataRevision &+= 1 }\ncatch {\n    preparingRollback()\n    context.rollback()\n    restore()\n    context.processPendingChanges()\n    throw error\n}",
  },
  {
    id: "accessibility",
    label: ["Accesibilidad", "Accessibility"],
    title: [
      "La composición se adapta a la persona.",
      "The layout adapts to the person.",
    ],
    text: [
      "Dynamic Type cambia el espacio del recorrido. El movimiento se simplifica cuando la persona lo pide o cuando el historial es largo.",
      "Dynamic Type changes the journey’s spacing. Motion is simplified when requested or when the history is long.",
    ],
    file: "Loop/Features/Projects/ProjectJourneyView.swift",
    line: 299,
    code: "@Environment(\\.dynamicTypeSize) private var typeSize\n@Environment(\\.accessibilityReduceMotion)\nprivate var systemReduceMotion\n\nprivate var gutter: CGFloat {\n    typeSize.isAccessibilitySize ? 24 : 36\n}\nprivate var simple: Bool { project.attempts.count > 40 }",
  },
  {
    id: "motion",
    label: ["Movimiento", "Motion"],
    title: [
      "Una mascota que sabe cuándo descansar.",
      "A companion that knows when to rest.",
    ],
    text: [
      "Loopy tiene mirada, respiración y expresiones. Su animación depende de la visibilidad, el tamaño disponible, la actividad de la app y la preferencia de movimiento reducido.",
      "Loopy has gaze, breathing and expressions. Animation depends on visibility, available size, app activity and the reduced motion preference.",
    ],
    file: "Loop/Design/LoopyView.swift",
    line: 37,
    code: "private var motionEnabled: Bool {\n    appeared && LoopyPresence.canAnimate(\n        size: renderedSize,\n        active: isActive,\n        reduceMotion: motionReduced,\n        foreground: scenePhase == .active\n    )\n}",
  },
];
export const lab = [
  {
    id: "loopy",
    title: ["Loopy, con personalidad.", "Loopy, with personality."],
    text: [
      "Una celebración breve, con una alternativa tranquila.",
      "A brief celebration, with a quieter alternative.",
    ],
    src: "/videos/loop-loopy.mp4",
    poster: "/projects/loop/loopy-poster.webp",
    decision: "motion",
  },
  {
    id: "comparison",
    title: ["Comparar sin perder detalle.", "Compare without losing detail."],
    text: [
      "Dos fotos lado a lado; contenido apilado con texto grande.",
      "Two photos side by side; stacked content with larger text.",
    ],
    poster: "/projects/loop/comparison.webp",
    decision: "accessibility",
  },
  {
    id: "journey",
    title: ["Un hilo para cada avance.", "A thread for every step."],
    text: [
      "El trazo acompaña el recorrido y su próximo paso.",
      "A line accompanies the journey and its next step.",
    ],
    src: "/videos/loop-journey.mp4",
    poster: "/projects/loop/journey-es-light-normal.webp",
    decision: "motion",
  },
];
