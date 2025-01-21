import { buildConfig } from "payload/config";
import { postgresAdapter } from '@payloadcms/db-postgres'
import {slateEditor} from '@payloadcms/richtext-slate'
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";
import { Users } from "./collections/Users";
import { Products } from './collections/Products/Products'
import { RendezVous } from './collections/RendezVous'
import { Media } from "./collections/Media";
import { ProductFiles } from "./collections/ProductFiles";
import { Orders } from "./collections/Orders";
import dotenv from "dotenv";
import Logo from './hooks/graphics/Logo';
import Icon from './hooks/graphics/Icon';
import FormBuilder from "@payloadcms/plugin-form-builder";
import { Quiz } from "./collections/Quiz";
import { QuizSubmissions } from "./collections/QuizSubmissions";
dotenv.config({
    path: path.resolve(__dirname, "../.env"),
})

export default buildConfig({
    // serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL ,
    collections: [Users, Products, Media, ProductFiles, Orders, RendezVous, Quiz, QuizSubmissions], 
        routes: {
        admin: '/admin'
    },
    admin: {
        user: "users",
        bundler: webpackBundler(),
        meta: {
            titleSuffix: '- RymGamra',
            favicon: "/favicon.ico",
            ogImage: "/thumbnail.jpg",
    },
    components: {
        views:{
            
        },
        graphics: {
          Logo: Logo,
          Icon: Icon,
        },
      },
    
},
rateLimit: {
    max: 2000,
},
    editor: slateEditor({}),
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL,
        }
    }),
    typescript:{
        outputFile: path.resolve(__dirname,"cms-types.ts"),
    }
})