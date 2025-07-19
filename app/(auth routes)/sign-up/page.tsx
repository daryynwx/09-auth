'use client'

import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { useState } from "react";
import { RegisterRequest } from "@/types/user";
import { register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

    const handleSubmit = async (formData: FormData) => {
      try {
        const formValue = Object.fromEntries(formData) as RegisterRequest;
        const response = await register(formValue);
        
        if (response) {
          setUser(response);
          router.push('/profile');
        } else {
          console.log(response);
          setError('Registration failed. Please check your email and password, or try again later.')
        }
      } catch (error) {
        console.log(`Error: ${error}.`)
        setError('Registration failed. Please check your email and password, or try again later.')
      }
    };

    return (
        <main className={css.mainContent}>
  <h1 className={css.formTitle}>Sign up</h1>
	<form className={css.form} action={handleSubmit}>
    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Register
      </button>
    </div>

    {error && <p className={css.error}>{error}</p>}
  </form>
</main>
    )
};

export default SignUp;