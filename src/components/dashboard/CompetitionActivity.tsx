import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
        uploadedImage ? 'cursor-default opacity-90' : 'cursor-pointer'
      } ${
        selected
          ? "bg-gradient-to-r from-[#E5DEFF] to-[#FEF9D7] border-2 border-[#40E0D0] shadow-lg"
          : "bg-white/80 hover:bg-white border-2 border-transparent hover:border-[#40E0D0]/20 shadow-md"
      }`}
      onClick={uploadedImage ? undefined : onSelect}
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
        {requiresImage && (
          <div className="relative">
            {uploadedImage ? (
              <div className="relative w-20 h-20">
                <img
                  src={uploadedImage}
                  alt={`${name} resmi`}
                  className="w-20 h-20 object-cover rounded-xl shadow-md"
                />
                {!isJuryEvaluated && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onImageRemove?.();
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 shadow-lg transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            ) : (
              <>
                <label
                  htmlFor={`image-${id}`}
                  className="cursor-pointer block w-20 h-20 border-2 border-dashed border-[#40E0D0]/30 rounded-xl flex items-center justify-center hover:border-[#40E0D0] transition-colors bg-white/50 hover:bg-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  {placeholder ? (
                    <img
                      src={placeholder}
                      alt="Örnek resim"
                      className="w-full h-full object-cover rounded-lg opacity-50"
                    />
                  ) : (
                    <div className="text-2xl text-[#40E0D0]/50 hover:text-[#40E0D0]">+</div>
                  )}
                </label>
                <input
                  type="file"
                  id={`image-${id}`}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  onClick={(e) => e.stopPropagation()}
                />
              </>
            )}
          </div>
        )}
        {!requiresImage && (
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