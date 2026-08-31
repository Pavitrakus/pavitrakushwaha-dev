export type WorkMark =
  | { kind: "favicon"; domain: string; alt: string }
  | { kind: "logo"; src: string; alt: string; contain?: boolean }
  | { kind: "yc" };

export type WorkItem = {
  slug: string;
  year: string;
  title: string;
  tag: string;
  oneLiner: string;
  mark: WorkMark;
  moreHref?: string;
  moreLabel?: string;
  also?: WorkMark[];
  body: string[];
};

export const work: WorkItem[] = [
  {
    slug: "vivacity",
    year: "2026",
    title: "vivacity, cpo",
    tag: "Runtime / Agents",
    oneLiner:
      "cofounder and cpo. simulation runtime for agents: create, observe, act, fork, verify, commit.",
    mark: { kind: "favicon", domain: "tryvivacity.com", alt: "Vivacity" },
    moreHref: "/projects/vivacity",
    moreLabel: "the stack and the live sim",
    body: [
      "i own product and the pipelines. aditya owns systems. tanish owns research. together we built a runtime an agent can treat like a world: persistent state, addressable forks, numerical checks, then a commit.",
      "the agent calls verbs. create(spec) compiles a domain schema into a live world. observe() returns state, or a camera if you asked for one. act(A_t) computes S_t+1. simulate(horizon) steps. fork() opens a branch without killing the parent. verify() runs conservation, clearance, units, contact. commit promotes a branch that passed. rollback restores the prior world.",
      "the router keeps the contract still and moves the work. exact physics when a conserved quantity exists. scientific solvers for chemistry, fluids, FEM. isaac and mujoco for contact. genie, cosmos, world labs, decart when the scene is visual and the law is fog. private plant models stay private.",
      "my job is the path from act() to a replayable trace. a verb is cheap. a verb that survives production is a pipeline that does not invent units at 3am. the long architecture and the toy two-body live on the project page.",
    ],
  },
  {
    slug: "iitk-mpc",
    year: "2026",
    title: "research fellow, iit kanpur",
    tag: "MPC / Crypto",
    oneLiner:
      "mpc and cryptography under prof. adithya vadapalli, cse. still 16. still in high school.",
    mark: { kind: "logo", src: "/iitk-logo.jpg", alt: "IIT Kanpur" },
    body: [
      "i sit in cse at iit kanpur as a research fellow under prof. adithya vadapalli. the brief is secure computation: how parties compute a function of private inputs and leak only the output.",
      "the work lives in the mpc stack. secret sharing, garbled circuits, oblivious transfer, the ugly constant factors that decide whether a protocol is a paper or a system. you care about rounds, communication, and what a semi-honest vs malicious adversary actually gets to see.",
      "i write, read, and break constructions the way you break production code. a protocol that looks clean in the hybrid model still has to survive a real network, real timing, real abort. that is the part that keeps me here.",
    ],
  },
  {
    slug: "nvidia-augonnet",
    year: "2026",
    title: "nvidia research, cédric augonnet",
    tag: "Runtimes / CUDA",
    oneLiner:
      "worked with cédric augonnet at nvidia research. runtimes, cuda task graphs, how work actually moves across devices.",
    mark: { kind: "favicon", domain: "nvidia.com", alt: "NVIDIA" },
    body: [
      "worked with cédric augonnet at nvidia research. he is a senior research scientist there. before that he designed starpu, the runtime that schedules tasks over cpus and accelerators with one data-aware scheduler. at nvidia that instinct lives in cuda: programming models, sequential task flow, graphs that actually move data.",
      "his public work is the neighborhood i sat in. cudastf (sc24, best paper finalist with alexandrescu, sidelnik, garland) is a sequential task-flow layer over cuda streams and graphs. you declare data, you declare tasks, the runtime wires the dependencies. i worked with him on that class of problem. the paper is his.",
      "same instinct as vivacity. a world that can fork and verify needs a scheduler that knows what is state and what is an observation. the pretty picture comes last.",
    ],
  },
  {
    slug: "openai-codex",
    year: "2026",
    title: "openai codex oss",
    tag: "Agents / OSS",
    oneLiner:
      "wrote into openai/codex. the coding agent labs actually run in a terminal.",
    mark: { kind: "favicon", domain: "openai.com", alt: "OpenAI" },
    body: [
      "openai/codex is the local coding agent: tools, a sandbox, a loop that reads your repo and does the boring work you would otherwise type by hand. i wrote into that oss. the interesting part is the loop.",
      "the model proposes a command, the runtime decides if it is allowed, stdout comes back as observation, the next step conditions on that. same contract as a world: observe, act, verify, commit.",
      "i care about the edges: approval boundaries, how diffs get applied, what gets logged so a human can reconstruct why the agent touched a file. that is the same paranoia i bring to vivacity pipelines.",
    ],
  },
  {
    slug: "inflection",
    year: "2026",
    title: "inflection grant",
    tag: "Grant",
    oneLiner:
      "$2k from edge city. the pool was jensen huang's leather jacket after sotheby's hit $960k.",
    mark: { kind: "favicon", domain: "edgecity.live", alt: "Edge City" },
    body: [
      "inflection grants are $2k to people under 25. edge city runs them. they want the weird, early, too-ambitious-for-a-spreadsheet version of you.",
      "the money in that pool came from jensen huang's tom ford leather jacket. sotheby's, 65 bids, 45 collectors, $960k. sixteen times the estimate. proceeds to the edge institute: fellowships, grants, popup villages.",
      "a jacket. a kid in kanpur. same ledger. hwahwhahwa. i put it into the runtime.",
    ],
  },
  {
    slug: "execron",
    year: "2026",
    title: "execron 1.0",
    tag: "Hackathon",
    oneLiner:
      "biggest hackathon in the state. elite campus iitk. $75k plus $2k cash, raised and paid by us.",
    mark: { kind: "logo", src: "/byteforge-logo.jpg", alt: "byteforge" },
    moreHref: "/projects/byteforge",
    moreLabel: "byteforge, the community under it",
    body: [
      "execron 1.0 was the flagship under byteforge. elite campus, iit kanpur. 24 hours. 290+ builders. people came in from kanpur, lucknow, allahabad, delhi.",
      "my team and i raised the whole thing. we paid it out: $75k plus $2k cash. no institutional sugar daddy. 2am calls, sponsors, logistics, the ugly work that makes a room exist.",
      "teams shipped web3, agri-tech, whatever they were actually angry about. the point was a city that only knows entrance exams getting a night where shipping was the exam.",
    ],
  },
  {
    slug: "supabase",
    year: "2026",
    title: "supabase content",
    tag: "Postgres / Content",
    oneLiner:
      "content with supabase. postgres, auth, rls. the load-bearing stuff people actually ship.",
    mark: { kind: "favicon", domain: "supabase.com", alt: "Supabase" },
    body: [
      "worked with supabase on content. the product is postgres with the batteries: auth, storage, realtime, edge functions, row level security sitting on the same identity the client already has.",
      "the interesting part is rls. a public anon key is a name tag. permission lives in the policy. every select/insert/update/delete needs one. a policy that lets you read still blocks writes until you say so. you test as anon, as the row owner, as some other user trying to swap the owner column. that is the whole security model and most tutorials skip it.",
      "i wrote for builders who are generating frontends with agents and then need a backend that will not fold. auth sessions, jwt claims into postgres, storage in the same tenancy. boring on purpose. boring is how you stay up.",
    ],
  },
  {
    slug: "prolearn",
    year: "2026",
    title: "prolearn, video pipeline",
    tag: "Edtech / Pipelines",
    oneLiner:
      "$3.2m pre-seed. walked in off the street. left building the video engine.",
    mark: {
      kind: "logo",
      src: "/prolearn-logo.svg",
      alt: "Prolearn",
      contain: true,
    },
    body: [
      "prolearn is bangalore edtech, $3.2m pre-seed, ravneet singh (ex vedantu cto, fc.one). k-12 and jee/neet, an ai-native tutor. we walked into the office unannounced. we walked out on the video pipeline.",
      "the job is turning a topic into a watchable explanation at a cost that does not make the unit economics cry. manim-class animation, a render farm that breaks at 3am, a script-to-scene path that has to keep notation honest. you cannot hallucinate a jacobian on a jee video.",
      "i care about the pipeline the same way i care about vivacity traces: inputs, intermediate graphs, a render you can replay when the output looks cursed. that walk-in is the bangalore trip. the engine is the work.",
    ],
  },
  {
    slug: "u2u",
    year: "2026",
    title: "uniform2unicorn, #1",
    tag: "Founder",
    oneLiner:
      "#1 of 3,500+. india's top young founder of the year '26. cash, credits, dinner with iqlipse nova.",
    mark: { kind: "logo", src: "/u2u-logo.png", alt: "Uniform2Unicorn" },
    body: [
      "uniform2unicorn, india's top young founder of the year '26. 3,500+ in the pool. we came first. team: aditya bhatia, tanish anand, me.",
      "the prize stack was rs. 1,00,000 cash, rs. 10,00,000 in credits, and a dinner with iqlipse nova. the ranking is a signal. the work is still the runtime, the lab, the events.",
    ],
  },
  {
    slug: "yc",
    year: "2026",
    title: "yc startup school india",
    tag: "YC",
    oneLiner: "y combinator startup school india. 6% acceptance.",
    mark: { kind: "yc" },
    body: [
      "selected for y combinator startup school india. 6% acceptance. the program is the boring, useful one: talk to users, ship, stop lying to yourself about the metric that matters.",
      "i already had the disease of shipping. the room just made it louder. batchmates, office hours energy, the specific yc allergy to a slide that cannot survive a customer.",
    ],
  },
  {
    slug: "vibecon",
    year: "2026",
    title: "vibecon, top 20",
    tag: "Builders",
    oneLiner:
      "top 20 in india out of 20,000+. interviewed mukund jha and jared friedman.",
    mark: { kind: "logo", src: "/vibecon-logo.png", alt: "VIBECON" },
    body: [
      "vibecon: 20,000+ builders, top 20 in india. the interesting part was the interviews. mukund jha (emergent labs) and jared friedman (yc partner).",
      "you learn more from asking a yc partner how they actually kill companies than from another demo day. same for a founder who has already been through the fire. i showed up with questions and a recorder in my head.",
    ],
  },
  {
    slug: "hackathons",
    year: "2026",
    title: "15+ hackathons",
    tag: "Competition",
    oneLiner: "google, deepmind, openai, cursor. two months. still counting.",
    mark: { kind: "favicon", domain: "google.com", alt: "Google" },
    also: [
      { kind: "favicon", domain: "deepmind.google", alt: "DeepMind" },
      { kind: "favicon", domain: "openai.com", alt: "OpenAI" },
      { kind: "favicon", domain: "cursor.com", alt: "Cursor" },
    ],
    body: [
      "fifteen plus in about two months, including ones from google, deepmind, openai, and cursor. the wins are real. the more useful residue is the muscle: a weekend, a constraint, a demo that has to boot.",
      "google and deepmind problems tend to want a model that generalizes. openai and cursor ones tend to want an agent that can use tools without lighting the repo on fire. i like both. one is evals and loss. the other is a tool loop with a policy.",
      "i stopped listing every trophy on the home page because it started looking like a sticker sheet. the work is still in the repos.",
    ],
  },
  {
    slug: "techfest-robowars",
    year: "2025",
    title: "techfest iit bombay, robowars 8kg",
    tag: "Hardware",
    oneLiner:
      "keynoted sparkx. won international robowars 8kg. shoutout tanish.",
    mark: { kind: "logo", src: "/techfest-logo.jpg", alt: "Techfest" },
    also: [{ kind: "favicon", domain: "iitb.ac.in", alt: "IIT Bombay" }],
    body: [
      "techfest iit bombay. i keynoted sparkx '25, then we won international robowars in 8kg. tanish on the bot with me.",
      "8kg is a nasty class. you get a drive train, a weapon, a battery budget, and a referee who will dq you for a wire that looks like a whip. the fight is won in the drivetrain and the weapon belt, in the hours you spend balancing torque against the moment the weapon takes a bite and the bot wants to flip.",
      "same lab instinct as a runtime: state, actuators, a world that hits back. lumenseed also came out of sparkx (1st). the arena and the medical-report model are different objects. the weekend was the same hunger.",
    ],
  },
  {
    slug: "bounties",
    year: "2026",
    title: "two bounties",
    tag: "Security",
    oneLiner:
      "major ai platform and a quick-commerce pricing api. 5-figure and 6-figure. they had mixed feelings.",
    mark: { kind: "favicon", domain: "github.com", alt: "security" },
    body: [
      "two independent finds. one on a major ai platform. one on a major quick-commerce pricing api. 5-figure and 6-figure respectively. their engineering teams had mixed feelings. i am not naming them here because i like sleeping.",
      "the short version is trust boundaries. a model with tools is an rpc surface. a cart total is not a suggestion. i reported, they paid, the holes closed. that is the whole transaction.",
    ],
  },
  {
    slug: "byteforge",
    year: "2025",
    title: "byteforge",
    tag: "Community",
    oneLiner:
      "founded it. 4,500+ members. north india's largest independent student tech community.",
    mark: { kind: "logo", src: "/byteforge-logo.jpg", alt: "byteforge" },
    moreHref: "/projects/byteforge",
    moreLabel: "the full writeup",
    body: [
      "kanpur had industry and entrance exams and almost no room for kids who wanted to ship. i got bored of waiting for a college to build a scene, so i built byteforge.",
      "discord, then a city. 4,500+ across discord, whatsapp, in-person. official hack club partner. workshops, showcases, mentorship matching, open source that actually gets merged.",
      "execron 1.0 is the loud chapter. the quiet one is a 16 year old in kanpur who now has somewhere to dump a half-broken project on a tuesday.",
    ],
  },
  {
    slug: "synthetic-intelligence",
    year: "2025",
    title: "synthetic intelligence paper",
    tag: "Research",
    oneLiner: "published at 16. intelligence as something you grow.",
    mark: { kind: "logo", src: "/iitk-logo.jpg", alt: "research" },
    body: [
      "i published a paper on synthetic intelligence at 16. most of what we ship as ai is a frozen mapping. si is the bet that you can grow a system whose dynamics stay open, coupled to a world, still adapting.",
      "state that persists, energy that has to balance, a loop with the environment. same instinct as vivacity. a clip is an observation. a world has to keep existing after the frame.",
      "i was 16. i still am. the paper is a stake in the ground.",
    ],
  },
  {
    slug: "kuku-tv",
    year: "2025",
    title: "kuku tv, content analyst",
    tag: "Media",
    oneLiner: "former content analyst. catalogs, taste, the pipeline before the model.",
    mark: { kind: "favicon", domain: "kukufm.com", alt: "KuKu" },
    body: [
      "former content analyst at kuku tv. the job is the unglamorous half of a media stack: what exists, how it is tagged, what should even be in the catalog, how a feed starts lying when the labels are junk.",
      "before you train anything you need a spine of metadata that a human would defend. i did that. it made me vicious about pipelines later. garbage labels in, a confident model out, and nobody can tell you why a kid got the wrong video.",
    ],
  },
];

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug);
}
