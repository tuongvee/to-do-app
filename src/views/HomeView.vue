<template>
  <div class="mt-24 z-10">
    <DashBoard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DashBoard from "@/components/DashBoard/DashBoard.vue";

export default defineComponent({
  name: "HomeView",
  components: { DashBoard },
});
</script>
