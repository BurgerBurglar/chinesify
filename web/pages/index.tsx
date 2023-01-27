import { Progress } from "@chakra-ui/react";
import { Nanum_Myeongjo } from "@next/font/google";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import NameDisplay from "../components/NameDisplay";
import NameForm from "../components/NameForm";
import { getMingOptions, getXingOptions } from "../fetch";
import { Inputs } from "../types";
import {
  INITIAL_FAMILY_NAME,
  INITIAL_GENDER,
  INITIAL_GIVEN_NAME,
  INITIAL_MING_OPTIONS,
  INITIAL_XING_OPTIONS,
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
    onError: ({ message }) => setErrors((prev) => [...prev, message]),
    initialData: INITIAL_MING_OPTIONS,
  });

  const xing = useQuery({
    queryKey: ["xing"],
    queryFn: () => getXingOptions({ originalName: familyName }),
    onError: ({ message }) => setErrors((prev) => [...prev, message]),
    initialData: INITIAL_XING_OPTIONS,
  });

  const [selectedIndices, setSelectedIndices] = useState([0, 0, 0]);

  const onSubmit: SubmitHandler<Inputs> = async () => {
    setErrors([]);
    ming.refetch();
    xing.refetch();
    setSelectedIndices([0, 0, 0]);
  };

  const isLoading = ming.isLoading || xing.isLoading;

  const shouldDisplayName =
    errors.length === 0 && ming.data!.length > 0 && xing.data!.length > 0;

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
      <main
        className={`flex flex-col items-center justify-start gap-3
      w-full h-full max-w-lg pt-5 mx-auto 
      bg-sky-100 text-sky-900`}
      >
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

        <div className="flex flex-col items-center justify-between w-full gap-5">
          <NameForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            control={control}
          />
          {isLoading && <Progress size="xs" isIndeterminate w="full" />}
          {shouldDisplayName ? (
            <NameDisplay
              xingOptions={xing.data!}
              mingOptions={ming.data!}
              selectedIndices={selectedIndices}
              setSelectedIndices={setSelectedIndices}
            />
          ) : (
            <div className="text-red-600">{errors.join("\n")}</div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
