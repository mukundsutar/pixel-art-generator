import { useState } from "react";

import { useCanvasDataStore } from "../lib/storage/canvas-data-store";

interface GridCanvasCellProps {
  row: number;
  col: number;
}

export default function GridCanvasCell({ row, col }: GridCanvasCellProps) {
  const { selectedColor, colorData, setColorData } = useCanvasDataStore();

  const [hovered, setHovered] = useState<boolean>(false);

  function handleCellColorChange() {
    console.log(selectedColor, row, col);

    setColorData(selectedColor ?? "", row, col);
  }

  const bgColor = colorData?.[col]?.[row] ?? undefined;

  return (
    <div
      className="col-span-1 h-[1dvw] w-[1dvw] flex-1 hover:bg-gray-300"
      style={{
        backgroundColor: hovered && selectedColor ? selectedColor : bgColor,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleCellColorChange}
    ></div>
  );
}
