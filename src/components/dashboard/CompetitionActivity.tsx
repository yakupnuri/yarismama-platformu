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
      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
        selected
          ? "bg-primary/10 border-2 border-primary"
          : "bg-orange-50 hover:bg-orange-100 border-2 border-transparent"
      } cursor-pointer`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-gray-600">{points} puan</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {requiresImage && (
          <div className="relative">
            {uploadedImage ? (
              <div className="relative w-16 h-16">
                <img
                  src={uploadedImage}
                  alt={`${name} resmi`}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageRemove?.();
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 text-xs"
                >
                  ×
                </button>
              </div>
            ) : (
              <>
                <label
                  htmlFor={`image-${id}`}
                  className="cursor-pointer block w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {placeholder ? (
                    <img
                      src={placeholder}
                      alt="Örnek resim"
                      className="w-full h-full object-cover rounded-lg opacity-50"
                    />
                  ) : (
                    <div className="w-6 h-6 text-gray-400">+</div>
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
            className="w-24"
            value={activityValue}
            onChange={(e) => onValueChange?.(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </div>
  );
};