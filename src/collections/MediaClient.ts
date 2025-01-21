import { CollectionConfig, Access } from "payload/types"
import { User } from "@/cms-types"

const isAdminOrHasAccessToImages = 
    (): Access => async ({req}) => {
    const user = req.user as User | undefined
    if (!user) return false
    if (user.role === 'admin') return true

    return {
        user: {
            equals: req.user.id,
        },
    }
}


export const MediaClient: CollectionConfig = {
    slug: "mediaClient",
    hooks: {
        beforeChange: [({req, data})=>{
            return {...data, user: req.user.id}
            },
        ], 
    },
    access:{
        read: async({req}) => {
            const referer = req.headers.referer

            if(!req.user || !referer?.includes('admin')) {
                return true
            }
            return await isAdminOrHasAccessToImages()({req})
        },
        delete: isAdminOrHasAccessToImages(),
        update: isAdminOrHasAccessToImages()
    },
    admin:{
        hidden: ({ user })=> user.role !== "Topadmin",
    },
    upload: {
        staticURL: "/mediaClient",
        staticDir: "mediaClient",
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre',
            },
            {
                name: 'tablet',
                width: 1024,
                height: undefined,
                position: 'centre',
            },
        ],
        mimeTypes: ["image/*"],
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: false,
            hasMany: false,
            admin:{
                condition: ()=> false,
            },
        }
    ]
}