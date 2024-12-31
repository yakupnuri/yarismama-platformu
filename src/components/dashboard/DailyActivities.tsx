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
  const [activityValue, setActivityValue] = useState("");
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
    if (!selectedActivity && Object.keys(checkedItems).length === 0) {
      toast({
        title: "Hata",
        description: "Lütfen en az bir etkinlik seçin!",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Başarılı",
      description: "Etkinlikler kaydedildi!",
    });
    setActivityValue("");
    setCheckedItems({});
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-6 h-6 text-primary" />
          Günlük Etkinlik Girişi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {competitionActivities.map((activity) => (
            <CompetitionActivity
              key={activity.id}
              id={activity.id}
              name={activity.name}
              points={activity.points}
              icon={activity.icon}
              requiresImage={activity.requiresImage}
              placeholder={activity.placeholder}
              selected={selectedActivity === activity.id}
              activityValue={selectedActivity === activity.id ? activityValue : ""}
              uploadedImage={uploadedImages[activity.id]}
              onSelect={() => setSelectedActivity(activity.id)}
              onValueChange={setActivityValue}
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

          <div className="space-y-4 mt-6">
            {checkboxActivities.map((activity) => (
              <CheckboxActivity
                key={activity.id}
                id={activity.id}
                name={activity.name}
                points={activity.points}
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

          <Button type="submit" className="w-full">
            Kaydet
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};