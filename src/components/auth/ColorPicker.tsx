import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ColorPickerProps {
  hue: number;
  setHue: (hue: number) => void;
}

export const ColorPicker = ({ hue, setHue }: ColorPickerProps) => {
  const selectedColor = `hsl(${hue}, 70%, 60%)`;

  return (
    <div className="space-y-4">
      <Label>Senin Rengin Ne?</Label>
      <div className="space-y-6">
        <div 
          className="w-full h-24 rounded-lg"
          style={{ backgroundColor: selectedColor }}
        />
        <Slider
          value={[hue]}
          onValueChange={(values) => setHue(values[0])}
          max={360}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
};