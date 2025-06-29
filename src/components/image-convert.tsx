import { useState } from "react";

import { useCanvasDataStore } from "../lib/storage/canvas-data-store";
import { toastError, toastSuccess } from "./toast";

export default function ImageConvert() {
	const { canvasSize, colorData, clearColorData } = useCanvasDataStore();

	const [svgData, setSvgData] = useState<string>("");

	function flipTopRightToBottomLeft(grid: (string | undefined)[][]) {
		const n = grid.length;
		const result = Array.from({ length: n }, (_) => Array(n));

		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				result[j][i] = grid[i]?.[j];
			}
		}

		return result;
	}

	function convertColorArrayToSVG(colorData: (string | undefined)[][]) {
		const colorGrid = flipTopRightToBottomLeft(colorData);

		const height = canvasSize.height;
		const width = canvasSize.width;

		const colorMap: Record<string, [number, number][]> = {};

		// Group coordinates by color
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const color = colorGrid[y]?.[x];
				if (!color) continue;
				if (!colorMap[color]) colorMap[color] = [];
				colorMap[color].push([x, y]);
			}
		}

		// Optimize paths for horizontal lines
		function makePathData(points: [number, number][]) {
			const paths: string[] = [];
			let prev: [number, number] | null = null;
			let width = 1;

			for (const [x, y] of points) {
				if (prev && y === prev[1] && x === prev[0] + width) {
					width++;
				} else {
					if (prev) {
						paths.push(`M${prev[0]} ${prev[1]}h${width}`);
					}
					prev = [x, y];
					width = 1;
				}
			}

			if (prev) {
				paths.push(`M${prev[0]} ${prev[1]}h${width}`);
			}

			return paths.join("");
		}

		// Create SVG paths
		let svgPaths = "";
		for (const color in colorMap) {
			const pathData = makePathData(colorMap[color]);
			svgPaths += `<path stroke="${color}" d="${pathData}" />\n`;
		}

		// SVG wrapper
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 ${width} ${height}" shape-rendering="crispEdges" >\n${svgPaths}</svg>`;

		return svg;
	}

	function handleConvert() {
		try {
			const convertedSvg = convertColorArrayToSVG(colorData);

			navigator.clipboard.writeText(convertedSvg);
			setSvgData(convertedSvg);

			toastSuccess("SVG Copied!");
		} catch {
			toastError("Error occured while copying!");
		}
	}

	function handleClear() {
		try {
			setSvgData("");
			clearColorData();
		} catch {
			toastError("Error occured while clearing!");
		}
	}

	return (
		<div className="flex w-full flex-col items-center gap-4">
			<button className="w-full" onClick={handleConvert}>
				Copy
			</button>

			<button className="w-full" onClick={handleClear}>
				Clear
			</button>

			<div>{svgData}</div>
		</div>
	);
}
