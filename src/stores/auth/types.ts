import type { User, UserDetails } from "@/domain/user";
import type { RemovableRef } from "@vueuse/core";
import type { Store } from "pinia";

export type AuthStoreType = Store<
  "auth",
  {
    user: RemovableRef<UserDetails | undefined>;
  },
  {
    getUser(): User | undefined;
    getToken(): string | undefined;
  },
  {
    setCurrentUser(user: UserDetails | undefined): void;
  }
>;
