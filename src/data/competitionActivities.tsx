import { Star, Book, BookOpen, Building, LucideIcon } from "lucide-react";
import { CompetitionActivityType } from "@/types/competition";

export const competitionActivities: CompetitionActivityType[] = [
  { 
    id: "mosque", 
    name: "En Güzel Cami Maketi Yarışması", 
    icon: Building as LucideIcon,
    requiresImage: true,
    placeholder: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
    isJuryEvaluated: true
  },
  { 
    id: "paradise", 
    name: "Hayalindeki Cennetin Resmini Yap Yarışması", 
    icon: Star as LucideIcon,
    requiresImage: true,
    isJuryEvaluated: true,
    warningMessage: "Lütfen çizimini dikkatle sakla! Eğer dereceye girersen sergi için senden istenecektir. 🎨"
  },
  { 
    id: "prayer", 
    name: "En Çok Namaz Kılma Yarışması", 
    points: 5, 
    icon: Star as LucideIcon
  },
  { 
    id: "quran", 
    name: "En Çok Kur'an Okuma Yarışması", 
    points: 4, 
    icon: Book as LucideIcon
  },
  { 
    id: "memorize", 
    name: "En Çok Sure Ezberleme Yarışması", 
    points: 3, 
    icon: BookOpen as LucideIcon
  },
];