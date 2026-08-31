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
      "inflection grant landed. that's the $2k edge city hands to people under 25, the pool jensen huang's leather jacket funded after sotheby's went feral at $960k.",
      "i keep saying the sentence out loud because it still sounds fake. a tom ford jacket. a kid in kanpur. same money.",
      "hwahwhahwa. anyway. putting it into the runtime.",
    ],
  },
  {
    slug: "forked-before-breakfast",
    date: "2026-08-21",
    title: "forked a world before breakfast",
    body: [
      "good day. the kind where the orbit stays honest after you kick it.",
      "hit observe, then act(+Δv), then fork until five ghosts were flying around the same mass. verify passed on the parent and died on the stupid branch, which is the whole point. you want the wrong future to fail in the runtime, not in a warehouse.",
      "aditya was in the architecture, tanish in the solvers, me on the pipeline that has to not lie when the agent asks what happened. tryvivacity.com if you want the verbs. i'll write the long stack when my hands stop shaking from caffeine.",
    ],
  },
];

export function getNote(slug: string) {
  return notes.find((n) => n.slug === slug);
}
