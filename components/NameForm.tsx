import { RadioGroup, Stack, Radio } from "@chakra-ui/react";
import React from "react";
import {
  Control,
  Controller,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { RiMagicLine } from "react-icons/ri";
import { Inputs } from "../types";

interface NameFormProps {
  onSubmit: SubmitHandler<Inputs>;
  register: UseFormRegister<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  control: Control<Inputs, object>;
}

const NameForm: React.FC<NameFormProps> = ({
  onSubmit,
  register,
  handleSubmit,
  control,
}) => {
  return (
    <form
      className="flex flex-col items-center w-full gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-between w-full text-rose-900">
        <label htmlFor="given-name" className="font-semibold">
          Given Name
        </label>
        <input
          id="given-name"
          className="text-3xl bg-transparent border-b border-gray-300 outline-none focus:border-rose-900 focus:border-b-2"
          type="text"
          required
          {...register("givenName", { required: true })}
        />
      </div>
      <div className="flex flex-col justify-between w-full text-purple-900">
        <label htmlFor="family-name" className="font-semibold">
          Family Name
        </label>
        <input
          id="family-name"
          className="text-3xl bg-transparent border-b border-gray-300 outline-none focus:border-purple-900 focus:border-b-2"
          type="text"
          required
          {...register("familyName", { required: true })}
        />
      </div>
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <RadioGroup {...field}>
            <Stack direction="row">
              <Radio value="m">Male</Radio>
              <Radio value="f">Female</Radio>
            </Stack>
          </RadioGroup>
        )}
      />
      <button className="px-4 py-1 text-xl text-white rounded-full bg-sky-600 hover:bg-sky-700 active:bg-sky-900 w-fit">
        <div className="flex items-center gap-2">
          <RiMagicLine /> generate
        </div>
      </button>
    </form>
  );
};
export default NameForm;
