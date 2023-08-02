import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import  { client } from '@/lib1/sanityClient'

import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder(client)

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source)
}
// removed this from the line above
// .auto('format').fit('max')