"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSignupValidator = exports.AuthLoginValidator = exports.genre = void 0;
const zod_1 = require("zod");
exports.genre = ['homme',
    'femme'
];
exports.AuthLoginValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, { message: 'Le mot de passe doit comporter au moins 8 caractères.' }),
});
exports.AuthSignupValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, { message: 'Le mot de passe doit comporter au moins 8 caractères.' }),
    nom: zod_1.z.string(),
    prenom: zod_1.z.string(),
    tel: zod_1.z.string(),
    genre: zod_1.z.enum(exports.genre),
});
