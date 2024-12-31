import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trophy, Star, Book, Heart, Home, BookOpen, Upload } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
      icon: <Home className="w-5 h-5" />,
      requiresImage: true,
      placeholder: "https://images.unsplash.com/photo-1466442929976-97f336a657be"
    },
    { 
      id: "paradise", 
      name: "Hayalindeki Cennetin Resmini Yap Yarışması", 
      points: 5, 
      icon: <Star className="w-5 h-5" />,
      requiresImage: true
    },
    { 
      id: "prayer", 
      name: "En Çok Namaz Kılma Yarışması", 
      points: 5, 
      icon: <Star className="w-5 h-5" /> 
    },
    { 
      id: "quran", 
      name: "En Çok Kur'an Okuma Yarışması", 
      points: 4, 
      icon: <Book className="w-5 h-5" /> 
    },
    { 
      id: "memorize", 
      name: "En Çok Sure Ezberleme Yarışması", 
      points: 3, 
      icon: <BookOpen className="w-5 h-5" /> 
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
            <div
              key={activity.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                selectedActivity === activity.id
                  ? "bg-primary/10 border-2 border-primary"
                  : "bg-orange-50 hover:bg-orange-100 border-2 border-transparent"
              } cursor-pointer`}
              onClick={() => setSelectedActivity(activity.id)}
            >
              <div className="flex items-center gap-3">
                {activity.icon}
                <div>
                  <h4 className="font-medium">{activity.name}</h4>
                  <p className="text-sm text-gray-600">
                    {activity.points} puan
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {activity.requiresImage && (
                  <div className="relative">
                    {uploadedImages[activity.id] ? (
                      <div className="relative w-16 h-16">
                        <img
                          src={uploadedImages[activity.id]}
                          alt={`${activity.name} resmi`}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedImages(prev => {
                              const newImages = { ...prev };
                              delete newImages[activity.id];
                              return newImages;
                            });
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <>
                        <label
                          htmlFor={`image-${activity.id}`}
                          className="cursor-pointer block w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {activity.placeholder ? (
                            <img
                              src={activity.placeholder}
                              alt="Örnek resim"
                              className="w-full h-full object-cover rounded-lg opacity-50"
                            />
                          ) : (
                            <Upload className="w-6 h-6 text-gray-400" />
                          )}
                        </label>
                        <input
                          type="file"
                          id={`image-${activity.id}`}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(activity.id, e)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </>
                    )}
                  </div>
                )}
                {!activity.requiresImage && (
                  <Input
                    type="number"
                    min="0"
                    className="w-24"
                    value={selectedActivity === activity.id ? activityValue : ""}
                    onChange={(e) => setActivityValue(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>
            </div>
          ))}

          <div className="space-y-4 mt-6">
            {checkboxActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={activity.id}
                  checked={checkedItems[activity.id] || false}
                  onCheckedChange={(checked) => {
                    setCheckedItems(prev => ({
                      ...prev,
                      [activity.id]: checked === true
                    }));
                  }}
                />
                <label
                  htmlFor={activity.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {activity.name} ({activity.points} puan)
                </label>
              </div>
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