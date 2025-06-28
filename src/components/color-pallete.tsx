import Compact from "@uiw/react-color-compact";

import { useCanvasDataStore } from "../lib/storage/canvas-data-store";

export default function ColorPallete() {
  const { selectedColor, setSelectedColor } = useCanvasDataStore();

  return (
    <div className="flex flex-col items-start">
      <Compact
        color={selectedColor}
        style={{
          boxShadow:
            "rgb(0 0 0 / 15%) 0px 0px 0px 1px, rgb(0 0 0 / 15%) 0px 8px 16px",
        }}
        onChange={(color) => {
          setSelectedColor(color.hex);
        }}
      />
    </div>
  );
}
