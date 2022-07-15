import { ref } from "vue";
import urls from "@/constants/urls";
import { useAuthStore } from "@/stores/auth/auth";
import axiosInstance from "@/utils/axiosInstance";
import type { AuthStoreType } from "@/stores/auth/types";
import { storeToRefs } from "pinia";

type SignUp = {
  email: string;
  password: string;
  name: string;
};

export const useAuth = () => {
  const authStore: AuthStoreType = useAuthStore();
  const { user } = storeToRefs(authStore);
  const errors = ref<any>();

  const useSignIn = () => {
    const isSigningIn = ref<boolean>(false);

    const signIn = async (email: string, password: string) => {
      try {
        isSigningIn.value = true;
        const response = await axiosInstance.post(urls.auth.signin, {
          email,
          password,
        });

        authStore.setCurrentUser(response.data.data);
        isSigningIn.value = false;
      } catch (error: any) {
        if (error?.response?.status === 422) {
          errors.value = error.response.data.errors;
        }
        isSigningIn.value = false;
      }
    };

    return { signIn, isSigningIn };
  };

  const useSignUp = () => {
    const isSigningUp = ref<boolean>(false);

    const signUp = async (values: SignUp) => {
      try {
        isSigningUp.value = true;
        const { password, ...extras } = values;
        const response = await axiosInstance.post(urls.auth.signup, {
          ...extras,
          password,
          password_confirmation: password,
        });

        authStore.setCurrentUser(response.data.data);
        isSigningUp.value = false;
      } catch (error: any) {
        if (error?.response?.status === 422) {
          errors.value = error.response.data.errors;
        }
        isSigningUp.value = false;
      }
    };

    return { signUp, isSigningUp };
  };

  const useLogout = () => {
    const logout = async () => {
      await axiosInstance.post(urls.auth.logout);

      authStore.setCurrentUser(undefined);
    };

    return { logout };
  };

  return { useSignIn, useSignUp, useLogout, user, errors };
};
