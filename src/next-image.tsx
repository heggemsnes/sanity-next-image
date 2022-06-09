import React from "react"
import imageUrlBuilder from "@sanity/image-url"
import { INextImage } from "./types"
import {
  getCroppedDimensions,
  getImageDimensions,
  getSanityRefId,
} from "./utils"
import Image from "next/image"

export function NextImage({ config, image }: INextImage) {
  if (!image) {
    throw new Error("No image provided")
  }

  if (!config) {
    throw new Error("No config provided")
  }
  const id = getSanityRefId(image)
  const base = getImageDimensions(id)
  const cropped = getCroppedDimensions(image, base)
  const urlFor = imageUrlBuilder(config).image(image)

  return (
    <Image
      width={cropped.width}
      height={cropped.height}
      src={urlFor.width(cropped.width).height(cropped.height).url() ?? ""}
    />
  )
}
