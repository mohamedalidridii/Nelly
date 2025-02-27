"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const PrimaryActionEmail_1 = require("../componenets/emails/PrimaryActionEmail");
const adminsAndUser = ({ req: { user } }) => {
    if (user.role === 'admin')
        return true;
    return {
        id: {
            equals: user.id,
        },
    };
};
exports.Users = {
    slug: "users",
    labels: {
        singular: {
            en: 'User',
            fr: 'Utilisateur'
        },
        plural: {
            en: 'Users',
            fr: 'Utilisateurs'
        }
    },
    auth: {
        verify: {
            generateEmailHTML: ({ token }) => {
                return (0, PrimaryActionEmail_1.PrimaryActionEmailHtml)({
                    actionLabel: "verify your account",
                    buttonText: "Verify Account",
                    href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`
                });
            },
        },
    },
    access: {
        read: adminsAndUser,
        create: () => true,
        update: ({ req }) => req.user.role === 'admin',
        delete: ({ req }) => req.user.role === 'admin',
    },
    admin: {
        hidden: ({ user }) => user.role !== 'admin',
        defaultColumns: ['id'],
        useAsTitle: 'Utilisateurs',
        group: 'Patients'
    },
    fields: [
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
    ],
};
