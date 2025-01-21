"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../components/ui/ui-card";
import Link from "next/link";

export function CardRDV() {
  return (<>
    <div className="flex flex-col gap-1 justify-center sm:flex-row sm:gap-3">
      <CardContainer className="inter-var">
        <CardBody className=" relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] bg-white dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[25rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-2xl text-neutral-600 dark:text-neutral-600 font-serif"
          >
            Prendre un rendez-vous
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-600"
          >
            Planifiez votre consultation en personne au cabinet ou en ligne.
          </CardItem>
          <CardItem translateZ="150" className="w-full mt-4">
            <Image
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-20">

            <CardItem
              translateZ={20}
              as={Link}
              href="/rendez-vous"
              className="px-4 py-2 rounded-xl bg-teal-800 dark:bg-teal-800 dark:text-white text-white text-xs font-medium"
            >
              Passer un rendez-vous →
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
      <CardContainer className="inter-var">
        <CardBody className=" relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] bg-white dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[25rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-2xl text-neutral-600 dark:text-neutral-600 font-serif"
          >
            des Protocols alimentaire
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-600"
          >
            Suivre un régime alimentaire recommandé par un professionnel
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={30}
              as={Link}
              href="/protocols"
              className="px-4 py-2 rounded-xl bg-teal-800 dark:bg-teal-800 dark:text-white text-white text-xs font-medium"
            >
              Choisir un protocol  →
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  </>
  );
}
