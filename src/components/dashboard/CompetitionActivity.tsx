import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";

interface CompetitionActivityProps {
  id: string;
  name: string;
  points: number;
  icon: LucideIcon;
  requiresImage?: boolean;
  placeholder?: string;
  selected: boolean;
  activityValue: string;
  uploadedImage?: string;
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
  onSelect,
  onValueChange,
  onImageUpload,
  onImageRemove,
}: CompetitionActivityProps) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer ${
        selected
          ? "bg-gradient-to-r from-[#FEC6A1] to-[#FEF7CD] border-2 border-[#F97316] shadow-lg"
          : "bg-white/80 hover:bg-white border-2 border-transparent hover:border-[#F97316]/20 shadow-md"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${selected ? 'bg-[#F97316]/10' : 'bg-[#F97316]/5'}`}>
          <Icon className={`w-6 h-6 ${selected ? 'text-[#F97316]' : 'text-[#F97316]/70'}`} />
        </div>
        <div>
          <h4 className={`font-semibold text-lg ${selected ? 'text-[#F97316]' : 'text-gray-700'}`}>{name}</h4>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <span className="text-[#F97316] font-bold">{points}</span> puan kazanabilirsin! ⭐
          </p>
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
              </div>
            ) : (
              <>
                <label
                  htmlFor={`image-${id}`}
                  className="cursor-pointer block w-20 h-20 border-2 border-dashed border-[#F97316]/30 rounded-xl flex items-center justify-center hover:border-[#F97316] transition-colors bg-white/50 hover:bg-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  {placeholder ? (
                    <img
                      src={placeholder}
                      alt="Örnek resim"
                      className="w-full h-full object-cover rounded-lg opacity-50"
                    />
                  ) : (
                    <div className="text-2xl text-[#F97316]/50 hover:text-[#F97316]">+</div>
                  )}
                </label>
                <input
                  type="file"
                  id={`image-${id}`}
                  accept="image/*"
                  className="hidden"
                  onChange={onImageUpload}
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
            className="w-24 border-2 focus:border-[#F97316] transition-colors"
            value={activityValue}
            onChange={(e) => onValueChange?.(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </div>
  );
};