import { defineStore } from "pinia";
import type { User, UserDetails } from "@/domain/user";
import { useStorage, type RemovableRef } from "@vueuse/core";
import { toRaw } from "vue";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: useStorage("user", {}) as RemovableRef<UserDetails>,
  }),
  getters: {
    getUser(): User {
      return this.user.user;
    },
    getToken(): string {
      return this.user.token;
    },
  },
  actions: {
    setCurrentUser(user: UserDetails) {
      this.user = user;
    },
  },
});
