import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trophy, Star, Book, Heart, Home, BookOpen } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DailyActivitiesProps {
  userAge: string;
}

export const DailyActivities = ({ userAge }: DailyActivitiesProps) => {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [activityValue, setActivityValue] = useState("");
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  const competitionActivities = [
    { id: "mosque", name: "En Güzel Cami Maketi Yarışması", points: 5, icon: <Home className="w-5 h-5" /> },
    { id: "prayer", name: "En Çok Namaz Kılma Yarışması", points: 5, icon: <Star className="w-5 h-5" /> },
    { id: "quran", name: "En Çok Kur'an Okuma Yarışması", points: 4, icon: <Book className="w-5 h-5" /> },
    { id: "memorize", name: "En Çok Sure Ezberleme Yarışması", points: 3, icon: <BookOpen className="w-5 h-5" /> },
  ];

  const checkboxActivities = [
    { id: "family", name: "Aileye Yardım Etme Çizelgesi", points: 2 },
    { id: "kindness", name: "İyilik Yapma Yarışması", points: 2 },
    { id: "healthy", name: "Sağlıklı Besin Yeme Yarışması", points: 2 },
    { id: "electronics", name: "Elektronik Cihazları Kontrollü Kullanma Yarışması", points: 2 },
  ];

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
                    {activity.points} puan/adet
                  </p>
                </div>
              </div>
              <Input
                type="number"
                min="0"
                className="w-24"
                value={selectedActivity === activity.id ? activityValue : ""}
                onChange={(e) => setActivityValue(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
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