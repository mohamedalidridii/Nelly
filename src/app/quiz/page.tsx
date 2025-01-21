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


type QuizData = {
  id: string | number;
  question: string;
  type: string;
  option1?: string | null;
  option2?: string | null;
  option3?: string | null;
  option4?: string | null;
  option5?: string | null;
  option6?: string | null;
  option7?: string | null;
  option8?: string | null;
  option9?: string | null;
  option10?: string | null;
  option11?: string | null;
  option12?: string | null;
  option13?: string | null;
  option14?: string | null;
  option15?: string | null;
  option16?: string | null;
  option17?: string | null;
  option18?: string | null;
  option19?: string | null;
  option20?: string | null;
};
type QuizDataResponse = {
  docs: QuizData[];
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pagingCounter: number;
  totalDocs: number;
  totalPages: number;
  nextPage?: number | null;
  page?: number;
  prevPage?: number | null;
};
const isQuizData = (data: any): data is QuizData => {
  return data;
}

const Page: React.FC = () => {
  const [quizStarted, setQuizStarted] = useState(false);  // State to track if the quiz has started
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(),
  })
  const router = useRouter()
  const { data, isLoading } = trpc.getQuiz.useQuery<QuizDataResponse>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<
    { question: string; response: any }[]
  >([]);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  const { mutate } = trpc.auth.quiz.useMutation({
    onError: (err) => {
      console.error('Mutation error:', err);
      if (err.data?.code === "CONFLICT") {
        toast.error("The date is invalid. Please try again");
      }
      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);
        return;
      }
      toast.error("Something went wrong. Please try again.");
    },
    onSuccess: () => {
      toast.success("Quiz submitted successfully");
      router.push("/");
    },
  });
  useEffect(() => {
    if (data) {
      console.log('Fetched data:', data);
      if (Array.isArray(data.docs) && data.docs.length > 0 && isQuizData(data.docs[0])) {
        console.log('Data is valid QuizData:', data.docs[0]);
        setCurrentQuestionIndex(data.docs.length - 1);
      } else {
        console.log('Data is not valid QuizData');
      }
    }
  }, [data]);
  useEffect(() => {
    if (progressBarRef.current && data?.docs.length) {
      const progressPercentage = ((data?.docs.length - currentQuestionIndex) / data?.docs.length) * 100;
      gsap.to(progressBarRef.current, {
        width: `${progressPercentage}%`,
        duration: 0.5,
      });
    }
  }, [currentQuestionIndex, data]);

  if (isLoading) {
    return <Loader />;
  }

  if (!data || data.docs.length === 0 || !isQuizData(data.docs[0])) {
    return <div>No data available</div>;
  }

  const handleResponse = (response: any) => {
    const currentQuizData = data.docs[currentQuestionIndex];
    const updatedResponses = [...responses];
    const existingResponseIndex = updatedResponses.findIndex(
      (resp) => resp.question === currentQuizData.question
    );
    if (existingResponseIndex >= 0) {
      updatedResponses[existingResponseIndex].response = response;
    } else {
      updatedResponses.push({
        question: currentQuizData.question,
        response,
      });
    }
    setResponses(updatedResponses);

  };

  const handleNextQuestion = () => {
    if (questionRef.current) {
      gsap.to(questionRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
          gsap.fromTo(
            questionRef.current,
            { opacity: 0, translateX: "-500" },
            { opacity: 1, duration: 0.5, translateX: "0", ease: "power3.inOut" }
          );
        },
      });
    }
  };

  const quizData = data.docs[currentQuestionIndex];
  if (!quizData) {
    return <div>No more questions available</div>;
  }
  const options = (Object.keys(quizData) as (keyof QuizData)[])
    .filter(key => key.startsWith('option') && quizData[key] !== null)
    .map(key => ({
      label: quizData[key] as string,
      value: quizData[key] as string
    }));


  const onSubmit = () => {
    mutate({ responses });
  };
  if (!quizStarted) {
    return (
      <div className="flex flex-col justify-center items-center mt-24">
        <h1 className="text-4xl font-serif">Le quiz est sur le point de débuter.</h1>
        <Button onClick={() => setQuizStarted(true)} className="mt-4 bg-teal-800">
          Commencer
        </Button>
      </div>
    );
  }
  return (
    <MaxWidthWrapper>
      <div className="mt-20 flex flex-col justify-center items-center">
        <div className="w-full max-w-xl mt-4">
          <div>
            <span id="ProgressLabel" className="sr-only font-serif">Loading</span>
            <span
              role="progressbar"
              aria-labelledby="ProgressLabel"
              aria-valuenow={((currentQuestionIndex + 1) / data.docs.length) * 0}
              className="relative block rounded-full bg-gray-200"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[10px]/2">
                <span className="font-bold text-white">
                  {Math.round(((data.docs.length - currentQuestionIndex - 1 ) / data.docs.length) * 100)}%
                </span>
              </span>
              <span ref={progressBarRef} className="block h-7 rounded-full bg-teal-800 text-center font-serif" style={{ width: '0%' }}></span>
            </span>
          </div>
        </div>
        <div ref={questionRef} className="mt-16 flex flex-col justify-center items-center">
          <h1 className="sm:text-4xl text-2xl font-serif">{quizData.question}</h1>
          {quizData.type === 'select' && (
            <>
              <select className="text-1xl font-medium w-40 border-none font-serif" onChange={(e) => handleResponse(e.target.value)}>
                {options.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </select>
            </>
          )}
          {quizData.type === 'multiSelect' && (
            <>
              <SelectComponent
                options={options}
                onChange={(selectedOptions: any) => handleResponse(selectedOptions)}
              />
            </>
          )}
          {quizData.type === 'text' && (
            <>
              <Input onChange={(e) => handleResponse(e.target.value)} />
            </>
          )}
          {currentQuestionIndex > 0 ? (
            <Button onClick={handleNextQuestion} variant={"outline"} className="w-20 mt-4 p-2">
              suivant
            </Button>
          ) : (
            <Button onClick={handleSubmit(onSubmit)} variant={"outline"} className=" w-20 mt-4 p-2 bg-teal-800 text-white">
              Submit
            </Button>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;