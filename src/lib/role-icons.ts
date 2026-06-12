import { Compass, Hammer, Heart, type LucideIcon } from "lucide-react";

const roleIcon: Record<string, LucideIcon> = {
  "Has this": Heart,
  Builder: Hammer,
  "Market Expert": Compass,
};

export function getRoleIcon(role: string): LucideIcon {
  return roleIcon[role] ?? Heart;
}
