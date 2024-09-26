import { Progress } from "@chakra-ui/react";
import { Nanum_Myeongjo } from "@next/font/google";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LanguageTooltip from "../components/LanguageTooltip";
import NameDisplay from "../components/NameDisplay";
import NameForm from "../components/NameForm";
import { getMingOptions, getXingOptions } from "../fetch";
import { Inputs } from "../types";
import {
  INITIAL_FAMILY_NAME,
  INITIAL_GENDER,
  INITIAL_GIVEN_NAME,
} from "../utils/constants";

const nanumMyeongjo = Nanum_Myeongjo({
  weight: "800",
  subsets: ["latin"],
});

const Home: NextPage = () => {
  const { register, handleSubmit, control, watch } = useForm<Inputs>({
    defaultValues: {
      givenName: INITIAL_GIVEN_NAME,
      familyName: INITIAL_FAMILY_NAME,
      gender: INITIAL_GENDER,
    },
  });

  const { givenName, familyName, gender }: Inputs = watch();

  const [errors, setErrors] = useState<string[]>([]);

  const ming = useQuery({
    queryKey: ["ming"],
    queryFn: () => getMingOptions({ originalName: givenName, gender }),
    onError: ({ response: { data: errorMessage } }) =>
      setErrors((prev) => [...prev, errorMessage]),
  });

  const xing = useQuery({
    queryKey: ["xing"],
    queryFn: () => getXingOptions({ originalName: familyName }),
    onError: ({ response: { data: errorMessage } }) =>
      setErrors((prev) => [...prev, errorMessage]),
  });

  const [selectedIndices, setSelectedIndices] = useState([0, 0, 0]);

  const onSubmit: SubmitHandler<Inputs> = async () => {
    setErrors([]);
    ming.refetch();
    xing.refetch();
    setSelectedIndices([0, 0, 0]);
  };

  const isFetching = ming.isFetching || xing.isFetching;

  const shouldDisplayName =
    !isFetching &&
    errors.length === 0 &&
    ming.data?.length &&
    xing.data?.length;

  return (
    <>
      <Head>
        <title>Chinesify</title>
        <meta
          name="description"
          content="Your name in Chinese, without sounding funny."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-start w-full h-full max-w-lg gap-8 pt-5 mx-auto bg-sky-100 text-sky-900">
        <section className="flex flex-col items-center text-center">
          <h1
            className={`${nanumMyeongjo.className}
            text-transparent bg-clip-text
            bg-gradient-to-r from-cyan-900 to-sky-600
            text-5xl font-bold uppercase mt-5`}
          >
            Chinesify
          </h1>
          <div className="text-lg text-centert">
            <p>Your name in Chinese,</p>
            <p>without sounding funny.</p>
          </div>
        </section>
        <div className="flex flex-col items-center justify-between w-full gap-10">
          <NameForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            control={control}
          />
          {isFetching && <Progress size="xs" isIndeterminate w="full" />}
          {shouldDisplayName ? (
            <NameDisplay
              xingOptions={xing.data!}
              mingOptions={ming.data!}
              selectedIndices={selectedIndices}
              setSelectedIndices={setSelectedIndices}
            />
          ) : (
            <div className="text-red-600 whitespace-pre-wrap">
              {errors.join("\n")}
            </div>
          )}
        </div>
        <LanguageTooltip />
      </main>
    </>
  );
};

export default Home;
