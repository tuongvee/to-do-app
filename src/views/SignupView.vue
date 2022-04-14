<template>
  <div class="mt-32 mb-5">
    <SignUp />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SignUp from "@/components/Authentication/SignUp.vue";

export default defineComponent({
  name: "SignupView",
  components: {
    SignUp,
  },
});
</script>
