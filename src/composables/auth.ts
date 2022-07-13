import type { UserDetails } from "@/domain/user";
import { ref } from "vue";
import urls from "@/constants/urls";
import { useAuthStore } from "@/stores/auth";
import axiosInstance from "@/utils/axiosInstance";

type SignUp = {
  email: string;
  password: string;
  name: string;
};

export const useAuth = () => {
  const authStore = useAuthStore();

  const user = ref<UserDetails>({
    token: "",
    user: { id: 0, name: "", email: "" },
  });

  const useSignIn = () => {
    const isSigningIn = ref<boolean>(false);
    const errors = ref<{ email: string; password: string }>({
      email: "",
      password: "",
    });

    const signIn = async (email: string, password: string) => {
      try {
        isSigningIn.value = true;
        const response = await axiosInstance.post(urls.auth.signin, {
          email,
          password,
        });

        authStore.setCurrentUser(response.data.data);
        user.value = response.data.data;
        isSigningIn.value = false;
      } catch (error: any) {
        if (error?.response?.status === 422) {
          setErrors(error.response.data.errors);
        }
        isSigningIn.value = false;
      }
    };

    const setErrors = (errorValue: { email: string; password: string }) => {
      errors.value = errorValue;
    };

    return { signIn, isSigningIn, setErrors, errors };
  };

  const useSignUp = () => {
    const isSigningUp = ref<boolean>(false);
    const errors = ref<{ name: string; email: string; password: string }>({
      name: "",
      email: "",
      password: "",
    });

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
        user.value = response.data.data;
        isSigningUp.value = false;
      } catch (error: any) {
        if (error?.response?.status === 422) {
          setErrors(error.response.data.errors);
        }
        isSigningUp.value = false;
      }
    };

    const setErrors = (errorValue: {
      name: string;
      email: string;
      password: string;
    }) => {
      errors.value = errorValue;
    };

    return { signUp, isSigningUp, setErrors, errors };
  };

  const useLogout = () => {
    const logout = async () => {
      await axiosInstance.post(urls.auth.logout);

      authStore.setCurrentUser(undefined);
    };

    return { logout };
  };

  return { user, useSignIn, useSignUp, useLogout };
};
