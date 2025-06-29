import "./App.css";

import { ToastContainer } from "react-toastify";

import CanvasSizing from "./components/canvas-sizing";
import ColorPallete from "./components/color-pallete";
import GridCanvasBoard from "./components/grid-canvas-board";
import ImageConvert from "./components/image-convert";

export default function App() {
	return (
		<div className="relative flex flex-col items-center gap-12 lg:flex-row">
			<GridCanvasBoard />

			<div className="flex h-full w-full flex-1 flex-col items-center gap-4 lg:max-w-[40dvh]">
				<ColorPallete />

				<CanvasSizing />

				<ImageConvert />
			</div>

			<ToastContainer />
		</div>
	);
}
