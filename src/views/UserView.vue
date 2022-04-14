<template>
  <div class="mt-32 mb-5">
    <UserInfor />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserInfor from "@/components/User/UserInfor.vue";

export default defineComponent({
  components: {
    UserInfor,
  },
});
</script>
