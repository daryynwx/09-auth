'use client';

import css from './EditProfilePage.module.css';
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import Image from "next/image";
import { useAuthStore } from '@/lib/store/authStore';
import { UpdateUserRequest } from '@/types/user';

const EditProfile = () => {
    const router = useRouter();
    const { user, setUser } = useAuthStore();
    const [error, setError] = useState<boolean>(false);

    const handleChange = async(formData: FormData) => {
      try {
        const username = Object.fromEntries(formData) as UpdateUserRequest;

        const updateUser = await updateMe(username);

        if (updateUser) {
          setUser(updateUser);
          router.push('/profile');
        }
      } catch(error) {
        console.log(error);
        setError(true);
      }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    {user && <Image 
      src={user?.avatar}
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />
    }

    <form className={css.profileInfo} 
    onSubmit={async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      await handleChange(formData);
    }}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
          name='username'
          type="text"
          defaultValue={user?.username}
          className={css.input}
        />
      </div>

      <p>Email: {user?.email}</p>

      {error && <p className={css.error}>Failed to update profile data. Please try again later.</p>}

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>
    )
};

export default EditProfile;