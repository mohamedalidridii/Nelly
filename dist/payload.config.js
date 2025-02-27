"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("payload/config");
const db_postgres_1 = require("@payloadcms/db-postgres");
const richtext_slate_1 = require("@payloadcms/richtext-slate");
const bundler_webpack_1 = require("@payloadcms/bundler-webpack");
const path_1 = __importDefault(require("path"));
const Users_1 = require("./collections/Users");
const Products_1 = require("./collections/Products/Products");
const RendezVous_1 = require("./collections/RendezVous");
const Media_1 = require("./collections/Media");
const ProductFiles_1 = require("./collections/ProductFiles");
const Orders_1 = require("./collections/Orders");
const dotenv_1 = __importDefault(require("dotenv"));
const Logo_1 = __importDefault(require("./hooks/graphics/Logo"));
const Icon_1 = __importDefault(require("./hooks/graphics/Icon"));
const Quiz_1 = require("./collections/Quiz");
const QuizSubmissions_1 = require("./collections/QuizSubmissions");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../.env"),
});
exports.default = (0, config_1.buildConfig)({
    // serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
    collections: [Users_1.Users, Products_1.Products, Media_1.Media, ProductFiles_1.ProductFiles, Orders_1.Orders, RendezVous_1.RendezVous, Quiz_1.Quiz, QuizSubmissions_1.QuizSubmissions],
    routes: {
        admin: '/admin'
    },
    admin: {
        user: "users",
        bundler: (0, bundler_webpack_1.webpackBundler)(),
        meta: {
            titleSuffix: '- RymGamra',
            favicon: "/favicon.ico",
            ogImage: "/thumbnail.jpg",
        },
        components: {
            views: {},
            graphics: {
                Logo: Logo_1.default,
                Icon: Icon_1.default,
            },
        },
    },
    rateLimit: {
        max: 2000,
    },
    editor: (0, richtext_slate_1.slateEditor)({}),
    db: (0, db_postgres_1.postgresAdapter)({
        pool: {
            connectionString: process.env.DATABASE_URL,
        }
    }),
    typescript: {
        outputFile: path_1.default.resolve(__dirname, "cms-types.ts"),
    }
});
