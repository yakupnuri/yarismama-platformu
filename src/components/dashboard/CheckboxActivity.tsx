import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxActivityProps {
  id: string;
  name: string;
  points: number;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const CheckboxActivity = ({
  id,
  name,
  points,
  checked,
  onCheckedChange,
}: CheckboxActivityProps) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#F2FCE2] to-[#FFDEE2] border-2 border-transparent hover:border-[#FF69B4]/20 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div>
          <h4 className="font-semibold text-gray-700">{name}</h4>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <span className="text-[#FF69B4] font-bold">{points}</span> puan kazanabilirsin! ⭐
          </p>
        </div>
      </div>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="h-6 w-6 border-2 border-[#FF69B4]/30 data-[state=checked]:bg-[#FF69B4] data-[state=checked]:border-[#FF69B4]"
      />
    </div>
  );
};