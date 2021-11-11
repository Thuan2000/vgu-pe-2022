import {
	MAX_IMAGE_HEIGHT,
	MAX_IMAGE_WIDTH,
	THUMB_IMAGE_HEIGHT,
	THUMB_IMAGE_WIDTH
} from "@utils/constants";
import sharp from "sharp";
import fs from "fs";
import tmp from "tmp";

/**
 *
 * @param fileStream @FileStream
 */
export async function resizeImage(fileStream: any) {
	try {
		// const defaultImage = await sharp().resize(
		// 	MAX_IMAGE_WIDTH,
		// 	MAX_IMAGE_HEIGHT
		// );

		const thumbImage = await sharp().resize(
			THUMB_IMAGE_WIDTH,
			THUMB_IMAGE_HEIGHT
		);

		const thumbRes = fileStream.pipe(thumbImage);

		return { thumbRes };
	} catch (e) {
		console.log("ERROR: " + e);
	}
}
