import { useCanvasDataStore } from "../lib/storage/canvas-data-store";
import GridCanvasCell from "./grid-canvas-cell";

export default function GridCanvasBoard() {
	const { canvasSize } = useCanvasDataStore();

	return (
		<div
			className="grid h-[80dvw] w-[80dvw] bg-white select-none lg:h-[80dvh] lg:w-[80dvh]"
			style={{
				gridTemplateColumns: `repeat(${canvasSize.width}, minmax(0, 1fr))`,
				gridTemplateRows: `repeat(${canvasSize.height}, minmax(0, 1fr))`,
			}}
		>
			{Array(canvasSize.width * canvasSize.height)
				.fill("")
				.map((_, index) => {
					const row = Math.floor(index / canvasSize.width);
					const col = index % canvasSize.width;

					return (
						<GridCanvasCell
							key={`${row}-${col}`}
							row={row}
							col={col}
						/>
					);
				})}
		</div>
	);
}
