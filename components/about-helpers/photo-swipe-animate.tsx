"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, PanInfo } from "framer-motion";
import { photoAlbum } from "@/data/data-index";
import { photoBorderColors } from "@/lib/master-color-scheme";

const getAlbumImages = (): string[] => {
	// actual images HERE: public/images/album/
	const albumImages = photoAlbum as string[];

	// Empty folder handling
	return albumImages.length > 0 ? albumImages : ["/images/default/about-me.jpg"];
};

export function PhotoSwipe() {
	const images = getAlbumImages();
	const [photos, setPhotos] = useState(images.map((img, idx) => ({ id: idx, src: img })));
	const [exitDirection, setExitDirection] = useState(0);

	const handleDragEnd = (_: any, info: PanInfo) => {
		if (Math.abs(info.offset.x) > 100) {
			setExitDirection(info.offset.x);

			setTimeout(() => {
				setPhotos((prev) => {
					const [first, ...rest] = prev;
					return [...rest, { ...first, id: Date.now() }];
				});
				setExitDirection(0);
			}, 300);
		}
	};

	// Rotation logic
	const getRotation = (index: number): number => {
		if (index === 0) return 0;
		return index % 2 === 0 ? 6 : -6;
	};

	// Border color logic
	const getBorderColor = (index: number): string => {
		if (index === 0) return "border-primary";
		return photoBorderColors[(index - 1) % photoBorderColors.length];
	};

	return (
		<div className="relative h-[280px] w-full max-w-[210px] mx-auto flex items-center justify-center">
			{photos.map((photo, index) => {
				const isTop = index === 0;
				const rotation = getRotation(index);
				const borderColor = getBorderColor(index);

				return (
					<motion.div
						key={photo.id}
						className={`absolute rounded-xl shadow-xl border-4 ${borderColor} bg-card overflow-hidden aspect-3/4 w-full ${
							isTop ? "cursor-grab active:cursor-grabbing" : ""
						}`}
						style={{ zIndex: photos.length - index }}
						initial={{
							scale: 0.95 - index * 0.025,
							x: index === 0 ? 0 : index % 2 === 0 ? index * 8 : -index * 8,
							y: index * 6,
							rotate: rotation,
						}}
						animate={
							isTop && exitDirection !== 0
								? { x: exitDirection > 0 ? 300 : -300, opacity: 0 }
								: {
										scale: 0.95 - index * 0.025,
										x: index === 0 ? 0 : index % 2 === 0 ? index * 8 : -index * 8,
										y: index * 6,
										rotate: rotation,
										opacity: index < 7 ? 1 : 0,
									}
						}
						drag={isTop ? "x" : false}
						dragConstraints={{ left: 0, right: 0 }}
						onDragEnd={isTop ? handleDragEnd : undefined}
						whileDrag={isTop ? { scale: 1.05, rotate: 0 } : {}}
						transition={
							exitDirection !== 0
								? { duration: 0.3, ease: "easeOut" }
								: { type: "spring", stiffness: 260, damping: 25 }
						}
					>
						<Image
							src={photo.src}
							alt={`Photo ${photo.id + 1}`}
							fill
							sizes="(max-width: 768px) 248px, 320px"
							className="object-cover"
							draggable={false}
							priority={isTop}
						/>
					</motion.div>
				);
			})}
		</div>
	);
}
