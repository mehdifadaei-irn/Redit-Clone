import React from "react";
import { Icons } from "./Icons";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

const SignUp = () => {
  return (
    <div className="contaner mx-auto flex w-full justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Sing Up</h1>
        <p className="text-sm max-w-xs mx-auto">
          با ادامه دان این فرایند شما با قوانین سایت فدایی موافقت میکنید
        </p>

        {/* Sign in Form */}
        <UserAuthForm className="" />

        <p className="px-8 text-center text-sm text-zinc-700">
          already a Breadittor??{" "}
          <Link
            href={"/sign-in"}
            className="hover:text-zinc-800 text-sm underline underline-offset-4 "
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
