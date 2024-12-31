import { CompetitionActivity } from "../../CompetitionActivity";
import { competitionActivities } from "@/data/competitionActivities";
import { useToast } from "@/hooks/use-toast";

interface CompetitionSectionProps {
  selectedActivity: string;
  activityValues: { [key: string]: string };
  uploadedImages: { [key: string]: string };
  submittedActivities: string[];
  setSelectedActivity: (id: string) => void;
  setActivityValues: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  setUploadedImages: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

export const CompetitionSection = ({
  selectedActivity,
  activityValues,
  uploadedImages,
  submittedActivities,
  setSelectedActivity,
  setActivityValues,
  setUploadedImages,
}: CompetitionSectionProps) => {
  const { toast } = useToast();

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
      setUploadedImages((prev) => ({
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

  return (
    <div className="space-y-4 animate-fade-in">
      {competitionActivities.map((activity) => (
        <CompetitionActivity
          key={activity.id}
          {...activity}
          selected={selectedActivity === activity.id}
          activityValue={activityValues[activity.id] || ""}
          uploadedImage={uploadedImages[activity.id]}
          disabled={submittedActivities.includes(activity.id) && activity.isJuryEvaluated}
          onSelect={() => setSelectedActivity(activity.id)}
          onValueChange={(value) => {
            setActivityValues((prev) => ({
              ...prev,
              [activity.id]: value
            }));
          }}
          onImageUpload={(e) => handleImageUpload(activity.id, e)}
          onImageRemove={() => {
            setUploadedImages((prev) => {
              const newImages = { ...prev };
              delete newImages[activity.id];
              return newImages;
            });
          }}
        />
      ))}
    </div>
  );
};