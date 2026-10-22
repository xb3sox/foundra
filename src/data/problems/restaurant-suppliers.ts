import type { Problem } from "../../types";
import { baseActivity, baseChecklist } from "./base";

export const problem: Problem = {
  id: "restaurant-suppliers",
  industry: "Food & Beverage",
  title: "Restaurants reorder supplies by guesswork and texts.",
  pain: "Chefs message suppliers individually and forget what was ordered.",
  summary:
    "Daily reordering happens over scattered phone calls and texts with no record of prices or quantities.",
  signal: "Needs more proof",
  score: 61,
  scoreReasons: [
    "Real pain, fragmented buyers",
    "Workaround is good enough",
    "Hard distribution",
    "Trust barrier",
  ],
  counts: { feel: 5, build: 2, know: 1 },
  whoFeels: "Independent restaurant and café owners.",
  problemDetail:
    "Every morning a chef texts three or four suppliers to reorder produce, meat, and dry goods. Prices change, orders get missed, and there's no clean record of what was bought at what price. Month-end cost tracking becomes a guessing game.",
  proof: [
    {
      source: "Forum complaint",
      platform: "Reddit",
      origin: "r/restaurateur",
      date: "1 week ago",
      text: "I text my veg guy, my meat guy, my dry-goods guy every morning. Half the time something's missing.",
      strength: "Medium",
    },
    {
      source: "Forum complaint",
      platform: "Forum",
      origin: "Restaurant owners forum",
      date: "2 weeks ago",
      text: "How do you track food cost when ordering is all on WhatsApp?",
      strength: "Medium",
    },
    {
      source: "Expert note",
      platform: "Social",
      origin: "LinkedIn · hospitality consultant",
      date: "3 weeks ago",
      text: "Suppliers resist new tools; adoption needs to start from the buyer side.",
      strength: "Weak",
    },
  ],
  whatTheyDoToday:
    "Texts and calls to individual suppliers, handwritten order pads, and a shoebox of delivery notes.",
  whyToolsFail:
    "Restaurant ERPs are expensive and complex. Suppliers won't onboard to a portal. The pain is shared but ownership is unclear.",
  firstVersion: {
    firstFeature:
      "A buyer-side reorder log with saved order templates per supplier and a running price record.",
    forWho: "Single-location restaurants and cafés.",
    avoid:
      "Avoid forcing suppliers onto the platform. Avoid full accounting on day one.",
    findUsers:
      "Restaurant owner groups, hospitality consultants, and local F&B meetups.",
    pricing: "$39–99/month.",
  },
  scoreBreakdown: [
    { name: "Repetition", value: 66 },
    { name: "Clarity of user", value: 60 },
    { name: "Workaround exists", value: 62 },
    { name: "Signs of payment", value: 52 },
    { name: "Urgency", value: 58 },
    { name: "Build simplicity", value: 64 },
  ],
  people: [
    { name: "Leila Q.", role: "Has this", detail: "Café owner", commitment: "I have this problem" },
    { name: "Faris N.", role: "Builder", detail: "Marketplace builder", commitment: "I can build this" },
  ],
  roomStatus: "Proving",
  checklist: baseChecklist(),
  activity: baseActivity(),
  pipeline: {
    signalCount: 13,
    clusters: 3,
    confidence: "Weak",
    sources: [
      { platform: "Reddit", count: 6 },
      { platform: "Forum", count: 5 },
      { platform: "Social", count: 2 },
    ],
    lastUpdated: "3 days ago",
  },
};
