<template>
  <div class="flex flex-wrap w-52">
    <p class="text-left ml-3">{{ item }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["item"],
});
</script>
