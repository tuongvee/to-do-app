<template>
  <div class="task w-80 h-fit rounded p-2 drop-shadow-md border border-red-100">
    <div class="flex justify-between items-center">
      <p class="text-lg font-bold text-left m-3">{{ task.nameTask }}</p>
      <button
        class="mx-3 absolute top-4 right-0"
        @click.prevent="toggleOptionTask"
      >
        <svg
          class="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
          ></path>
        </svg>
      </button>
    </div>
    <ul>
      <li v-for="taskDetail in task.tasksDetail" :key="taskDetail.id">
        <TaskDetail
          :taskDetailProp="taskDetail"
          @delete="handleDeleteTaskDetail"
        />
      </li>
    </ul>
    <div class="flex justify-between items-center mt-3">
      <textarea
        class="resize-none border border-gray-300 rounded w-full"
        v-model="newTaskDetail"
      ></textarea>
      <button
        class="mx-3 transition duration-75"
        @click.prevent="addTaskDetail(task.id)"
      >
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

  <!-- Option Table Pop Up -->
  <div
    class="flex fixed inset-0 z-40 overlay items-center justify-center drop-shadow-2xl ease-in-out duration-300"
    v-if="popUpOption"
  >
    <div class="relative bg-white p-5 rounded sm:w-6/12">
      <button
        class="absolute mx-3 transition duration-75 top-4 right-0"
        @click.prevent="toggleOptionTask"
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
      <p class="font-bold text-xl pb-2">TASK</p>
      <div class="justify-items-start">
        <label
          class="block float-left text-gray-700 text-md font-bold my-2"
          for="taskName"
        >
          Task name
        </label>
        <input
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="task.nameTask"
        />
        <label
          class="block float-left text-gray-700 text-md font-bold my-2"
          for="description"
        >
          Description
        </label>
        <textarea
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
          v-model="task.description"
        >
        </textarea>
        <label
          class="block float-left text-gray-700 text-md font-bold my-2"
          for="floatingInput"
          >Deadline
        </label>
        <div class="datepicker relative form-floating mb-3 xl:w-96">
          <input
            type="datetime-local"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="transformDateTime"
            disabled
          />
        </div>
      </div>
      <div class="block p-4">
        <button
          @click="updateTask(task.id)"
          class="bg-green-100 text-green-700 px-5 py-2 mx-3 rounded-full"
        >
          Update
        </button>
        <button
          class="bg-red-100 text-red-700 px-5 py-2 mx-3 rounded-full"
          @click="deleteTask(task.id)"
        >
          Delete
        </button>
      </div>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskDetail from "./TaskDetail.vue";
import TaskService from "@/services/task.service";
import TaskDetailService from "@/services/task-detail.service";

export default defineComponent({
  components: { TaskDetail },
  props: ["taskProp"],
  data() {
    return {
      task: this.taskProp as any,
      newTaskDetail: "",
      popUpOption: false,
      alert: false,
      alertMsg: "",
    };
  },
  computed: {
    transformDateTime() {
      return this.task.deadline.substring(0, 16);
    },
  },
  methods: {
    async addTaskDetail(id: number) {
      const data = {
        nameTaskDetail: this.newTaskDetail,
        state: "",
      };
      await TaskDetailService.add(data, id)
        .then((res) => {
          if (res?.data) {
            this.task.tasksDetail.push(res.data);
            this.newTaskDetail = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async updateTask(id: number) {
      const data = {
        nameTask: this.task.nameTask,
        description: this.task.description,
        deadline: this.task.deadline,
      };
      await TaskService.update(data, id)
        .then((res) => {
          if (res?.data) {
            this.toggleOptionTask();
            this.alertMsg = "Updated Successfully";
            this.alert = true;
            setTimeout(() => (this.alert = false), 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async deleteTask(id: number) {
      await TaskService.delete(id)
        .then((res) => {
          if (res?.data) {
            this.$emit("delete", id);
            this.toggleOptionTask();
            this.alertMsg = "Deleted Successfully";
            this.alert = true;
            setTimeout(() => (this.alert = false), 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleOptionTask() {
      this.popUpOption = !this.popUpOption;
    },
    handleDeleteTaskDetail(id: number) {
      this.task.tasksDetail = this.task.tasksDetail.filter(
        (item: any) => item.id !== id
      );
    },
  },
});
</script>

<style scoped>
.task {
  background-color: rgba(254, 226, 226, 0.6);
}
.overlay {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
