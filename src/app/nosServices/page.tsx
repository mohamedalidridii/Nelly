"use client"
import React, { useEffect, useState } from 'react';

import Services from "@/componenets/services"
import { cookies } from "next/headers"
import { getServerSideUser } from "@/lib/payload-utils"
import MaxWidthWrapper from '@/componenets/MaxWidthWrapper';
import { redirect } from 'next/navigation';
import Link from 'next/link';


const Page =  () => {
    const [language, setLanguage] = useState('fr');
    const services = [
        {
            id: 1,
            title: language === 'fr' ? 'Soins du Visage' : 'Facial Care',
            subtitle: language === 'fr' ? 'La Quintessence de l’Éclat' : 'The Quintessence of Glow',
            description: language === 'fr' 
              ? 'Nous croyons que chaque visage mérite une attention particulière pour rayonner de santé et de beauté. Grâce à des soins personnalisés, nous révélons votre éclat naturel. Votre peau, notre priorité.'
              : 'We believe every face deserves special care to shine with health and beauty. Through personalized treatments, we reveal your natural glow. Your skin, our priority.',
            duration: '60 mins',
        },
        {
            id: 2,
            title: language === 'fr' ? 'Injections Esthétiques' : 'Aesthetic Injections',
            subtitle: language === 'fr' ? 'La Beauté à Fleur de Peau' : 'Beauty at Skin Depth',
            description: language === 'fr' 
              ? 'Rajeunir sans chirurgie avec des traitements subtils et efficaces pour sublimer votre visage. Chaque injection est réalisée avec précision et douceur. Redécouvrez une peau lisse et harmonieuse.'
              : 'Rejuvenate without surgery with subtle and effective treatments to enhance your face. Each injection is performed with precision and gentleness. Rediscover smooth and harmonious skin.',
            duration: '45 mins',
        },
        {
            id: 3,
            title: language === 'fr' ? 'Remodelage Corporel' : 'Body Contouring',
            subtitle: language === 'fr' ? 'Sculpté à la Perfection' : 'Sculpted to Perfection',
            description: language === 'fr' 
              ? 'Des traitements non-invasifs pour raffermir, tonifier et affiner votre silhouette. Chaque courbe est sculptée avec soin et expertise. Votre corps, sublimé et harmonieux.'
              : 'Non-invasive treatments to firm, tone, and refine your silhouette. Each curve is sculpted with care and expertise. Your body, enhanced and harmonious.',
            duration: '90 mins',
        },
        {
            id: 5,
            title: language === 'fr' ? 'Soins Spécifiques' : 'Specific Treatments',
            subtitle: language === 'fr' ? 'Sur Mesure pour Vous' : 'Tailored for You',
            description: language === 'fr' 
              ? 'Des soins ciblés pour traiter les cicatrices, vergetures et pigmentation avec des résultats visibles. Chaque soin est adapté à vos besoins uniques. Votre beauté, notre mission.'
              : 'Targeted treatments to address scars, stretch marks, and pigmentation with visible results. Each treatment is tailored to your unique needs. Your beauty, our mission.',
            duration: '75 mins',
        },
        {
            id: 5,
            title: language === 'fr' ? 'Soins Spécifiques' : 'Specific Treatments',
            subtitle: language === 'fr' ? 'Sur Mesure pour Vous' : 'Tailored for You',
            description: language === 'fr' 
              ? 'Des soins ciblés pour traiter les cicatrices, vergetures et pigmentation avec des résultats visibles. Chaque soin est adapté à vos besoins uniques. Votre beauté, notre mission.'
              : 'Targeted treatments to address scars, stretch marks, and pigmentation with visible results. Each treatment is tailored to your unique needs. Your beauty, our mission.',
            duration: '75 mins',
        },
      ];
    
    return <MaxWidthWrapper>
            <section className="bg-black text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">{language === 'fr' ? 'NellyGlam - Clinique Esthetique' : 'NellyGlam - Medical Esthetique Clinic'}</h2>
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded-full font-semibold"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        <p className="text-lg mb-16 max-w-2xl">
        {language === 'fr' 
            ? 'Découvrez nos soins esthétiques avancés conçus pour révéler votre beauté naturelle et illuminer votre peau.' 
            : 'Discover our advanced aesthetic treatments designed to reveal your natural beauty and illuminate your skin.'}
        </p>
        {services.map((service) => (
          <div key={service.id} className="flex justify-between items-center border-b border-gray-700 py-8 px-11">
            <div className="max-w-2xl">
              <h3 className="text-2xl  mb-2">{service.title}</h3>
              <p className="text-sm mb-4">{service.subtitle}</p>
              <p className="text-gray-400 mb-2">{service.description}</p>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-xl">{service.duration}</span>
              <Link href="/rendez-vous" className="px-6 py-2 font-semibold border border-[#ffff] text-white z-50 rounded-lg hover:text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-700 hover:border-[#FFD700]">{language === 'fr' ? 'Choisir' : 'Choose'}</Link>
            </div>
          </div>
        ))}
      </div>
    </section>


    </MaxWidthWrapper>
}

export default Page