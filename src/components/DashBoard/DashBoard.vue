<template>
  <div class="flex flex-no-wrap">
    <div
      v-for="(tableProp, index) in tables"
      :key="index"
      class="mx-4 relative items-center"
    >
      <TableTag :tableProp="tableProp" />

      <button
        class="mx-3 absolute top-4 right-0"
        @click.prevent="toggleOptionTable(index)"
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
    <div class="table h-fit rounded p-2">
      <div class="flex justify-between items-center">
        <input
          type="text"
          placeholder="New Task"
          class="border border-gray-300 rounded"
          v-model="newTable"
        />
        <button class="w-8 h-8 mx-3" type="button" @click="addTable">
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

  <!-- Option Table Pop Up -->
  <div
    class="flex fixed inset-0 z-50 overlay items-center justify-center drop-shadow-2xl ease-in-out duration-300"
    v-if="popUpOption"
  >
    <div class="relative bg-white p-5 rounded sm:w-6/12">
      <button
        class="absolute mx-3 transition duration-75 top-4 right-0"
        @click.prevent="toggleOptionTable(-1)"
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
          id="taskName"
          type="text"
          v-model="editTable"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Table name"
        />
        <label
          class="block float-left text-gray-700 text-md font-bold my-2"
          for="description"
        >
          Description
        </label>
        <textarea
          id="description"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
          placeholder="Description"
        ></textarea>
        <label
          class="block float-left text-gray-700 text-md font-bold my-2"
          for="floatingInput"
          >Deadline</label
        >
        <div class="datepicker relative form-floating mb-3 xl:w-96">
          <input
            id="deadline"
            type="date"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div class="block p-4">
        <button
          @click="updateTable"
          class="bg-green-100 text-green-700 px-5 py-2 mx-3 rounded-full"
        >
          Update
        </button>
        <button
          class="bg-red-100 text-red-700 px-5 py-2 mx-3 rounded-full"
          @click="deleteTable(editId)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TableTag from "@/components/DashBoard/TableTag.vue";

export default defineComponent({
  name: "DashBoard",
  components: {
    TableTag,
  },
  data() {
    return {
      newTable: "",
      popUpOption: false,
      editTable: "",
      editId: -1,
      alert: false,
      alertMsg: "",
      tables: [
        {
          title: "UI / UX",
          items: [
            "Nộp báo cáo lần 1 UI/UX",
            "Deadline TH môn UI/UX",
            "Vẽ component giao diện",
            "Vẽ màn hình Trang chủ",
            "Vẽ màn hình User",
            "Vẽ màn hình Tiện ích",
            "Vẽ màn hình Report",
            "Vẽ màn hình chức năng Nạp tiền",
            "Vẽ màn hình chức năng Đăng ký 3G",
            "Vẽ màn hình chức năng Thanh toán hóa đơn",
          ],
        },
        {
          title: "Hệ hỗ trợ quyết định",
          items: ["Làm bài tập chương 4", "Làm bài tập trên lớp"],
        },
        {
          title: "Quản lý thông tin",
          items: ["Làm BTTH2", "Làm BTTH3", "Trả lời câu hỏi trên lớp"],
        },
        {
          title: "Thực tập",
          items: ["Làm bài tập Todo App", "Làm project HRM", "Học Angular"],
        },
        {
          title: "Tiếng anh",
          items: ["Học từ vựng lesson 12", "Luyện viết", "Luyện nghe"],
        },
      ],
    };
  },
  methods: {
    addTable() {
      this.newTable = "";
    },
    toggleOptionTable(id: number) {
      this.popUpOption = !this.popUpOption;
      this.editTable = "";
      this.editId = id;
    },
    updateTable() {
      this.toggleOptionTable(-1);
      this.alertMsg = "Updated Successfully";
      this.alert = true;
      setTimeout(() => (this.alert = false), 1000);
    },
    deleteTable(id: number) {
      this.toggleOptionTable(-1);
      this.alertMsg = "Deleted Successfully";
      this.alert = true;
      setTimeout(() => (this.alert = false), 1000);
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
