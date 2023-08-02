import { defineType,defineField } from "sanity"
export const product = {
    name:'product',
    type:'document',
    title: 'Product',
    fields:[
        {
            name:'title',
            title:'Title',
            type:'string'
        },
        {
            name:'description',
            title:'Product Description',
            type:'string'
        },
        {
            name:'price',
            title:'Price',
            type:'number'
        },
        defineField({
            name:'category',
            title:'Category',
            type:'reference',
            to:[
                {
                    type:'category'
                }
            ]
        }),
        defineField({
            name:'producttype',
            title:'Product Type',
            type:'reference',
            to:[
                {
                    type:'producttype'
                }
            ]
        }),
       
        {
            name:'image',
            title:'Product Image',
            type:'image'
        }
    ]

}