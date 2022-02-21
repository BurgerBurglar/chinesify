import { Progress } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdCheck, MdContentCopy, MdPlayCircleOutline } from "react-icons/md";
import useSWRImmutable from "swr/immutable";
import CharSelect from "../components/CharSelect";
import NameForm from "../components/NameForm";
import { getMingOptions, getXingOptions } from "../fetch";
import { useClipboard } from "../hooks/useClipBoard";
import { Inputs } from "../types";
import {
  INITIAL_FAMILY_NAME,
  INITIAL_GENDER,
  INITIAL_GIVEN_NAME,
  INITIAL_MING_OPTIONS,
  INITIAL_XING_OPTIONS,
} from "../utils/constants";
import getAudioElements from "../utils/getAudioElements";
import playAudioFiles from "../utils/playAudioFiles";

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

  const setSelectedIndex = (selectIndex: number, charIndex: number) => {
    setSelectedIndices((prev) => {
      const duplication = [...prev];
      duplication[charIndex] = selectIndex;
      return duplication;
    });
  };

  const selectedName = [
    xingOptions![selectedIndices[0]],
    mingOptions![0][selectedIndices[1]],
    mingOptions![1][selectedIndices[2]],
  ];

  const fullname = selectedName.map((charDetail) => charDetail?.char).join("");

  const pronunciations = getAudioElements(selectedName);

  const { hasCopied, onCopy } = useClipboard(fullname);

  const onSubmit: SubmitHandler<Inputs> = async () => {
    setErrors([]);

    mutateMingOptions();
    mutateXingOptions();

    setSelectedIndices([0, 0, 0]);
  };

  const onPlay = () => playAudioFiles(pronunciations);

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
            <div className="flex flex-col gap-3 items-center">
              <div className="flex gap-2">
                <CharSelect
                  chars={xingOptions!}
                  isXing
                  selectIndex={selectedIndices[0]}
                  setSelectIndex={(selectIndex) =>
                    setSelectedIndex(selectIndex, 0)
                  }
                />
                <CharSelect
                  chars={mingOptions![0]}
                  selectIndex={selectedIndices[1]}
                  setSelectIndex={(selectIndex) =>
                    setSelectedIndex(selectIndex, 1)
                  }
                />
                <CharSelect
                  chars={mingOptions![1]}
                  selectIndex={selectedIndices[2]}
                  setSelectIndex={(selectIndex) =>
                    setSelectedIndex(selectIndex, 2)
                  }
                />
              </div>
              <div className="flex gap-3 justify-center w-full">
                <button
                  className="rounded-full bg-sky-200 hover:bg-sky-300 text-sky-900 text-md w-fit px-4 py-1"
                  onClick={onCopy}
                >
                  <div className="flex items-center gap-1">
                    {hasCopied ? <MdCheck /> : <MdContentCopy />} copy
                  </div>
                </button>
                <button
                  className="rounded-full bg-sky-200 hover:bg-sky-300 text-sky-900 text-md w-fit px-4 py-1"
                  onClick={onPlay}
                >
                  <div className="flex items-center gap-1">
                    <MdPlayCircleOutline />
                    pronounce
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-red-600">{errors.join("\n")}</div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
