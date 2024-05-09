"use client";

import { SignInDocument } from "@/services/mutations/account/sign-in";
import { useMutation } from "@apollo/client";
import { useState } from "react";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, { error, data }] = useMutation(SignInDocument, {
    variables: { email, password },
  });

  console.log({ error, data });

  return (
    <div className='my-20'>
      <h1 className='text-2xl text-center font-semibold mb-4'>Sign In</h1>
      <form
        className='max-w-xs container'
        onSubmit={(e) => {
          e.preventDefault();

          signIn();
        }}
      >
        <div className='flex flex-col space-y-2 mb-2'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            required
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className='flex flex-col space-y-2 mb-2'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            required
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <button
            type='submit'
            className='px-4 py-2 text-white bg-black hover:bg-black/80'
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
