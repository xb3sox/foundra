import {
  AppWindow,
  Ban,
  Compass,
  FileText,
  FolderOpen,
  Hammer,
  Heart,
  Mail,
  MessageCircle,
  NotebookPen,
  Table2,
} from "lucide-react";
import type { MultiChipOption } from "../forms/Fields";
import type { CommitmentType, Problem } from "../../types";

// Smart presets for "What do you use today?" — the real workarounds people
// combine, so they can tap instead of type. Multi-select by design.
const TOOL_OPTIONS: MultiChipOption[] = [
  { label: "WhatsApp / chat", icon: MessageCircle },
  { label: "Spreadsheet", icon: Table2 },
  { label: "Email", icon: Mail },
  { label: "Paper / notebook", icon: NotebookPen },
  { label: "PDFs / screenshots", icon: FileText },
  { label: "Cloud drive", icon: FolderOpen },
  { label: "A dedicated tool", icon: AppWindow },
  { label: "Nothing yet", icon: Ban },
];

export interface CommitmentConfig {
  title: string;
  cta: string;
  icon: typeof Heart;
  questions: {
    q: string;
    kind: "text" | "chips" | "tools";
    hint?: string;
    options?: string[];
    toolOptions?: MultiChipOption[];
    placeholder?: string;
  }[];
  success: { title: string; body: string };
}

export function buildConfig(
  type: CommitmentType,
  problem: Problem
): CommitmentConfig {
  if (type === "I have this problem") {
    return {
      title: "Tell us about this problem.",
      cta: "Add my signal",
      icon: Heart,
      questions: [
        {
          q: "How often does this happen?",
          kind: "chips",
          options: ["Daily", "Weekly", "Monthly", "Rarely"],
        },
        {
          q: "What do you use today?",
          kind: "tools",
          hint: "Tap all that apply — most people combine a few.",
          toolOptions: TOOL_OPTIONS,
        },
        {
          q: "Would you pay for a better solution?",
          kind: "chips",
          options: ["Yes, definitely", "Maybe", "Not sure", "No"],
        },
      ],
      success: {
        title: "Signal added.",
        body: `You now have this problem on Foundra. ${problem.counts.build} people can build this.`,
      },
    };
  }
  if (type === "I can build this") {
    return {
      title: "Join as a builder.",
      cta: "Join as builder",
      icon: Hammer,
      questions: [
        {
          q: "What can you build?",
          kind: "chips",
          options: ["SaaS", "Automation", "Marketplace", "Mobile app", "Other"],
        },
        {
          q: "How much time can you give?",
          kind: "chips",
          options: ["Weekend", "Evenings", "Full-time"],
        },
        {
          q: "What do you need next?",
          kind: "chips",
          options: [
            "Customer interviews",
            "Cofounder",
            "First Brief",
            "Market Expert",
          ],
        },
      ],
      success: {
        title: "Builder interest saved.",
        body: `${problem.counts.feel} people have this problem.`,
      },
    };
  }
  return {
    title: "Add market context.",
    cta: "Add expertise",
    icon: Compass,
    questions: [
      {
        q: "Is this problem real?",
        kind: "text",
        placeholder: "What you've seen in this market…",
      },
      {
        q: "Who would pay?",
        kind: "text",
        placeholder: "The buyer who needs this most…",
      },
      {
        q: "What should builders avoid?",
        kind: "text",
        placeholder: "The trap to skip in a first solution…",
      },
    ],
    success: {
      title: "Market context added.",
      body: "Your context will help builders avoid the wrong first solution.",
    },
  };
}
