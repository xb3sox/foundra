import type { Problem } from "../../types";

export const problem: Problem = {
  id: "photo-selects",
  industry: "Photography",
  title: "Photographers chase clients for final selects.",
  pain: "Galleries sit untouched for weeks while the photographer can't close the job.",
  summary:
    "Wedding and portrait photographers deliver proof galleries, then spend weeks nudging clients to pick their final images.",
  signal: "Needs more proof",
  score: 54,
  scoreReasons: [
    "Annoying but survivable",
    "Gallery tools partly cover it",
    "Unclear willingness to pay",
    "Pain is seasonal",
  ],
  counts: { feel: 4, build: 2, know: 1 },
  whoFeels: "Wedding and portrait photographers shooting 15–60 sessions a year.",
  problemDetail:
    "After a shoot, the photographer sends a proof gallery and asks the client to pick 30 selects for editing. Then silence. The album can't be designed, the job can't be invoiced, and the photographer sends increasingly awkward reminders. Some jobs stall for months over a choice the client could make in an evening.",
  proof: [
    {
      source: "Forum complaint",
      platform: "Reddit",
      origin: "r/WeddingPhotography",
      date: "1 week ago",
      text: "Couple got their gallery in March. It's July. Still no album selects. I've reminded them four times.",
      strength: "Medium",
    },
    {
      source: "Forum complaint",
      platform: "Forum",
      origin: "Photo business forum",
      date: "2 weeks ago",
      text: "Do you charge a fee if clients take more than 60 days to choose? Feels harsh but I can't archive the job.",
      strength: "Medium",
    },
    {
      source: "Job post",
      platform: "Upwork",
      origin: "Upwork job post",
      date: "3 weeks ago",
      text: "Photographer looking for help 'following up with past clients about photo selections and album approvals'.",
      strength: "Weak",
    },
  ],
  whatTheyDoToday:
    "Gallery links with a favorites feature, manual reminder emails, and sometimes a deadline clause in the contract that's never enforced.",
  whyToolsFail:
    "Gallery platforms have favorites but no deadlines, no escalating reminders, and no link between selects and getting paid. Reminders stay manual.",
  firstVersion: {
    firstFeature:
      "A selects deadline layered on existing galleries: scheduled reminders, progress shown to the client, and a nudge when the date nears.",
    forWho: "Wedding photographers who deliver albums and prints.",
    avoid:
      "Avoid building another gallery platform or photo storage. Ride on top of what they already use.",
    findUsers:
      "Wedding photography subreddits, photographer Facebook groups, and album lab partners.",
    pricing: "$10–25/month.",
  },
  scoreBreakdown: [
    { name: "Repetition", value: 58 },
    { name: "Clarity of user", value: 62 },
    { name: "Workaround exists", value: 56 },
    { name: "Signs of payment", value: 42 },
    { name: "Urgency", value: 48 },
    { name: "Build simplicity", value: 58 },
  ],
  people: [
    { name: "Yara H.", role: "Has this", detail: "Wedding photographer, 30 weddings/yr", commitment: "I have this problem" },
    { name: "Marwan T.", role: "Builder", detail: "Frontend + email automation", commitment: "I can build this" },
    { name: "Dina F.", role: "Market Expert", detail: "Runs a photo album lab", commitment: "I know this market" },
  ],
  roomStatus: "Paused",
  checklist: [
    { id: "c1", label: "5 people confirmed the pain", done: false },
    { id: "c2", label: "3 explained their workaround", done: true },
    { id: "c3", label: "2 said they would pay", done: false },
    { id: "c4", label: "First solution sketched", done: false },
    { id: "c5", label: "First interview scheduled", done: false },
  ],
  activity: [
    { id: "a1", text: "Room paused pending more payment signals", time: "2 days ago" },
    { id: "a2", text: "Yara described her reminder routine", time: "4 days ago" },
    { id: "a3", text: "Marwan joined as builder", time: "1 week ago" },
    { id: "a4", text: "Problem signal cluster merged", time: "2 weeks ago" },
  ],
  pipeline: {
    signalCount: 22,
    clusters: 3,
    confidence: "Weak",
    sources: [
      { platform: "Reddit", count: 10 },
      { platform: "Upwork", count: 6 },
      { platform: "Forum", count: 4 },
      { platform: "Social", count: 2 },
    ],
    lastUpdated: "2 days ago",
  },
};
