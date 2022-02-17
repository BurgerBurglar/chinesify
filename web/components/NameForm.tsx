import React from "react";
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { Inputs } from "../types";

interface NameFormProps {
  onSubmit: SubmitHandler<Inputs>;
  register: UseFormRegister<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs>;
}

const NameForm: React.FC<NameFormProps> = ({
  onSubmit,
  register,
  handleSubmit,
}) => {
  return (
    <form
      className="flex flex-col items-center gap-2 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-between w-full text-rose-900">
        <label htmlFor="given-name">Given Name</label>
        <input
          id="given-name"
          className="text-3xl border-b border-gray-300 focus:border-rose-900 focus:border-b-2 bg-transparent outline-none"
          type="text"
          required
          {...register("givenName", { required: true })}
        />
      </div>
      <div className="flex flex-col justify-between w-full text-purple-900">
        <label htmlFor="family-name">Family Name</label>
        <input
          id="family-name"
          className="text-3xl border-b border-gray-300 focus:border-purple-900 focus:border-b-2 bg-transparent outline-none"
          type="text"
          required
          {...register("familyName", { required: true })}
        />
      </div>
      <fieldset id="gender" className="flex gap-2 items-center">
        <input type="radio" id="Male" value="m" {...register("gender")} />
        <label htmlFor="Male">Male</label>
        <input type="radio" id="Female" value="f" {...register("gender")} />
        <label htmlFor="Female">Female</label>
      </fieldset>
      <button className="rounded-full bg-sky-600 hover:bg-sky-700 active:bg-sky-900 text-white text-xl w-fit px-4 py-1">
        generate
      </button>
    </form>
  );
};
export default NameForm;
