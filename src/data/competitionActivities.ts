import { Star, Book, BookOpen } from "lucide-react";
import { CompetitionActivityType } from "@/types/competition";

// SVG ikonu component olarak tanımlayalım
const MosqueIcon = () => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 0L32 128v32h448v-32L256 0zm-32 160v96h64v-96h-64zm-192 0v224h128v96h32v-320H32zm352 0v320h32v-96h128V160H384zm-160 128v192h64V288h-64z" />
  </svg>
);

export const competitionActivities: CompetitionActivityType[] = [
  { 
    id: "mosque", 
    name: "En Güzel Cami Maketi Yarışması", 
    icon: MosqueIcon,
    requiresImage: true,
    placeholder: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
    isJuryEvaluated: true
  },
  { 
    id: "paradise", 
    name: "Hayalindeki Cennetin Resmini Yap Yarışması", 
    icon: Star,
    requiresImage: true,
    isJuryEvaluated: true,
    warningMessage: "Lütfen çizimini dikkatle sakla! Eğer dereceye girersen sergi için senden istenecektir. 🎨"
  },
  { 
    id: "prayer", 
    name: "En Çok Namaz Kılma Yarışması", 
    points: 5, 
    icon: Star
  },
  { 
    id: "quran", 
    name: "En Çok Kur'an Okuma Yarışması", 
    points: 4, 
    icon: Book
  },
  { 
    id: "memorize", 
    name: "En Çok Sure Ezberleme Yarışması", 
    points: 3, 
    icon: BookOpen
  },
];