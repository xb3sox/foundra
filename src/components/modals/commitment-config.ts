import { Compass, Hammer, Heart } from "lucide-react";
import type { CommitmentType } from "../../types";

export interface CommitmentConfig {
  title: string;
  blurb: string;
  icon: typeof Heart;
}

/** Short, human label for a position - shared by the commit modal and the
    room header so "you're here as …" stays consistent. */
export function positionLabel(type: CommitmentType): string {
  if (type === "I have this problem") return "someone who has this problem";
  if (type === "I can build this") return "a builder";
  return "a market expert";
}

export function buildConfig(type: CommitmentType): CommitmentConfig {
  if (type === "I have this problem") {
    return {
      title: "You have this problem.",
      blurb:
        "You'll join the room as someone who lives with this pain: the demand signal every builder is looking for.",
      icon: Heart,
    };
  }
  if (type === "I can build this") {
    return {
      title: "You can build this.",
      blurb:
        "You'll join the room as a builder, ready to turn the proof into a first solution worth testing.",
      icon: Hammer,
    };
  }
  return {
    title: "You know this market.",
    blurb:
      "You'll join the room as a market expert: the context that keeps builders from the wrong first solution.",
    icon: Compass,
  };
}
