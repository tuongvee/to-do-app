<template>
  <form
    class="bg-white shadow-2xl rounded p-5 mx-5 md:mx-20 xl:mx-64 2xl:mx-96"
    @submit.prevent="onClickSignUp"
  >
    <p class="uppercase font-semibold text-2xl mb-6">Sign up</p>
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input
        class="shadow border rounded w-full py-2 px-3 text-grey-darker"
        id="email"
        type="text"
        placeholder="Email"
        v-model="user.email"
        required
      />
    </div>
    <div class="mb-4">
      <label
        class="block text-grey-darker text-sm font-bold mb-2"
        for="username"
      >
        Username
      </label>
      <input
        class="shadow border rounded w-full py-2 px-3 text-grey-darker"
        id="username"
        type="text"
        placeholder="Username"
        v-model="user.userName"
        required
      />
    </div>
    <div class="mb-4">
      <label
        class="block text-grey-darker text-sm font-bold mb-2"
        for="password"
      >
        Password
      </label>
      <input
        class="shadow border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
        id="password"
        type="password"
        placeholder="Password"
        v-model="user.passWord"
        required
      />
    </div>
    <div class="mb-6">
      <label
        class="block text-grey-darker text-sm font-bold mb-2"
        for="password"
      >
        Confirm Password
      </label>
      <input
        class="shadow border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
        id="passwordConfirm"
        type="password"
        placeholder="Password"
        v-model="user.confirmPassword"
        required
      />
    </div>
    <div class="flex justify-center items-center">
      <input
        class="font-bold py-2 px-4 rounded bg-red-300 text-red-900 items-center"
        type="submit"
        value="Sing Up"
      />
      <button class="font-bold py-2 px-4 rounded items-center">
        <router-link class="m-2 p-2" to="/signin">
          <span>Sign In</span>
        </router-link>
      </button>
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
import axios from "axios";

export default defineComponent({
  name: "SignUp",
  data() {
    return {
      error: false,
      errorResponse: "",
      user: {
        email: "",
        userName: "",
        passWord: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    async onClickSignUp() {
      if (!this.user.email) {
        // Email is already valid
        this.error = true;
        this.errorResponse = "Email is already valid!!!";
        setTimeout(() => (this.error = false), 2500);
      } else if (!this.user.userName) {
        // User name is already valid
        this.error = true;
        this.errorResponse = "User name is already valid!!!";
        setTimeout(() => (this.error = false), 2500);
      } else if (this.user.passWord !== this.user.confirmPassword) {
        this.error = true;
        this.errorResponse = "Password is not similar!!!";
        setTimeout(() => (this.error = false), 2500);
      } else {
        const res = await axios.post("signup", this.user);
        console.log(res);
      }
      this.user.email = "";
      this.user.userName = "";
      this.user.passWord = "";
      this.user.confirmPassword = "";
    },
  },
});
</script>
