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
    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#FEF7CD] to-[#FDE1D3] border-2 border-transparent hover:border-[#F97316]/20 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div>
          <h4 className="font-semibold text-gray-700">{name}</h4>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <span className="text-[#F97316] font-bold">{points}</span> puan kazanabilirsin! ⭐
          </p>
        </div>
      </div>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="h-6 w-6 border-2 border-[#F97316]/30 data-[state=checked]:bg-[#F97316] data-[state=checked]:border-[#F97316]"
      />
    </div>
  );
};