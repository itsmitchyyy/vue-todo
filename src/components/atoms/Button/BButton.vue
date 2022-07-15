<script setup lang="ts">
import type { Props } from "./types";

/** this is workaround if ever you encounter an error
 * [@vue/compiler-sfc] type argument passed to defineProps() must be a literal type, or a reference to an interface or literal type
 * https://github.com/vuejs/core/issues/4294#issuecomment-1022735576
 */

defineProps<{
  label: Props["label"];
  classes?: Props["classes"];
  isLoading?: Props["isLoading"];
  disabled?: Props["disabled"];
}>();
</script>

<template>
  <button
    class="btn"
    :class="[classes ? classes : 'btn-primary']"
    :disabled="isLoading || disabled"
  >
    {{ label }}
  </button>
</template>
