import {
  SanityClientLike,
  SanityImageSource,
  SanityProjectDetails,
} from "@sanity/image-url/lib/types/types"

export interface INextImage {
  image: SanityImageSource
  width?: number
  height?: number
  alt?: string
  sizes?: string
  config: SanityClientLike | SanityProjectDetails
}

export interface ImageDimensions {
  width: number
  height: number
  aspectRatio: number
}
