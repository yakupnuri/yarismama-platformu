import { Star } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";

export const ActivityHeader = () => {
  return (
    <CardHeader className="space-y-2 bg-gradient-to-r from-[#40E0D0] to-[#89CFF0] rounded-t-lg">
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-2xl text-white">
          <Star className="w-8 h-8 text-white animate-pulse" />
          <span className="font-bold">Günlük Etkinlik Girişi</span>
        </CardTitle>
      </div>
      <p className="text-white text-sm">Her gün yeni etkinlikler seni bekliyor! 🌟</p>
    </CardHeader>
  );
};