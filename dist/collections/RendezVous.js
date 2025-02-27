"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendezVous = void 0;
exports.RendezVous = {
    slug: 'rendezVous',
    labels: {
        singular: {
            en: 'Rendez-vous',
            fr: 'Rendez-vous'
        },
        plural: {
            en: 'Rendez-vous',
            fr: 'Rendez-vous'
        },
    },
    admin: {
        group: 'Rendez-vous',
        description: 'Espace rendez-vous',
        useAsTitle: 'Rendez-vous',
    },
    fields: [
        {
            name: 'nom',
            label: 'Nom',
            type: 'text',
            required: true,
        },
        {
            name: 'prenom',
            label: 'Prenom',
            type: 'text',
            required: true,
        },
        {
            name: 'RendezVous',
            defaultValue: 'N/A',
            label: 'Rendez-Vous',
            type: 'text',
            required: false,
        },
        {
            name: 'date',
            label: 'Date de Rendez-Vous',
            type: 'text',
            required: true,
        },
    ]
};
