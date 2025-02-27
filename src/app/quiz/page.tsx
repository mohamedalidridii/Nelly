"use client"

import { trpc } from "@/trpc/client"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from 'react';
import SelectComponent from "@/componenets/Select";
import { Input } from "@/components/ui/input";
import gsap from 'gsap';
import { useForm } from "react-hook-form";
import { ZodError } from "zod";
import { toast } from "sonner";
import Loader from "@/componenets/LoaderQuiz";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/componenets/MaxWidthWrapper";



const Page: React.FC = () => {

  return (
    <MaxWidthWrapper>
      <div className="mt-20 flex flex-col justify-center items-center">
        
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;