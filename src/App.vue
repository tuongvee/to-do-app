<template>
  <MainNav />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainNav from "@/components/MainNav.vue";

export default defineComponent({
  components: {
    MainNav,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
body {
  background-image: url("./assets/image/background.png");
  height: 100%;
}

::-webkit-scrollbar {
  width: 16px;
  height: 16px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #fef2f2;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #fee2e2;
  border-radius: 100vh;
  border: 3px solid #fef2f2;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #fecaca;
}
</style>
