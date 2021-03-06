import { Progress } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWRImmutable from "swr/immutable";
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

  const {
    data: mingOptions,
    isValidating: isMingValidating,
    mutate: mutateMingOptions,
  } = useSWRImmutable("ming", () => getMingOptions(givenName, { gender }), {
    fallbackData: INITIAL_MING_OPTIONS,
    onError: ({ message }) => setErrors((prev) => [...prev, message]),
    shouldRetryOnError: false,
  });
  const {
    data: xingOptions,
    isValidating: isXingValidating,
    mutate: mutateXingOptions,
  } = useSWRImmutable("xing", () => getXingOptions(familyName), {
    fallbackData: INITIAL_XING_OPTIONS,
    onError: ({ message }) => setErrors((prev) => [...prev, message]),
    shouldRetryOnError: false,
  });

  const [selectedIndices, setSelectedIndices] = useState([0, 0, 0]);

  const onSubmit: SubmitHandler<Inputs> = async () => {
    setErrors([]);

    mutateMingOptions();
    mutateXingOptions();

    setSelectedIndices([0, 0, 0]);
  };

  const isValidating = isMingValidating || isXingValidating;

  const shouldDisplayName =
    errors.length === 0 && xingOptions!.length > 0 && mingOptions!.length > 0;

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
      <main className="w-full max-w-lg h-full flex flex-col gap-3 justify-start items-center bg-sky-100 text-sky-900 pt-5 mx-auto">
        <h1 className="font-bold uppercase text-3xl">Chinesify</h1>
        <div className="text-centert text-lg">
          <p>Your name in Chinese,</p>
          <p>without sounding funny.</p>
        </div>

        <div className="flex flex-col gap-5 justify-between items-center w-full">
          <NameForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            control={control}
          />
          {isValidating && <Progress size="xs" isIndeterminate w="full" />}
          {shouldDisplayName ? (
            <NameDisplay
              xingOptions={xingOptions!}
              mingOptions={mingOptions!}
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
