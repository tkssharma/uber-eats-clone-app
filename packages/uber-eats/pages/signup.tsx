import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/common/button";
import { FormError } from "../components/common/form-error";

interface ILoginForm {
  email: string;
  password: string;
}
export enum Roles {
  "admin" = "admin"
}
const Login = () => {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const onSubmit = () => {
      const { email, password } = getValues();
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">

      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            ref={register({
              required: "Email is required",
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            required
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid email"} />
          )}
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            ref={register({ required: "Password is required" })}
            required
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}


          <select name="role"
          ref={register({required: true})}
          className="input" >
            {Object.keys(Roles).map((role, index) => {
              return (
                <option key={index}> {role}</option>
              )
            })}
            </select>
          <Button
            canClick={formState.isValid}
            loading={false}
            actionText={"Sign up"}
          />
        </form>
        <div>
          New to Platform?{" "}
        </div>
      </div>
    </div>
  );
};

export default Login
