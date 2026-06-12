export type SignalLabel =
  | "Strong signal"
  | "Promising"
  | "Needs more proof"
  | "Weak signal";

export type ProofStrength = "Weak" | "Medium" | "Strong";

export type ProofSourceType =
  | "Interview"
  | "Forum complaint"
  | "Review"
  | "Job post"
  | "Manual workflow"
  | "Expert note";

export type CommitmentType =
  | "I have this problem"
  | "I can build this"
  | "I know this market";

export type RoomStatus = "Proving" | "Building" | "Paused";

export type SourcePlatform =
  | "Reddit"
  | "Product reviews"
  | "Upwork"
  | "Fiverr"
  | "Forum"
  | "Social";

export interface ProofItem {
  source: ProofSourceType;
  text: string;
  strength: ProofStrength;
  platform: SourcePlatform;
  origin: string; // e.g. "r/freelance", "G2 review", "Upwork job post"
  date: string; // e.g. "3 days ago"
}

export interface SourceBreakdown {
  platform: SourcePlatform;
  count: number;
}

export interface PipelineMeta {
  signalCount: number; // total real signals this problem is based on
  clusters: number; // distinct complaint clusters merged
  confidence: ProofStrength; // overall extraction confidence
  sources: SourceBreakdown[];
  lastUpdated: string;
}

export interface ScoreDimension {
  name: string;
  value: number; // 0-100
}

export interface InterestedPerson {
  name: string;
  role: string;
  detail: string;
  commitment: CommitmentType;
}

export interface FirstVersion {
  firstFeature: string;
  forWho: string;
  avoid: string;
  findUsers: string;
  pricing: string;
}

export interface Counts {
  feel: number;
  build: number;
  know: number;
}

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface ActivityEntry {
  id: string;
  text: string;
  time: string;
}

export interface Problem {
  id: string;
  industry: string;
  title: string;
  pain: string;
  summary: string;
  signal: SignalLabel;
  score: number;
  scoreReasons: string[];
  counts: Counts;
  whoFeels: string;
  problemDetail: string;
  proof: ProofItem[];
  whatTheyDoToday: string;
  whyToolsFail: string;
  firstVersion: FirstVersion;
  scoreBreakdown: ScoreDimension[];
  people: InterestedPerson[];
  roomStatus: RoomStatus;
  checklist: ChecklistItem[];
  activity: ActivityEntry[];
  pipeline: PipelineMeta;
}
