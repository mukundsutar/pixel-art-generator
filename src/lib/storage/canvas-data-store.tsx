import { create } from "zustand";

import { defaultColor } from "../constants";

interface CanvasSizeType {
  width: number;
  height: number;
}

interface CanvasDataState {
  canvasSize: CanvasSizeType;
  setCanvasSize: (by: CanvasSizeType) => void;

  selectedColor: string | undefined;
  setSelectedColor: (by: string) => void;

  colorData: (string | undefined)[][];
  setColorData: (by: string, row: number, col: number) => void;
}

export const useCanvasDataStore = create<CanvasDataState>((set) => ({
  canvasSize: { width: 32, height: 32 },
  setCanvasSize: (by) => set({ canvasSize: by }),

  selectedColor: defaultColor,
  setSelectedColor: (by) => set({ selectedColor: by }),

  colorData: [],
  setColorData: (by, row, col) =>
    set((state) => {
      const newColorData = state.colorData ? [...state.colorData] : [];
      const currRow = newColorData[col] ? [...newColorData[col]] : [];

      currRow[row] = by;
      newColorData[col] = currRow;

      return { colorData: newColorData };
    }),
}));
