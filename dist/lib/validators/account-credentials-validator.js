"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSignupValidator = exports.RendezVousValidator = exports.mappedRdv = exports.AuthLoginValidator = exports.rendezVous = exports.genre = void 0;
const zod_1 = require("zod");
exports.genre = ['homme',
    'femme'
];
exports.rendezVous = [
    "online",
    "cabinet",
];
exports.AuthLoginValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, { message: 'Le mot de passe doit comporter au moins 8 caractères.' }),
});
exports.mappedRdv = {
    online: "en-ligne",
    cabinet: "cabinet",
};
exports.RendezVousValidator = zod_1.z.object({
    nom: zod_1.z.string(),
    prenom: zod_1.z.string(),
    // RendezVous: z.enum(RendezVous),
    date: zod_1.z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
        message: "Invalid date format",
    }).transform((date) => new Date(date).toISOString()),
    RendezVous: zod_1.z.enum(exports.rendezVous)
});
exports.AuthSignupValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, { message: 'Le mot de passe doit comporter au moins 8 caractères.' }),
    nom: zod_1.z.string(),
    prenom: zod_1.z.string(),
    tel: zod_1.z.string(),
    genre: zod_1.z.enum(exports.genre),
});
