import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../types";

interface NameFormProps {
  onSubmit: SubmitHandler<Inputs>;
}

const NameForm: React.FC<NameFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<Inputs>();
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-between w-full">
        <label htmlFor="given-name">Given Name</label>
        <input
          id="given-name"
          className="text-3xl outline outline-1 outline-gray-200 text-red-800"
          type="text"
          required
          {...register("givenName", { required: true })}
        />
      </div>
      <div className="flex flex-col justify-between w-full">
        <label htmlFor="family-name">Family Name</label>
        <input
          id="family-name"
          className="text-3xl outline outline-1 outline-gray-200 text-green-800"
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
      <button className="rounded-md bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xl w-fit px-2 py-1">
        generate
      </button>
    </form>
  );
};
export default NameForm;
