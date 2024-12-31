import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "./competition/ImageUpload";

interface CompetitionActivityProps {
  id: string;
  name: string;
  points?: number;
  icon: LucideIcon;
  requiresImage?: boolean;
  placeholder?: string;
  selected: boolean;
  activityValue: string;
  uploadedImage?: string;
  isJuryEvaluated?: boolean;
  warningMessage?: string;
  disabled?: boolean;
  onSelect: () => void;
  onValueChange?: (value: string) => void;
  onImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove?: () => void;
}

export const CompetitionActivity = ({
  id,
  name,
  points,
  icon: Icon,
  requiresImage,
  placeholder,
  selected,
  activityValue,
  uploadedImage,
  isJuryEvaluated,
  warningMessage,
  disabled,
  onSelect,
  onValueChange,
  onImageUpload,
  onImageRemove,
}: CompetitionActivityProps) => {
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onImageUpload) {
      onImageUpload(e);
      if (warningMessage) {
        toast({
          title: "Önemli Uyarı!",
          description: warningMessage,
          duration: 6000,
        });
      }
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
        uploadedImage ? 'cursor-default opacity-90' : disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      } ${
        selected
          ? "bg-gradient-to-r from-[#E5DEFF] to-[#FEF9D7] border-2 border-[#40E0D0] shadow-lg"
          : "bg-white/80 hover:bg-white border-2 border-transparent hover:border-[#40E0D0]/20 shadow-md"
      }`}
      onClick={disabled || uploadedImage ? undefined : onSelect}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${selected ? 'bg-[#40E0D0]/10' : 'bg-[#40E0D0]/5'}`}>
          <Icon className={`w-6 h-6 ${selected ? 'text-[#40E0D0]' : 'text-[#40E0D0]/70'}`} />
        </div>
        <div>
          <h4 className={`font-semibold text-lg ${selected ? 'text-[#40E0D0]' : 'text-gray-700'}`}>
            {name}
            {isJuryEvaluated && (
              <span className="ml-2 text-sm text-purple-500 font-normal">
                (Jüri Değerlendirmesi) 🎨
              </span>
            )}
          </h4>
          {points && (
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <span className="text-[#40E0D0] font-bold">{points}</span> puan kazanabilirsin! ⭐
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {requiresImage ? (
          <ImageUpload
            id={id}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            uploadedImage={uploadedImage}
            isJuryEvaluated={isJuryEvaluated}
            onImageUpload={handleImageUpload}
            onImageRemove={onImageRemove || (() => {})}
          />
        ) : (
          <Input
            type="number"
            min="0"
            className="w-24 border-2 focus:border-[#40E0D0] transition-colors"
            value={activityValue}
            onChange={(e) => onValueChange?.(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </div>
  );
};