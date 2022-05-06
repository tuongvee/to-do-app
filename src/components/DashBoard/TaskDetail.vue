<template>
  <div
    class="item bg-white border border-red-100 rounded p-2 my-2 flex justify-between items-center"
  >
    <p class="text-left ml-3 mr-20" :class="{ 'line-through': isLineThrough }">
      {{ taskDetail.nameTaskDetail }}
    </p>
    <div class="option">
      <button class="mx-1" @click.prevent="toggleEditPopUp">
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
      <button class="mx-1" @click="deleteTaskDetail(taskDetail.id)">
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
  </div>
  <!-- Edit Item Pop Up -->
  <div
    class="absolute left-0 z-40 overlay items-center justify-center drop-shadow-2xl ease-in-out duration-300"
    v-if="popUpEdit"
  >
    <div class="relative bg-white p-5 rounded w-full">
      <button
        class="absolute mx-3 transition duration-75 top-4 right-0"
        @click.prevent="toggleEditPopUp"
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
          v-model="taskDetail.nameTaskDetail"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              id="status-todo"
              value="ToDo"
              v-model="taskDetail.state"
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="status-todo"
            >
              ToDo
            </label>
          </div>
          <div class="form-check form-check-inline mr-5">
            <input
              class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-400 checked:border-red-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="StatusOption"
              id="status-done"
              value="Done"
              v-model="taskDetail.state"
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="status-done"
            >
              Done
            </label>
          </div>
        </div>
      </div>
      <div class="block p-4">
        <button
          @click="updateTaskDetail(taskDetail.id)"
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
import TaskDetailService from "@/services/task-detail.service";

export default defineComponent({
  props: ["taskDetailProp"],
  data() {
    return {
      popUpEdit: false,
      taskDetail: this.taskDetailProp,
      isLineThrough: this.taskDetailProp.state === "Done" ? true : false,
    };
  },
  methods: {
    toggleEditPopUp() {
      this.popUpEdit = !this.popUpEdit;
    },
    async deleteTaskDetail(id: number) {
      await TaskDetailService.delete(id)
        .then((res) => {
          if (res?.data) {
            this.$emit("delete", id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async updateTaskDetail(id: number) {
      const data = {
        nameTaskDetail: this.taskDetail.nameTaskDetail,
        state: this.taskDetail.state,
      };
      await TaskDetailService.update(data, id)
        .then((res) => {
          if (res?.data) {
            this.toggleEditPopUp();
            this.isLineThrough = res.data.state === "Done" ? true : false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
</script>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.2);
}

.item:hover .option {
  display: block;
}

.option {
  position: absolute;
  display: none;
  right: 0;
  margin-right: 10px;
}
</style>
