import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { category } from './category'
import { producttype } from './producttype'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,category,producttype]
}
