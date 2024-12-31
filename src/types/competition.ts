import { LucideIcon } from "lucide-react";

export interface CompetitionActivityType {
  id: string;
  name: string;
  points?: number;
  icon: LucideIcon;
  requiresImage?: boolean;
  placeholder?: string;
  isJuryEvaluated?: boolean;
  warningMessage?: string;
}