import "./App.css";

import CanvasSizing from "./components/canvas-sizing";
import ColorPallete from "./components/color-pallete";
import GridCanvasBoard from "./components/grid-canvas-board";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <ColorPallete />

      <CanvasSizing />

      <GridCanvasBoard />

      {/* <PixelCanvasPNG /> */}
    </div>
  );
}
