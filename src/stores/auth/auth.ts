import { defineStore } from "pinia";
import type { UserDetails } from "@/domain/user";
import { useStorage, type RemovableRef } from "@vueuse/core";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: useStorage("user", {}) as RemovableRef<UserDetails | undefined>,
  }),
  getters: {},
  actions: {
    setCurrentUser(user: UserDetails | undefined) {
      this.user = user;
    },
  },
});
