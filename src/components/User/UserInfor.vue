<template>
  <form
    class="bg-white shadow-2xl rounded p-5 mx-5 md:mx-20 xl:mx-64 2xl:mx-96"
    @submit.prevent="updateUser"
  >
    <p class="uppercase font-semibold text-2xl mb-6">user information</p>
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
        disabled
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
        disabled
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
        placeholder="*******"
        v-model="user.passWord"
        required
      />
    </div>
    <div class="mb-6">
      <label
        class="block text-grey-darker text-sm font-bold mb-2"
        for="confirmpassword"
      >
        Confirm Password
      </label>
      <input
        class="shadow border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
        id="confirmpassword"
        type="password"
        placeholder="*******"
        v-model="user.confirmPassword"
        required
      />
    </div>
    <div class="flex justify-center items-center">
      <input
        class="font-bold py-2 px-4 rounded bg-red-300 text-red-900 items-center mx-4"
        type="submit"
        value="Update"
      />
    </div>
  </form>

  <!-- Update successfully -->
  <div
    class="flex fixed inset-x-0 top-20 z-50 items-center justify-center drop-shadow-2xl ease-in-out duration-300"
    v-if="alertUpdate"
  >
    <div
      class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
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
      <span class="font-medium">Successfully updated!</span>
    </div>
  </div>

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

export default defineComponent({
  name: "UserInfor",
  data() {
    return {
      error: false,
      errorResponse: "",
      alertUpdate: false,
      user: {
        email: "",
        userName: "",
        passWord: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    updateUser() {
      if (this.user.passWord !== this.user.confirmPassword) {
        this.error = true;
        this.errorResponse = "Password is not similar";
        setTimeout(() => (this.error = false), 2500);
      } else {
        this.alertUpdate = true;

        setTimeout(() => (this.alertUpdate = false), 2500);
      }
      this.user.passWord = "";
      this.user.confirmPassword = "";
    },
  },
});
</script>
