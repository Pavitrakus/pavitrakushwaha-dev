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
  orgHref?: string;
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
    orgHref: "https://tryvivacity.com",
    moreHref: "/projects/vivacity",
    moreLabel: "the stack and the live sim",
    body: [
      "i run product and pipelines at vivacity with aditya on systems and tanish on research. we are building a runtime where an agent can keep a world alive long enough to inspect it, change it, fork a few futures, and choose one after the checks pass.",
      "the interface is a small set of verbs: create, observe, act, simulate, fork, verify, commit, rollback, render, route. underneath that sits persistent state and a domain schema. an agent can ask for pixels, arrays, telemetry, or whatever observation the task needs while the world keeps its own source of truth.",
      "routing is where this becomes useful. an orbit can stay in exact physics, contact can move to a robotics simulator, a materials problem can call a domain solver, and visual uncertainty can reach a learned world model. the shared contract keeps the trace readable across those backends.",
      "my side is the path from an action to a replayable trace. i work on the product surface, pipeline boundaries, and the boring details that stop units or state from quietly changing halfway through a run. the longer architecture and a small two-body world live on the project page.",
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
    orgHref: "https://www.iitk.ac.in/",
    body: [
      "i work with prof. adithya vadapalli in cse at iit kanpur as a research fellow. the problem is secure computation: several parties should be able to evaluate a function over private inputs and learn only what the protocol allows.",
      "that puts me around secret sharing, garbled circuits, oblivious transfer, adversary models, and the communication costs that decide whether a construction can leave the paper. round count matters. so does the exact point where a party can abort or infer something from timing.",
      "i like the part where a clean proof meets a real network. the protocol still has messages, delays, malformed inputs, and machines that disappear at the worst possible moment. i am 16, still in high school, and somehow this is where most of my reading goes.",
    ],
  },
  {
    slug: "nvidia-augonnet",
    year: "2026",
    title: "nvidia research, cédric augonnet",
    tag: "Runtimes / CUDA",
    oneLiner:
      "worked with cédric augonnet at nvidia research. programming systems, accelerators, and the people who make heterogeneous machines usable.",
    mark: { kind: "favicon", domain: "nvidia.com", alt: "NVIDIA" },
    orgHref: "https://research.nvidia.com/person/cedric-augonnet",
    body: [
      "i worked with cédric augonnet at nvidia research. cédric is a senior research scientist in programming languages, systems, and tools. he designed starpu during his phd, a runtime for scheduling task graphs across cpus and accelerators.",
      "his public work spans asynchronous programming models and gpu systems. cudastf is one example: a sequential task-flow interface over cuda streams and graphs where data dependencies shape execution. that paper and runtime are his work; my collaboration with him is a separate line on my own record.",
      "working around people who build runtimes changes how you look at a machine. kernels are the easy nouns. data movement, dependency ordering, placement, and failure are the grammar. that thinking followed me into vivacity.",
    ],
  },
  {
    slug: "openai-codex",
    year: "2026",
    title: "openai codex oss",
    tag: "Agents / OSS",
    oneLiner:
      "contributed to openai/codex, the open-source coding agent that lives in a terminal.",
    mark: { kind: "favicon", domain: "openai.com", alt: "OpenAI" },
    orgHref: "https://github.com/openai/codex",
    body: [
      "i contributed to openai/codex, the open-source coding agent. codex reads a repository, uses terminal tools, works inside a sandbox, and leaves a diff a human can inspect.",
      "the loop is simple enough to say out loud: the model proposes an action, policy decides whether it can run, the tool returns an observation, and the next step sees that result. the hard engineering lives around approvals, filesystem boundaries, logs, and the point where generated text becomes a real command.",
      "that is the part i keep coming back to. agents get useful when they can act, and they stay useful when a person can reconstruct what happened after the run.",
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
    orgHref: "https://www.inflectiongrants.com/",
    body: [
      "i got an inflection grant from edge city. it is $2k for builders under 25 who have something early enough that a small amount of money can still bend the path.",
      "the funny part is the pool. jensen huang signed one of his black leather jackets, sotheby's sold it for $960k, and the proceeds went to the edge institute programs that support these grants and fellowships.",
      "a jacket changed hands in new york and some of that money reached a 16 year old building a runtime in kanpur. hwahwhahwa. i put mine back into vivacity.",
    ],
  },
  {
    slug: "execron",
    year: "2026",
    title: "execron 1.0",
    tag: "Hackathon",
    oneLiner:
      "built execron 1.0 at iit kanpur. 24 hours, 290+ builders, $75k in prizes and credits plus $2k cash.",
    mark: { kind: "logo", src: "/byteforge-logo.jpg", alt: "byteforge" },
    orgHref: "/projects/byteforge",
    moreHref: "/projects/byteforge",
    moreLabel: "byteforge, the community under it",
    body: [
      "i organized execron 1.0 under byteforge at iit kanpur with my team. it ran as a workshop and 24-hour build sprint for school students during techkriti '26. more than 290 builders came through.",
      "we raised and distributed the prize pool ourselves: $75k across prizes and credits, plus $2k in cash. sponsors, mentors, rooms, food, power, judging, the calls at 2am when one line on a spreadsheet suddenly becomes a real problem.",
      "it became the biggest school hackathon we had seen in uttar pradesh. the part i remember is simpler: a room full of teenagers in kanpur shipping through the night because someone finally gave them the room.",
    ],
  },
  {
    slug: "supabase",
    year: "2026",
    title: "supabase content",
    tag: "Postgres / Content",
    oneLiner:
      "made technical content with supabase around the postgres stack builders actually ship.",
    mark: { kind: "favicon", domain: "supabase.com", alt: "Supabase" },
    orgHref: "https://supabase.com",
    body: [
      "i worked with supabase on technical content. the stack gives builders postgres, auth, storage, realtime, and edge functions without hiding the database underneath.",
      "row level security is where the product becomes real. the client can carry a public key because authorization lives in postgres policies tied to the session. reads and writes get separate rules, and every rule has to survive the obvious test: a different user changing the owner id and asking for someone else's row.",
      "good backend content should leave a builder with a working mental model. sessions become claims, claims reach postgres, policies decide what the query can touch, and storage follows the same identity. that chain is what i wrote around.",
    ],
  },
  {
    slug: "prolearn",
    year: "2026",
    title: "engineer",
    tag: "Edtech / Pipelines",
    oneLiner:
      "engineer on the video pipeline. ravneet singh: ex vedantu, founder of fc.one. walked in off the street.",
    mark: {
      kind: "logo",
      src: "/prolearn-logo.svg",
      alt: "Prolearn",
      contain: true,
    },
    orgHref: "https://prolearn.app",
    body: [
      "i walked into prolearn's bangalore office unannounced and ended up as an engineer on the video pipeline. ravneet singh founded the company after leading technology at vedantu and co-founding fc.one. prolearn had raised a $3.2m pre-seed and was turning jee and neet topics into generated lessons.",
      "a useful lesson needs a script, equations, scene timing, assets, voice, and a render that survives a student's pause button. the pipeline has to carry notation cleanly from the first structured output to the final frame. you cannot hallucinate a jacobian in a jee video and call it a style choice.",
      "that walk-in is in the bangalore note. the useful residue is the pipeline habit: keep every intermediate artifact, make a bad frame reproducible, and know which stage lied. i work with ravneet on stipend and credit, which is not enough to offset engine costs, and is heartening anyway.",
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
      "uniform2unicorn had more than 3,500 young founders in the pool. aditya bhatia, tanish anand, and i finished first and took india's top young founder of the year '26.",
      "the prize was rs. 1,00,000 cash, rs. 10,00,000 in credits, and dinner with iqlipse nova. we went back to the runtime after dinner.",
    ],
  },
  {
    slug: "yc",
    year: "2026",
    title: "yc startup school india",
    tag: "YC",
    oneLiner: "y combinator startup school india. 6% acceptance.",
    mark: { kind: "yc" },
    orgHref: "https://www.startupschool.org/",
    body: [
      "i was selected for y combinator startup school india in a cohort with a reported 6% acceptance rate.",
      "the useful part was being around founders who could tell when a metric was decorative. talk to users, ship, look at what came back, then do it again before the deck grows another page.",
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
      "vibecon started with more than 20,000 builders and i made the final 20 in india. i also got to interview mukund jha from emergent labs and jared friedman from y combinator.",
      "i showed up with a lot of questions. how they choose a market, how they notice a founder is lying to themselves, and which parts of an early product deserve another month. the conversations stayed useful long after the ranking.",
    ],
  },
  {
    slug: "hackathons",
    year: "2026",
    title: "15+ hackathons",
    tag: "Competition",
    oneLiner: "15+ wins across two months, including events from google, openai, and cursor.",
    mark: { kind: "favicon", domain: "google.com", alt: "Google" },
    also: [
      { kind: "favicon", domain: "openai.com", alt: "OpenAI" },
      { kind: "favicon", domain: "cursor.com", alt: "Cursor" },
    ],
    body: [
      "i won more than 15 hackathons in roughly two months, including events from google, openai, and cursor. some were model problems, some were agent problems, and all of them ended with a demo that had to boot in front of someone.",
      "that pace teaches a specific kind of engineering. find the one thing judges can touch, build the shortest honest path to it, and leave enough time to discover the environment variable you forgot.",
      "the trophies live off the homepage now. the useful part was learning how quickly a team can turn a vague brief into a system with edges.",
    ],
  },
  {
    slug: "techfest-robowars",
    year: "2025",
    title: "techfest iit bombay, robowars 8kg match",
    tag: "Hardware",
    oneLiner:
      "keynoted sparkx and won a match in the international 8kg robowars event with two self-built bots.",
    mark: { kind: "logo", src: "/techfest-logo.jpg", alt: "Techfest" },
    also: [{ kind: "favicon", domain: "iitb.ac.in", alt: "IIT Bombay" }],
    orgHref: "https://techfest.org/",
    body: [
      "at techfest, iit bombay, our team entered the international robowars 8kg class with two combat robots we built ourselves. we cleared the first round and won a match. tanish was in the pit with me.",
      "an 8kg bot gives you a small battery budget, a drivetrain, a weapon, and a chassis that has to stay controllable after the first hit. every gram moves a tradeoff between torque, armor, traction, weapon inertia, and the chance that your own machine flips.",
      "i also keynoted sparkx around the same techfest run. lumenseed had won sparkx earlier. apparently my relationship with iit bombay involves either a microphone or a spinning piece of metal.",
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
      "i independently found and responsibly reported two significant security bugs. one affected a major ai platform and the other sat in a major quick-commerce pricing api. the bounties were five figures and six figures respectively.",
      "the targets and exploit details stay private. both reports reached the engineering teams, both issues were fixed, and both teams paid. their feelings about the timing were mixed.",
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
    orgHref: "/projects/byteforge",
    moreHref: "/projects/byteforge",
    moreLabel: "the full writeup",
    body: [
      "kanpur had entrance exams everywhere and almost no room for school students who wanted to ship together, so i started byteforge as a discord server.",
      "it grew to more than 4,500 people across discord, whatsapp, and in-person events, with workshops, project showcases, mentors, and an official hack club partnership.",
      "execron 1.0 became the loud chapter. the quieter win is that a 16 year old in kanpur can now drop a half-broken project into the room on a tuesday and find someone who wants to help.",
    ],
  },
  {
    slug: "synthetic-intelligence",
    year: "2025",
    title: "synthetic intelligence paper",
    tag: "Research",
    oneLiner: "wrote and published it at 16. intelligence as something a system can keep growing.",
    mark: { kind: "logo", src: "/iitk-logo.jpg", alt: "research" },
    body: [
      "i wrote and published a paper on synthetic intelligence at 16. the idea is that intelligence can be treated as an evolving system with persistent state, environmental coupling, and room to keep adapting after deployment.",
      "the vocabulary sits near coupled dynamics and organoid intelligence: a system carries memory, receives energy and information from its environment, and changes through that loop. vivacity grew from the same curiosity about worlds that continue after an observation ends.",
      "i was 16 when i wrote it. i still am, which makes the chronology slightly ridiculous.",
    ],
  },
  {
    slug: "kuku-tv",
    year: "2025",
    title: "kuku, content analyst",
    tag: "Media",
    oneLiner: "former content analyst. catalogs, taste, the pipeline before the model.",
    mark: { kind: "favicon", domain: "kukufm.com", alt: "KuKu" },
    orgHref: "https://kukufm.com",
    body: [
      "i worked as a content analyst at kuku, the company behind kuku fm and kuku tv. i reviewed and curated around 90,000 minutes of content, which means i spent a lot of time inside catalogs, labels, and the decisions that shape a feed.",
      "that job made data quality painfully concrete. metadata decides what a system can retrieve, compare, and recommend. a wrong label can travel farther than the person who made it, especially once a model starts sounding confident about it.",
    ],
  },
];

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug);
}
