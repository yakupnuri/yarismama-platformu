import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { competitionActivities } from "@/data/competitionActivities";
import { CompetitionSection } from "./forms/CompetitionSection";
import { DailyTasksSection } from "./forms/DailyTasksSection";

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

  const handleSubmit = (e: React.FormEvent) => {
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

    // Calculate total points
    let totalPoints = 0;

    Object.entries(activityValues).forEach(([activityId, value]) => {
      const activity = competitionActivities.find(a => a.id === activityId);
      if (activity?.points) {
        totalPoints += activity.points * Number(value);
      }
    });

    Object.entries(checkedItems).forEach(([activityId, checked]) => {
      if (checked) {
        const checkboxActivity = [
          { id: "family", points: 2 },
          { id: "kindness", points: 2 },
          { id: "healthy", points: 2 },
          { id: "electronics", points: 2 },
        ].find(a => a.id === activityId);
        
        if (checkboxActivity) {
          totalPoints += checkboxActivity.points;
        }
      }
    });

    // Update submitted activities
    const newSubmittedActivities = [...submittedActivities];
    Object.keys(uploadedImages).forEach(activityId => {
      if (!submittedActivities.includes(activityId)) {
        newSubmittedActivities.push(activityId);
      }
    });
    
    setSubmittedActivities(newSubmittedActivities);
    localStorage.setItem("submittedActivities", JSON.stringify(newSubmittedActivities));

    // Update score
    onScoreUpdate(totalPoints);

    toast({
      title: "Başarılı",
      description: "Etkinlikler kaydedildi!",
    });
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
        className="w-full bg-gradient-to-r from-[#40E0D0] to-[#89CFF0] hover:opacity-90 transition-all duration-300 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] rounded-xl border-none"
      >
        Etkinlikleri Kaydet 🎉
      </Button>
    </form>
  );
};