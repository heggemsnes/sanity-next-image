import {
  SanityAsset,
  SanityImageObject,
  SanityImageSource,
  SanityReference,
} from "@sanity/image-url/lib/types/types"
import { ImageDimensions } from "./types"

// https://github.com/bundlesandbatches/next-sanity-image/blob/main/src/useNextSanityImage.ts

export function getImageDimensions(id: string) {
  const dimensions = id.split("-")[2]

  const [width, height] = dimensions
    .split("x")
    .map((num: string) => parseInt(num, 10))
  const aspectRatio = width / height

  return { width, height, aspectRatio }
}

export function getSanityRefId(image: SanityImageSource): string {
  if (typeof image === "string") {
    return image
  }

  const obj = image as SanityImageObject
  const ref = image as SanityReference
  const img = image as SanityAsset

  if (typeof image === "string") {
    return image
  }

  if (obj.asset) {
    return obj.asset._ref || (obj.asset as SanityAsset)._id
  }

  return ref._ref || img._id || ""
}

export function getCroppedDimensions(
  image: SanityImageSource,
  baseDimensions: ImageDimensions
): ImageDimensions {
  const crop = (image as SanityImageObject).crop

  if (!crop) {
    return baseDimensions
  }

  const { width, height } = baseDimensions
  const croppedWidth = width * (1 - (crop.left + crop.right))
  const croppedHeight = height * (1 - (crop.top + crop.bottom))

  return {
    width: Math.floor(croppedWidth),
    height: Math.floor(croppedHeight),
    aspectRatio: croppedWidth / croppedHeight,
  }
}
