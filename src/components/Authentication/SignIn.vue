<template>
  <form
    class="bg-white shadow-2xl rounded p-5 mx-5 md:mx-20 xl:mx-64 2xl:mx-96"
    @submit.prevent="signIn"
  >
    <p class="uppercase font-semibold text-2xl mb-6">Sign In</p>
    <div class="mb-4">
      <label
        class="block float-left text-grey-darker font-bold mb-2"
        for="email"
      >
        Email
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
        id="email"
        type="email"
        placeholder="Email"
        v-model="user.email"
        required
      />
    </div>
    <div class="mb-6">
      <label
        class="block float-left text-grey-darker font-bold mb-2"
        for="password"
      >
        Password
      </label>
      <input
        class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
        id="password"
        type="password"
        placeholder="Password"
        v-model="user.password"
        required
      />
    </div>
    <div class="flex justify-end items-center">
      <button class="font-bold py-2 px-4 rounded items-center">
        <router-link class="m-2 p-2" to="/signup">
          <span>Sign Up</span>
        </router-link>
      </button>
      <input
        class="font-bold py-2 px-4 rounded bg-red-300 text-red-900 items-center mx-4"
        type="submit"
        value="Sign In"
      />
    </div>
  </form>
  <!-- Error Update -->
  <div
    class="flex fixed inset-x-0 top-20 z-50 items-center justify-center drop-shadow-2xl ease-in-out duration-300"
    v-if="error"
  >
    <div
      class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
      role="alert"
    >
      <svg
        class="inline flex-shrink-0 mr-3 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="font-medium">{{ errorResponse }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthService from "@/services/auth.service";

export default defineComponent({
  name: "SignIn",
  data() {
    return {
      error: false,
      errorResponse: "",
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async signIn() {
      const data = {
        email: this.user.email,
        password: this.user.password,
      };
      await AuthService.login(data)
        .then((res) => {
          if (res?.data) {
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
</script>
