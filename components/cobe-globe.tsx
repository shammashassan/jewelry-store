"use client";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function CobeGlobe({ className }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		let phi = 0;

		if (!canvasRef.current) {
			return;
		}

		const globe = createGlobe(canvasRef.current, {
			devicePixelRatio: 2,
			width: 300 * 2,
			height: 300 * 2,
			phi: 0,
			theta: 0,
			dark: 1,
			diffuse: 1.2,
			mapSamples: 16_000,
			mapBrightness: 13,
			baseColor: [0.3, 0.3, 0.3],
			markerColor: [0.1, 0.8, 1],
			glowColor: [1, 1, 1],
			markers: [
				// longitude latitude
				{ location: [37.7595, -122.4367], size: 0.03 },
				{ location: [19.076, 72.8777], size: 0.1 }, // Mumbai (relevant for jewelry store likely)
			],
			// @ts-ignore
			onRender: (state: any) => {
				// Called on every animation frame.
				// `state` will be an empty object, return updated params.
				state.phi = phi;
				phi += 0.01;
			},
		});

		return () => {
			globe.destroy();
		};
	}, []);

	return (
		<canvas
			className={className}
			ref={canvasRef}
			style={{ width: 300, height: 300, maxWidth: "100%", aspectRatio: 1 }}
		/>
	);
}
