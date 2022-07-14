import { defineStore } from "pinia";
import type { User, UserDetails } from "@/domain/user";
import { useStorage, type RemovableRef } from "@vueuse/core";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: useStorage("user", {}) as RemovableRef<UserDetails | undefined>,
  }),
  getters: {
    getUser(): User | undefined {
      if (this.user) return this.user.user;
      return undefined;
    },
    getToken(): string | undefined {
      if (this.user) return this.user.token;
      return undefined;
    },
  },
  actions: {
    setCurrentUser(user: UserDetails | undefined) {
      this.user = user;
    },
  },
});
