import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Book, Heart, Home, BookOpen } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CompetitionActivity } from "./CompetitionActivity";
import { CheckboxActivity } from "./CheckboxActivity";

interface DailyActivitiesProps {
  userAge: string;
}

export const DailyActivities = ({ userAge }: DailyActivitiesProps) => {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [activityValues, setActivityValues] = useState<{ [key: string]: string }>({});
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  const competitionActivities = [
    { 
      id: "mosque", 
      name: "En Güzel Cami Maketi Yarışması", 
      points: 5, 
      icon: Home,
      requiresImage: true,
      placeholder: "https://images.unsplash.com/photo-1466442929976-97f336a657be"
    },
    { 
      id: "paradise", 
      name: "Hayalindeki Cennetin Resmini Yap Yarışması", 
      points: 5, 
      icon: Star,
      requiresImage: true
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

  const checkboxActivities = [
    { id: "family", name: "Aileye Yardım Etme Çizelgesi", points: 2 },
    { id: "kindness", name: "İyilik Yapma Yarışması", points: 2 },
    { id: "healthy", name: "Sağlıklı Besin Yeme Yarışması", points: 2 },
    { id: "electronics", name: "Elektronik Cihazları Kontrollü Kullanma Yarışması", points: 2 },
  ];

  const handleImageUpload = (activityId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Hata",
        description: "Dosya boyutu 5MB'dan küçük olmalıdır!",
        variant: "destructive",
      });
      return;
    }

    const userName = localStorage.getItem("userName") || "isimsiz";
    const timestamp = new Date().toISOString().slice(0, 10);
    const newFileName = `${userName}_${activityId}_${timestamp}`;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImages(prev => ({
        ...prev,
        [activityId]: reader.result as string
      }));
      toast({
        title: "Başarılı",
        description: "Resim başarıyla yüklendi!",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const hasSelectedActivity = Object.keys(activityValues).length > 0 || Object.keys(checkedItems).length > 0;
    
    if (!hasSelectedActivity) {
      toast({
        title: "Hata",
        description: "Lütfen en az bir etkinlik seçin!",
        variant: "destructive",
      });
      return;
    }

    // Validate numeric inputs
    const invalidInputs = Object.entries(activityValues).filter(([_, value]) => {
      const numValue = Number(value);
      return isNaN(numValue) || numValue < 0;
    });

    if (invalidInputs.length > 0) {
      toast({
        title: "Hata",
        description: "Lütfen geçerli sayısal değerler girin!",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Başarılı",
      description: "Etkinlikler kaydedildi!",
    });
    
    setActivityValues({});
    setCheckedItems({});
  };

  const handleActivityValueChange = (activityId: string, value: string) => {
    setActivityValues(prev => ({
      ...prev,
      [activityId]: value
    }));
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border-none">
      <CardHeader className="space-y-2 bg-gradient-to-r from-[#40E0D0] to-[#89CFF0] rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-2xl text-white">
            <Star className="w-8 h-8 text-white animate-pulse" />
            <span className="font-bold">
              Günlük Etkinlik Girişi
            </span>
          </CardTitle>
        </div>
        <p className="text-white text-sm">Her gün yeni etkinlikler seni bekliyor! 🌟</p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 animate-fade-in">
            {competitionActivities.map((activity) => (
              <CompetitionActivity
                key={activity.id}
                {...activity}
                selected={selectedActivity === activity.id}
                activityValue={activityValues[activity.id] || ""}
                uploadedImage={uploadedImages[activity.id]}
                onSelect={() => setSelectedActivity(activity.id)}
                onValueChange={(value) => handleActivityValueChange(activity.id, value)}
                onImageUpload={(e) => handleImageUpload(activity.id, e)}
                onImageRemove={() => {
                  setUploadedImages(prev => {
                    const newImages = { ...prev };
                    delete newImages[activity.id];
                    return newImages;
                  });
                }}
              />
            ))}
          </div>

          <div className="space-y-4 mt-8 animate-fade-in">
            <h3 className="text-lg font-semibold text-[#FF69B4] flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Günlük Görevler
            </h3>
            {checkboxActivities.map((activity) => (
              <CheckboxActivity
                key={activity.id}
                {...activity}
                checked={checkedItems[activity.id] || false}
                onCheckedChange={(checked) => {
                  setCheckedItems(prev => ({
                    ...prev,
                    [activity.id]: checked === true
                  }));
                }}
              />
            ))}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#40E0D0] to-[#89CFF0] hover:opacity-90 transition-all duration-300 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] rounded-xl border-none"
          >
            Etkinlikleri Kaydet 🎉
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};