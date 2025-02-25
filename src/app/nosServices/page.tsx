import React, { useEffect, useState } from 'react';

import Services from "@/componenets/services"
import { cookies } from "next/headers"
import { getServerSideUser } from "@/lib/payload-utils"
import MaxWidthWrapper from '@/componenets/MaxWidthWrapper';
import { redirect } from 'next/navigation';


const Page = async () => {

    return <MaxWidthWrapper>
        <section className="bg-black text-white py-20 px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold mb-16 text-center">À NellyGlam, chaque service est une symphonie de précision, de science et d'art.</h2>

                {/* Soins du Visage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch mb-16">
                    <img src="https://images.unsplash.com/photo-1598300188904-6287d52746ad?q=80&w=400" alt="Soins du visage" className="w-full h-full object-cover" />
                    <div className="p-8 flex flex-col justify-center">
                        <h3 className="text-3xl font-semibold mb-4">01 Soins du Visage</h3>
                        <p className="mb-4">La Quintessence de l’Éclat</p>
                        <p className="text-lg mb-4">Nous croyons que chaque visage mérite une attention particulière pour rayonner de santé et de beauté.</p>
                        <p className="text-lg mb-4">Grâce à des soins personnalisés, nous révélons votre éclat naturel.</p>
                        <p className="text-lg">Votre peau, notre priorité.</p>
                    </div>
                </div>

                {/* Injections Esthétiques */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch mb-16">
                    <div className="p-8 flex flex-col justify-center">
                        <h3 className="text-3xl font-semibold mb-4">02 Injections Esthétiques</h3>
                        <p className="mb-4">La Beauté à Fleur de Peau</p>
                        <p className="text-lg mb-4">Rajeunir sans chirurgie avec des traitements subtils et efficaces pour sublimer votre visage.</p>
                        <p className="text-lg mb-4">Chaque injection est réalisée avec précision et douceur.</p>
                        <p className="text-lg">Redécouvrez une peau lisse et harmonieuse.</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1598300188904-6287d52746ad?q=80&w=400" alt="Injections esthétiques" className="w-full h-full object-cover" />
                </div>

                {/* Remodelage Corporel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch mb-16">
                    <img src="https://images.unsplash.com/photo-1598300188904-6287d52746ad?q=80&w=400" alt="Remodelage corporel" className="w-full h-full object-cover" />
                    <div className="p-8 flex flex-col justify-center">
                        <h3 className="text-3xl font-semibold mb-4">03 Remodelage Corporel</h3>
                        <p className="mb-4">Sculpté à la Perfection</p>
                        <p className="text-lg mb-4">Des traitements non-invasifs pour raffermir, tonifier et affiner votre silhouette.</p>
                        <p className="text-lg mb-4">Chaque courbe est sculptée avec soin et expertise.</p>
                        <p className="text-lg">Votre corps, sublimé et harmonieux.</p>
                    </div>
                </div>

                {/* Épilation Laser */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch mb-16">
                    <div className="p-8 flex flex-col justify-center">
                        <h3 className="text-3xl font-semibold mb-4">04 Épilation Laser</h3>
                        <p className="mb-4">La Peau Parfaite, Sans Effort</p>
                        <p className="text-lg mb-4">Dites adieu aux poils indésirables grâce à notre technologie laser avancée.</p>
                        <p className="text-lg mb-4">Une peau douce et lisse en toute circonstance.</p>
                        <p className="text-lg">Profitez de résultats durables et efficaces.</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1598300188904-6287d52746ad?q=80&w=400" alt="Épilation laser" className="w-full h-full object-cover" />
                </div>

                {/* Soins Spécifiques */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
                    <img src="https://images.unsplash.com/photo-1598300188904-6287d52746ad?q=80&w=400" alt="Soins spécifiques" className="w-full h-full object-cover" />
                    <div className="p-8 flex flex-col justify-center">
                        <h3 className="text-3xl font-semibold mb-4">05 Soins Spécifiques</h3>
                        <p className="mb-4">Sur Mesure pour Vous</p>
                        <p className="text-lg mb-4">Des soins ciblés pour traiter les cicatrices, vergetures et pigmentation avec des résultats visibles.</p>
                        <p className="text-lg mb-4">Chaque soin est adapté à vos besoins uniques.</p>
                        <p className="text-lg">Votre beauté, notre mission.</p>
                    </div>
                </div>
            </div>
        </section>


    </MaxWidthWrapper>
}

export default Page