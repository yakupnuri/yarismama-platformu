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
    <div className="flex items-center justify-between p-4 rounded-lg bg-[#FEF7CD] border-2 border-transparent hover:border-primary transition-all duration-200">
      <div className="flex items-center gap-3">
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-gray-600">{points} puan</p>
        </div>
      </div>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};