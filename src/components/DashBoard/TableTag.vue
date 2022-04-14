<template>
  <div
    class="table w-80 h-fit rounded p-2 drop-shadow-md border border-red-100"
  >
    <div class="flex justify-between items-center">
      <p class="text-lg font-bold text-left m-3">{{ table.title }}</p>
    </div>
    <ul>
      <li
        v-for="(item, index) in table.items"
        :key="index"
        class="bg-white border border-red-100 rounded p-2 my-2 flex justify-between items-center"
      >
        <ItemTag :item="item" />

        <div class="flex flex-no-wrap ml-1">
          <button class="mx-1" @click.prevent="toggleEditPopUp(index)">
            <svg
              class="w-8 h-8 px-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
              ></path>
            </svg>
          </button>
          <button
            class="mx-1 p1 transition duration-75"
            @click.prevent="deleteItem(index)"
          >
            <svg
              class="w-8 h-8 px-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </li>
    </ul>
    <div class="flex justify-between items-center mt-3">
      <textarea
        class="resize-none border border-gray-300 rounded w-full"
        v-model="newItem"
      ></textarea>
      <button class="mx-3 transition duration-75" @click.prevent="addItem">
        <svg
          class="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>

  <!-- Alert -->
  <div
    class="flex fixed inset-x-0 top-20 z-50 items-center justify-center drop-shadow-2xl ease-in-out duration-300"
    v-if="alert"
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
      <span class="font-medium">{{ alertMsg }}</span>
    </div>
  </div>

  <!-- Edit Item Pop Up -->
  <div
    class="flex fixed inset-0 z-50 overlay items-center justify-center drop-shadow-2xl ease-in-out duration-300"
    v-if="popUpEdit"
  >
    <div class="relative bg-white p-5 rounded sm:w-4/12">
      <button
        class="absolute mx-3 transition duration-75 top-4 right-0"
        @click.prevent="toggleEditPopUp(-1)"
      >
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <p class="font-bold text-xl p-4">TASK DETAIL</p>
      <div class="justify-items-start">
        <label
          class="block float-left text-gray-700 text-md font-bold my-2"
          for="taskName"
        >
          Task Detail
        </label>
        <input
          id="taskName"
          type="text"
          v-model="editItem"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Task Detail"
        />
        <div class="flex items-center">
          <label
            class="block float-left text-gray-700 text-md font-bold my-2 mr-5"
            for="status"
          >
            Status
          </label>
          <div class="form-check form-check-inline mr-5">
            <input
              class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-400 checked:border-red-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="StatusOption"
              id="status-1"
              value="Doing"
              checked
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="status-1"
            >
              Doing
            </label>
          </div>
          <div class="form-check form-check-inline mr-5">
            <input
              class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-400 checked:border-red-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="StatusOption"
              id="status-2"
              value="Done"
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="status-2"
            >
              Done
            </label>
          </div>
        </div>
      </div>
      <div class="block p-4">
        <button
          @click.prevent="updateItem"
          class="bg-green-100 text-green-700 px-5 py-2 mx-3 rounded-full"
        >
          Update
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemTag from "./ItemTag.vue";

export default defineComponent({
  components: { ItemTag },
  props: ["tableProp"],
  data() {
    return {
      table: this.tableProp,
      newItem: "",
      editId: -1,
      editItem: "",
      alert: false,
      alertMsg: "",
      popUpEdit: false,
    };
  },
  methods: {
    addItem() {
      this.newItem = "";
    },
    deleteItem(id: number) {
      this.alertMsg = "Deleted Successfully";
      this.alert = true;
      setTimeout(() => (this.alert = false), 1000);
    },
    updateItem() {
      this.toggleEditPopUp(-1);
      this.alertMsg = "Updated Successfully";
      this.alert = true;
      setTimeout(() => (this.alert = false), 1000);
    },
    toggleEditPopUp(id: number) {
      this.popUpEdit = !this.popUpEdit;
      this.editItem = "";
      this.editId = id;
    },
  },
});
</script>

<style scoped>
.table {
  background-color: rgba(254, 226, 226, 0.6);
}
.overlay {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
