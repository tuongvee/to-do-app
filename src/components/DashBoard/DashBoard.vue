<template>
  <div class="flex flex-nowrap">
    <div
      v-for="task in tasks"
      :key="task.id"
      class="mx-4 relative items-center"
    >
      <TaskTag :taskProp="task" @delete="handleDeleteTask" />
    </div>

    <!-- Add New Task -->
    <div
      class="task h-fit rounded p-2 drop-shadow-md border border-red-100 items-center"
    >
      <input
        type="text"
        placeholder="New Task"
        class="block border border-gray-300 p-2 my-2 rounded w-full"
        v-model="newTask.nameTask"
      />
      <input
        type="text"
        placeholder="Description"
        class="block border border-gray-300 p-2 my-2 rounded w-full"
        v-model="newTask.description"
      />
      <input
        type="datetime-local"
        class="block border border-gray-300 p-2 my-2 rounded w-full"
        v-model="newTask.deadline"
      />
      <button
        class="bg-red-100 drop-shadow-lg border border-red-200 font-bold px-10 py-2 mx-3 my-2 rounded-full"
        type="button"
        @click="addTask"
      >
        Create Task
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskTag from "@/components/DashBoard/TaskTag.vue";
import dayjs from "dayjs";
import TaskService from "@/services/task.service";

export default defineComponent({
  name: "DashBoard",
  components: {
    TaskTag,
  },
  data() {
    return {
      newTask: {
        nameTask: "",
        description: "",
        deadline: "",
      },
      popUpOption: false,
      tasks: [] as any,
    };
  },
  methods: {
    async addTask() {
      const data = {
        nameTask: this.newTask.nameTask,
        description: this.newTask.description,
        deadline: dayjs(this.newTask.deadline).toISOString(),
      };
      await TaskService.add(data)
        .then((res) => {
          if (res?.data) {
            this.tasks.push(res.data);
            this.newTask.nameTask = "";
            this.newTask.description = "";
            this.newTask.deadline = "";
            console.log(this.tasks);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getTasks() {
      await TaskService.get()
        .then((res) => {
          if (res?.data) {
            this.tasks = res.data;
            console.log(this.tasks);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDeleteTask(id: number) {
      this.tasks = this.tasks.filter((item: any) => item.id !== id);
    },
  },
  mounted() {
    this.getTasks();
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
