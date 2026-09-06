export type Note = {
  slug: string;
  date: string;
  title: string;
  body: string[];
};

export const notes: Note[] = [
  {
    slug: "the-jacket-one",
    date: "2026-08-28",
    title: "the jacket one",
    body: [
      "the inflection grant landed this week. edge city gives $2k to builders under 25, and future cohorts are being supported by the $960k from jensen huang's signed leather jacket at sotheby's.",
      "i have repeated that sentence to three people and it gets funnier every time. a tom ford jacket changed hands in new york and some of the money reached a kid building a runtime in kanpur. hwahwhahwa. putting mine back into vivacity.",
    ],
  },
  {
    slug: "forked-before-breakfast",
    date: "2026-08-21",
    title: "forked a world before breakfast",
    body: [
      "the orbit stayed honest after i kicked it this morning, so breakfast had to wait. observe stored the state, act(+Δv) moved the eccentricity, and fork left five ghosts flying around the same mass. verify caught the branch with ugly energy drift inside the runtime, which is several million times cheaper than discovering it in a warehouse.",
      "aditya was deep in the architecture, tanish in the solvers, and i was wiring the trace the agent reads after every action. tryvivacity.com has the verbs. the longer stack can wait until my hands stop shaking from caffeine.",
    ],
  },
];

export function getNote(slug: string) {
  return notes.find((n) => n.slug === slug);
}
