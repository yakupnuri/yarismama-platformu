import { Card, CardContent } from "@/components/ui/card";
import { ActivityHeader } from "./activities/ActivityHeader";
import { ActivityForm } from "./activities/ActivityForm";

interface DailyActivitiesProps {
  userAge: string;
  onScoreUpdate: (points: number) => void;
}

export const DailyActivities = ({ userAge, onScoreUpdate }: DailyActivitiesProps) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border-none">
      <ActivityHeader />
      <CardContent className="p-6 space-y-6">
        <ActivityForm userAge={userAge} onScoreUpdate={onScoreUpdate} />
      </CardContent>
    </Card>
  );
};