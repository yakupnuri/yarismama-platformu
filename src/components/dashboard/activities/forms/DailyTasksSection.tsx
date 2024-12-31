import { Heart } from "lucide-react";
import { CheckboxActivity } from "../../CheckboxActivity";

interface DailyTasksSectionProps {
  checkedItems: { [key: string]: boolean };
  setCheckedItems: (items: { [key: string]: boolean }) => void;
}

export const DailyTasksSection = ({
  checkedItems,
  setCheckedItems,
}: DailyTasksSectionProps) => {
  const checkboxActivities = [
    { id: "family", name: "Aileye Yardım Etme Çizelgesi", points: 2 },
    { id: "kindness", name: "İyilik Yapma Yarışması", points: 2 },
    { id: "healthy", name: "Sağlıklı Besin Yeme Yarışması", points: 2 },
    { id: "electronics", name: "Elektronik Cihazları Kontrollü Kullanma Yarışması", points: 2 },
  ];

  return (
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
  );
};