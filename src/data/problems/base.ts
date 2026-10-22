import type { ActivityEntry, ChecklistItem } from "../../types";

export const baseChecklist = (): ChecklistItem[] => [
  { id: "c1", label: "5 people confirmed the pain", done: true },
  { id: "c2", label: "3 explained their workaround", done: true },
  { id: "c3", label: "2 said they would pay", done: false },
  { id: "c4", label: "First solution sketched", done: false },
  { id: "c5", label: "First interview scheduled", done: false },
];

export const baseActivity = (): ActivityEntry[] => [
  { id: "a1", text: "Sara added a problem signal", time: "2h ago" },
  { id: "a2", text: "Omar joined as builder", time: "5h ago" },
  { id: "a3", text: "Lina added market context", time: "Yesterday" },
  { id: "a4", text: "First solution drafted", time: "2 days ago" },
];
