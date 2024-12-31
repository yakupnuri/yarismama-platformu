import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Calendar, BookOpen } from "lucide-react";
import { toHijri } from "hijri-converter";

const quranVerses = [
  {
    verse: "Namazı dosdoğru kılın, zekâtı verin. Rükû edenlerle birlikte siz de rükû edin.",
    reference: "Bakara Suresi, 2:43"
  },
  {
    verse: "Sabır ve namaz ile Allah'tan yardım dileyin. Şüphesiz namaz, Allah'a derinden saygı duyanlardan başkasına ağır gelir.",
    reference: "Bakara Suresi, 2:45"
  },
  {
    verse: "Muhakkak ki namaz, müminler üzerine vakitleri belirlenmiş bir farzdır.",
    reference: "Nisa Suresi, 4:103"
  },
  {
    verse: "Namazı kılın, zekâtı verin ve Resule itaat edin ki merhamet olunasınız.",
    reference: "Nur Suresi, 24:56"
  },
  {
    verse: "Ben cinleri ve insanları ancak bana kulluk etsinler diye yarattım.",
    reference: "Zariyat Suresi, 51:56"
  }
];

const hijriMonths = [
  "Muharrem", "Safer", "Rebîülevvel", "Rebîülâhir", "Cemâziyelevvel", "Cemâziyelâhir",
  "Receb", "Şa'bân", "Ramazan", "Şevvâl", "Zilka'de", "Zilhicce"
];

export const IslamicDateDisplay = () => {
  const [currentVerse, setCurrentVerse] = useState(quranVerses[0]);
  const [today] = useState(new Date());
  const startDate = new Date(2025, 0, 1); // 1 Ocak 2025
  const endDate = new Date(2025, 2, 31); // 31 Mart 2025

  // Convert to Hijri
  const startHijri = toHijri(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());
  const endHijri = toHijri(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate());
  const todayHijri = toHijri(today.getFullYear(), today.getMonth() + 1, today.getDate());

  useEffect(() => {
    // Her gün farklı bir ayet göster
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = Number(today) - Number(start);
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const verseIndex = dayOfYear % quranVerses.length;
    setCurrentVerse(quranVerses[verseIndex]);
  }, [today]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 border-[#F1F1F1]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#9b87f5]" />
            Yarışma Tarihleri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm">
                <span className="font-semibold text-[#1A1F2C]">Başlangıç:</span>
                <div className="mt-1">
                  <div className="text-[#8E9196]">1 Ocak 2025 Çarşamba</div>
                  <div className="text-[#9b87f5]">{hijriMonths[startHijri.hm - 1]} {startHijri.hy}</div>
                </div>
              </div>
              <div className="text-sm">
                <span className="font-semibold text-[#1A1F2C]">Bitiş:</span>
                <div className="mt-1">
                  <div className="text-[#8E9196]">31 Mart 2025 Pazar</div>
                  <div className="text-[#9b87f5]">{hijriMonths[endHijri.hm - 1]} {endHijri.hy}</div>
                </div>
              </div>
            </div>
            <div className="border-t border-[#F1F1F1] pt-3 mt-2">
              <div className="text-sm">
                <span className="font-semibold text-[#1A1F2C]">Bugün:</span>
                <div className="mt-1">
                  <div className="text-[#8E9196]">{today.toLocaleDateString('tr-TR', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</div>
                  <div className="text-[#9b87f5]">{hijriMonths[todayHijri.hm - 1]} {todayHijri.hy}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 border-[#F1F1F1]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#9b87f5]" />
            Günün Ayeti
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm italic text-[#8E9196]">{currentVerse.verse}</p>
            <p className="text-xs text-[#9b87f5] font-medium">{currentVerse.reference}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};