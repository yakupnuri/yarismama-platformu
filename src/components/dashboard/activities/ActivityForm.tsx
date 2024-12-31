import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { competitionActivities } from "@/data/competitionActivities";
import { CompetitionSection } from "./forms/CompetitionSection";
import { DailyTasksSection } from "./forms/DailyTasksSection";
import { submitActivity } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

interface ActivityFormProps {
  userAge: string;
  onScoreUpdate: (points: number) => void;
}

export const ActivityForm = ({ userAge, onScoreUpdate }: ActivityFormProps) => {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [activityValues, setActivityValues] = useState<{ [key: string]: string }>({});
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: string }>({});
  const [submittedActivities, setSubmittedActivities] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const hasSelectedActivity = Object.keys(activityValues).length > 0 || 
                              Object.keys(checkedItems).length > 0 ||
                              Object.keys(uploadedImages).length > 0;
    
    if (!hasSelectedActivity) {
      toast({
        title: "Hata",
        description: "Lütfen en az bir etkinlik seçin!",
        variant: "destructive",
      });
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast({
          title: "Hata",
          description: "Kullanıcı bilgisi bulunamadı!",
          variant: "destructive",
        });
        return;
      }

      // Aktiviteleri gönder
      for (const [activityId, value] of Object.entries(activityValues)) {
        const numValue = Number(value);
        if (!isNaN(numValue) && numValue > 0) {
          await submitActivity({
            userId,
            type: activityId,
            value: numValue
          });
        }
      }

      // Günlük görevleri gönder
      for (const [taskId, checked] of Object.entries(checkedItems)) {
        if (checked) {
          await submitActivity({
            userId,
            type: taskId,
            value: 1
          });
        }
      }

      // Cache'i güncelle
      await queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      
      toast({
        title: "Başarılı",
        description: "Etkinlikler kaydedildi!",
      });

      // Form state'ini sıfırla
      setActivityValues({});
      setCheckedItems({});
      setUploadedImages({});
      
    } catch (error) {
      console.error('Activity submission error:', error);
      toast({
        title: "Hata",
        description: "Etkinlikler kaydedilirken bir hata oluştu!",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CompetitionSection
        selectedActivity={selectedActivity}
        activityValues={activityValues}
        uploadedImages={uploadedImages}
        submittedActivities={submittedActivities}
        setSelectedActivity={setSelectedActivity}
        setActivityValues={setActivityValues}
        setUploadedImages={setUploadedImages}
      />

      <DailyTasksSection
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      />

      <Button 
        type="submit" 
        className="w-full bg-[#9b87f5] hover:bg-[#8b75f4] text-white font-bold py-6 text-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] rounded-xl border-none"
      >
        Etkinlikleri Kaydet 🎉
      </Button>
    </form>
  );
};