"use client"
import MaxWidthWrapper from '@/componenets/MaxWidthWrapper'
import ProductReel from '@/componenets/ProductReel'
import { PRODUCT_CATEGORIES } from '@/config'
import Image from 'next/image'


type Param = string | string[] | undefined

interface ProtocolsPageProps {
  searchParams: { [key: string]: Param }
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

const ProtocolsPage = ({
  searchParams,
}: ProtocolsPageProps) => {
  const sort = parse(searchParams.sort)
  const category = parse(searchParams.category)

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label

  return (
    <MaxWidthWrapper>
      
        <section className="py-24 relative">
          <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
              <div
                className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
                <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                  <Image width={"1000"} height={"1000"} className=" rounded-xl" src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="about Us image" />
                </div>
                <Image width={"1000"} height={"1000"} className="sm:ml-0 ml-auto rounded-xl" src="https://plus.unsplash.com/premium_photo-1663853294228-ced39f53ecc7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="about Us image" />
              </div>
              <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                <div className="w-full flex-col justify-center items-start gap-8 flex">
                  <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                    <h2
                      className="text-gray-900 text-start text-4xl font-manrope leading-normal md:text-start font-serif">
                      Découvrez Nos Protocoles Nutritionnels Personnalisés</h2>
                    <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                      Atteignez vos objectifs de santé et de bien-être avec nos protocoles nutritionnels spécialement conçus pour répondre à vos besoins uniques.
                      Que vous cherchiez à perdre du poids,
                      à augmenter votre énergie, ou à optimiser votre santé globale,
                      nous avons un programme pour vous.</p>
                  </div>
                  <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                    <div className="flex-col justify-start items-start inline-flex">
                      <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">+10 ans</h3>
                      <h6 className="text-gray-500 text-base font-normal leading-relaxed">d&apos;experiences</h6>
                    </div>
                    <div className="flex-col justify-start items-start inline-flex">
                      <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">+20</h4>
                      <h6 className="text-gray-500 text-base font-normal leading-relaxed">protols</h6>
                    </div>
                    <div className="flex-col justify-start items-start inline-flex">
                      <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">+125</h4>
                      <h6 className="text-gray-500 text-base font-normal leading-relaxed">Patients</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr className="border-gray-800 dark:border-gray-300"/>
        <section className="mt-32 mx-auto max-w-screen-2xl px-4 md:px-8">
    <div className="mb-8 flex flex-wrap justify-between md:mb-16">
      <div className="mb-6 flex w-full flex-col justify-center sm:b-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
        <h1 className="mb-4 text-3xl  text-start sm:text-4xl md:mb-8 md:text-4xl font-serif">Pourquoi Choisir Nos Protocoles ?</h1>

        <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">Chaque protocole est élaboré après une évaluation complète de votre état de santé,
        de vos habitudes alimentaires et de vos objectifs personnels.</p>
      </div>

      <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
        <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
          <Image height={"1000"} src="https://images.unsplash.com/photo-1470167290877-7d5d3446de4c?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" loading="lazy" alt="Photo by Kaung Htet" className="h-full w-full object-cover object-center" width={"1000"} />
        </div>

        <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
          <Image height={"1000"} src="https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" loading="lazy" alt="Photo by Manny Moreno" className="h-full w-full object-cover object-center" width={"1000"} />
        </div>
      </div>
    </div>

    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">


      <div className="flex items-center justify-center gap-4 lg:justify-center">
        <span className="h-px max-w-60 bg-gray-200"></span>
      </div>
    </div>
  </section>
  <hr className="border-teal-800 dark:border-teal-800 my-32 opacity-15"/>
  <div className=''>
        <h1 className='text-3xl text-start tracking-tight text-gray-900 sm:text-4xl font-serif'>Découvrez Nos Protocoles Nutritionnels Personnalisés</h1>
        <ol className="relative flex flex-col justify-center space-y-8 tracking-tight">
          <li className="relative flex-1 after:content-['']  after:w-0.5 after:h-full  after:bg-teal-800 after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
            <a href="/protocols#select" className="flex content-center font-medium w-full  ">
              <span className="w-8 h-8 bg-teal-800 z-50 border-2 border-transparent rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">
                <svg className="w-5 h-5 stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7" stroke="stroke-current" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" className="my-path"></path>
                </svg>
              </span>
              <div className="block">
                <h4 className="text-2xl  text-teal-800 font-serif">Choisissez Votre Protocole</h4>
                <span className="text-sm">Explorez nos différents protocoles et sélectionnez celui qui correspond le mieux à vos objectifs.</span>
              </div>
            </a>
          </li>
          <li className="relative flex-1 after:content-['']  after:w-0.5 after:h-full  after:bg-gray-200 after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5">
            <a className="flex items-center font-medium w-full  ">
              <span className="w-8 h-8 bg-teal-100  border-2 border-teal-800 rounded-full flex justify-center items-center mr-3 text-sm text-teal-800 lg:w-10 lg:h-10">2</span>
              <div className="block">
                <h4 className="text-2xl  text-teal-800 font-serif">Recevez Votre Plan</h4>
                <span className="text-sm">Après votre achat, recevez un plan détaillé avec des recommandations alimentaires, des recettes, et des conseils pratiques.</span>
              </div>
            </a>
          </li>
          <li className="relative flex-1">
            <a className="flex items-center font-medium w-full  ">
              <span className="w-8 h-8 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mr-3 text-sm  lg:w-10 lg:h-10">3</span>
              <div className="block">
                <h4 className="text-2xl  text-teal-800 font-serif">Atteignez Vos Objectifs</h4>
                <span className="text-sm">Suivez les étapes simples et profitez du chemin vers une meilleure santé et un bien-être durable.</span>
              </div>
            </a>
          </li>
        </ol>
        </div>
        <hr className="border-teal-800 dark:border-teal-800 my-32 opacity-15"/>

      <h1 className='text-3xl  tracking-tight text-gray-900 sm:text-4xl font-serif'>Les Protocoles Disponibles</h1>
      <div id='select'>
      <ProductReel
        title={''}
        query={{
          category,
          limit: 20,
          sort:
            sort === 'desc' || sort === 'asc'
              ? sort
              : undefined,
        }}
      />
      </div>
    </MaxWidthWrapper>
  )
}

export default ProtocolsPage