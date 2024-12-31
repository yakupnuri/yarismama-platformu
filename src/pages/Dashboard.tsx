import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Star, Book, Heart, CircleUser, Bookmark } from "lucide-react";
import { PerformanceCharts } from "@/components/dashboard/PerformanceCharts";
import { getUserData } from "@/data/tempStorage";

const Dashboard = () => {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [activityValue, setActivityValue] = useState("");
  const { toast } = useToast();
  const [userAge, setUserAge] = useState<string>("");
  const [userColor, setUserColor] = useState<string>("hsl(var(--primary))");

  useEffect(() => {
    const userData = getUserData(localStorage.getItem("userEmail") || "");
    if (userData) {
      setUserAge(userData.age);
      setUserColor(userData.color || "hsl(var(--primary))");
    }
  }, []);

  const activities4_8 = [
    { id: "sure", name: "Sure Ezberleme", points: 3, icon: <Book className="w-5 h-5" /> },
    { id: "salavat", name: "Salavat Getirme", points: 1, icon: <Heart className="w-5 h-5" /> },
    { id: "iyilik", name: "İyilik Yapma", points: 1, icon: <Star className="w-5 h-5" /> },
  ];

  const activities8_10 = [
    { id: "namaz", name: "Namaz Kılma", points: 5, icon: <CircleUser className="w-5 h-5" /> },
    { id: "kuran", name: "Kur'an Okuma", points: 4, icon: <Book className="w-5 h-5" /> },
    { id: "sure", name: "Sure Ezberleme", points: 3, icon: <Bookmark className="w-5 h-5" /> },
  ];

  const weeklyData = [
    { name: "Pazartesi", puan: 20 },
    { name: "Salı", puan: 25 },
    { name: "Çarşamba", puan: 30 },
    { name: "Perşembe", puan: 22 },
    { name: "Cuma", puan: 35 },
    { name: "Cumartesi", puan: 28 },
    { name: "Pazar", puan: 32 },
  ];

  const monthlyData = [
    { name: "1. Hafta", puan: 180 },
    { name: "2. Hafta", puan: 220 },
    { name: "3. Hafta", puan: 190 },
    { name: "4. Hafta", puan: 240 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActivity || !activityValue) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun!",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Başarılı",
      description: "Etkinlik kaydedildi!",
    });
    setActivityValue("");
  };

  const getAgeSpecificActivities = () => {
    if (userAge) {
      const ageNum = parseInt(userAge);
      if (ageNum >= 4 && ageNum <= 8) return activities4_8;
      if (ageNum >= 8 && ageNum <= 10) return activities8_10;
    }
    return activities4_8;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img
              src="/atlas-kinder-logo.png"
              alt="Atlas Kinder Logo"
              className="h-16 w-auto"
            />
            <h1 className="text-4xl font-bold text-gray-800">
              Yarışma Takip Sistemi
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Toplam Puanınız</p>
              <p className="text-2xl font-bold text-primary flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                156
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-6 h-6 text-primary" />
                Günlük Etkinlik Girişi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {getAgeSpecificActivities().map((activity) => (
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
                <Button type="submit" className="w-full">
                  Kaydet
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <PerformanceCharts
              weeklyData={weeklyData}
              monthlyData={monthlyData}
              userColor={userColor}
            />

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-primary" />
                  Genel Sıralama ({userAge} Yaş Grubu)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Ahmet</span>
                      <span className="text-primary font-bold">450 puan</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Ayşe</span>
                      <span className="text-primary font-bold">400 puan</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Mehmet</span>
                      <span className="text-primary font-bold">350 puan</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;