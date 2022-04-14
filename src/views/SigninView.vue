<template>
  <div class="mt-40 mb-5">
    <SignIn />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SignIn from "@/components/Authentication/SignIn.vue";

export default defineComponent({
  name: "SigninView",
  components: {
    SignIn,
  },
});
</script>
