import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  id: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  uploadedImage?: string;
  isJuryEvaluated?: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
}

export const ImageUpload = ({
  id,
  name,
  placeholder,
  disabled,
  uploadedImage,
  isJuryEvaluated,
  onImageUpload,
  onImageRemove,
}: ImageUploadProps) => {
  return (
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
                onImageRemove();
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
            className={`cursor-pointer block w-20 h-20 border-2 border-dashed border-[#40E0D0]/30 rounded-xl flex items-center justify-center hover:border-[#40E0D0] transition-colors bg-white/50 hover:bg-white ${
              disabled ? 'cursor-not-allowed opacity-50' : ''
            }`}
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
            onChange={onImageUpload}
            onClick={(e) => e.stopPropagation()}
            disabled={disabled}
          />
        </>
      )}
    </div>
  );
};