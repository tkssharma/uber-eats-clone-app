"use client"

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useRouter } from 'next/navigation';

const fields = loginFields;
let fieldsState = {} as any;
fields.forEach((field) => (fieldsState[field.id] = ""));


export default function Login() {
  const { data: session } = useSession();
  const user = session?.user;
  const [loginState, setLoginState] = useState(fieldsState);
  const router = useRouter();
  const handleChange = (e: any) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if(user){
      router.push("/dashboard")
    }
  },[user])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      email: loginState.email,
      password: loginState.password,
      callbackUrl : `${window.location.origin}/dashboard`,
    });
  };

  return (
    <form className="mt-16 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            customClass=""
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
