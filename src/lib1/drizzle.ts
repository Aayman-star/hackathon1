import {pgTable,varchar,integer,serial,text} from 'drizzle-orm/pg-core'
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres'

export const cartTable = pgTable('cart',{
    id:serial('id').primaryKey(),
    user_id:varchar('user_id',{
        length:255
    }).notNull(),
    product_id:varchar('product_id',{
        length:255
    }).notNull(),
    quantity:integer('quantity').notNull(),
    price:integer('price').notNull(),
    total_price:integer('total_price').notNull(),
    product_name:varchar('product_name',{
        length:255
    }).notNull(),
    image:varchar('image',{
        length:400
    }).notNull(),
    // text('image').notNull()


}
)

export const db = drizzle(sql);