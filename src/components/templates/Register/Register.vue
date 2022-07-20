<script lang="ts">
export default {
  name: "RegisterTemplate",
};
</script>
<script setup lang="ts">
import RegisterForm from "@/components/organisms/RegisterForm/RegisterForm.vue";
import type { RegisterFormProps } from "@/components/organisms/RegisterForm/types";
import { useSignUp } from "@/composables";
import { useAuthStore } from "@/stores/auth/auth";
import { ref } from "vue";
import { useMutation } from "vue-query";
import { useRouter } from "vue-router";

const errors = ref<any>();
const { signUp } = useSignUp();
const { setCurrentUser } = useAuthStore();

const { mutate: signUpMutation, isLoading: isSigningUp } = useMutation(
  (payload: { email: string; password: string; name: string }) => {
    const { name, email, password } = payload;
    return signUp(email, password, name);
  },
  {
    onSuccess: (data) => {
      setCurrentUser(data);
      router.push("/tasks");
    },
    onError: (error: any) => {
      if (error?.response?.status === 422) {
        errors.value = error.response.data.errors;
      }
    },
  },
);

const router = useRouter();

const handleChangeInput = (touched: {
  email: boolean;
  name: boolean;
  password: boolean;
}) => {
  errors.value = {
    email: touched.email ? "" : errors.value?.email,
    name: touched.name ? "" : errors.value?.name,
    password: touched.password ? "" : errors.value?.password,
  };
};

const handleSubmitRegister = (value: RegisterFormProps) => {
  signUpMutation(value);
};
</script>

<template>
  <RegisterForm
    :errors="errors"
    @on-change-input="handleChangeInput"
    @on-submit-register="handleSubmitRegister"
    :is-loading="isSigningUp"
  />
</template>
