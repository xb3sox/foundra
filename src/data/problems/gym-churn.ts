import type { Problem } from "../../types";

export const problem: Problem = {
  id: "gym-churn",
  industry: "Fitness",
  title: "Gyms lose members who silently churn.",
  pain: "Members stop showing up weeks before they cancel, and nobody notices.",
  summary:
    "Independent gym owners only learn a member is gone when the cancellation email arrives, long after attendance dropped off.",
  signal: "Promising",
  score: 68,
  scoreReasons: [
    "Revenue leaks monthly",
    "Attendance data already exists",
    "Owners are busy, not technical",
    "Retention is hard to attribute",
  ],
  counts: { feel: 8, build: 3, know: 2 },
  whoFeels: "Independent gym and boutique studio owners with 100–800 members.",
  problemDetail:
    "A member who cancels in June usually stopped scanning in around April. The check-in data shows the fade, but it sits unused inside the access system. Owners find out at cancellation, when a win-back is awkward and usually too late. A timely 'we miss you' nudge at week two of absence is the obvious move, and almost nobody does it.",
  proof: [
    {
      source: "Forum complaint",
      platform: "Reddit",
      origin: "r/gymowners",
      date: "5 days ago",
      text: "Pulled my cancellations report: almost every one had zero visits for 6+ weeks first. I never saw it coming.",
      strength: "Strong",
    },
    {
      source: "Review",
      platform: "Product reviews",
      origin: "Capterra · 2★ gym software",
      date: "2 weeks ago",
      text: "Has an 'at-risk members' report buried four menus deep. No alerts, so I check it never.",
      strength: "Medium",
    },
    {
      source: "Forum complaint",
      platform: "Forum",
      origin: "Fitness business forum",
      date: "1 week ago",
      text: "How do you reach out to members who've gone quiet without it feeling like spam?",
      strength: "Medium",
    },
    {
      source: "Expert note",
      platform: "Social",
      origin: "LinkedIn · gym consultant",
      date: "3 weeks ago",
      text: "Most independents could cut churn meaningfully just by acting on attendance gaps. Few have the time.",
      strength: "Weak",
    },
  ],
  whatTheyDoToday:
    "An occasional manual look at check-in reports, gut feel about regulars, and a generic newsletter that goes to everyone.",
  whyToolsFail:
    "Gym management platforms hold the data but bury at-risk reports and send nothing proactively. Marketing tools don't connect to check-in systems.",
  firstVersion: {
    firstFeature:
      "An attendance-drop alert that flags fading members and sends an owner-approved win-back text at the right moment.",
    forWho: "Single-location gyms and studios with digital check-in.",
    avoid:
      "Avoid building booking, billing, or a member app. Stay on spotting the fade and nudging.",
    findUsers:
      "Gym owner subreddits, boutique studio groups, and fitness equipment reseller networks.",
    pricing: "$49–99/month per location.",
  },
  scoreBreakdown: [
    { name: "Repetition", value: 72 },
    { name: "Clarity of user", value: 70 },
    { name: "Workaround exists", value: 64 },
    { name: "Signs of payment", value: 62 },
    { name: "Urgency", value: 66 },
    { name: "Build simplicity", value: 74 },
  ],
  people: [
    { name: "Adel S.", role: "Has this", detail: "Owns a 400-member gym", commitment: "I have this problem" },
    { name: "Farah B.", role: "Builder", detail: "Data + integrations", commitment: "I can build this" },
    { name: "Joud K.", role: "Market Expert", detail: "Sold software to 60 gyms", commitment: "I know this market" },
  ],
  roomStatus: "Proving",
  checklist: [
    { id: "c1", label: "5 people confirmed the pain", done: true },
    { id: "c2", label: "3 explained their workaround", done: true },
    { id: "c3", label: "2 said they would pay", done: false },
    { id: "c4", label: "First solution sketched", done: false },
    { id: "c5", label: "First interview scheduled", done: false },
  ],
  activity: [
    { id: "a1", text: "Adel shared 12 months of cancellation data", time: "3h ago" },
    { id: "a2", text: "Farah joined as builder", time: "Yesterday" },
    { id: "a3", text: "Joud listed check-in systems to integrate", time: "Yesterday" },
    { id: "a4", text: "Problem signal cluster merged", time: "3 days ago" },
  ],
  pipeline: {
    signalCount: 29,
    clusters: 4,
    confidence: "Medium",
    sources: [
      { platform: "Reddit", count: 13 },
      { platform: "Product reviews", count: 9 },
      { platform: "Forum", count: 4 },
      { platform: "Social", count: 3 },
    ],
    lastUpdated: "Yesterday",
  },
};
