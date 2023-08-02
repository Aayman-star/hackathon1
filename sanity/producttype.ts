import { defineType,defineField } from "sanity"

export const producttype = defineType( {
    name:'producttype',
    title:'Product Type',
    type:'document',
    fields:
        [
        defineField({
        name : 'name',
        title: 'Type name',
        type:'string'

    })
]
}
)