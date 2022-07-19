import type { UserDetails } from "@/domain/user";
import type { RemovableRef } from "@vueuse/core";
import type { Store } from "pinia";

export type AuthStoreType = Store<
  "auth",
  {
    user: RemovableRef<UserDetails | undefined>;
  },
  {},
  {
    setCurrentUser(user: UserDetails | undefined): void;
  }
>;
