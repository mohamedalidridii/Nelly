"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const anyone_1 = require("./anyone");
exports.Users = {
    slug: "users",
    labels: {
        singular: {
            en: 'Patient',
            fr: 'Patient'
        },
        plural: {
            en: 'patients',
            fr: 'Patients'
        }
    },
    admin: {
        group: 'Patients',
        hidden: ({ user }) => user.role === 'patient',
        useAsTitle: 'D',
    },
    auth: {
        verify: {
            generateEmailHTML: ({ token }) => {
                return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-client?token=${token}'>Verify Client</a>`;
            },
        }
    },
    access: {
        create: anyone_1.anyone,
        read: ({ req }) => req.user.role === 'admin',
        update: ({ req }) => req.user.role === 'admin',
        delete: ({ req }) => req.user.role === 'admin',
    },
    fields: [
        {
            name: 'role',
            defaultValue: 'patient',
            required: true,
            type: 'select',
            options: [
                { value: 'admin', label: 'Admin' },
                { value: 'patient', label: 'Patient' },
            ],
        },
        {
            name: 'nom',
            defaultValue: 'N/A',
            required: true,
            type: 'text',
        },
        {
            name: 'prenom',
            defaultValue: 'N/A',
            required: true,
            type: 'text',
        },
        {
            name: 'tel',
            defaultValue: 'N/A',
            required: true,
            type: 'text',
        },
        {
            name: 'genre',
            required: true,
            type: 'select',
            options: [
                { value: 'homme', label: 'Homme' },
                { value: 'femme', label: 'Femme' },
            ],
        },
        {
            name: 'products',
            label: 'Products',
            admin: {
                condition: () => false,
            },
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
        },
        {
            name: 'product_files',
            label: 'Product files',
            admin: {
                condition: () => false,
            },
            type: 'relationship',
            relationTo: 'product_files',
            hasMany: true,
        },
    ]
};
