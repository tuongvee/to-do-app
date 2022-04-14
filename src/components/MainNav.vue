<template>
  <nav
    class="flex flex-wrap fixed top-0 left-0 right-0 z-50 bg-red-50 p-4 items-center justify-between w-full"
  >
    <router-link to="/">
      <a href="#" class="flex items-center font-bold text-slate-900">
        <svg
          class="mr-3 h-9"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
          <path
            fill-rule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="self-center text-2xl font-bold whitespace-nowrap">
          Todo List
        </span>
      </a>
    </router-link>

    <div class="group inline-block absolute right-5">
      <button
        class="bg-transparent rounded-full inline-flex items-center text-slate-900"
      >
        <svg
          class="w-10 h-10"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <ul
        class="absolute right-0 top-10 w-48 hidden z-50 text-gray-700 py-1 group-hover:block bg-white rounded border border-gray-300 m-1"
      >
        <li
          class="bg-white py-3 px-4 block whitespace-no-wrap text-left font-semibold my-1 border-b border-gray-300"
        >
          <span>User Name</span>
        </li>
        <li class="">
          <router-link
            class="bg-white hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap"
            to="/"
          >
            <span>Dashboard</span>
          </router-link>
        </li>
        <li class="">
          <router-link
            class="bg-white hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap"
            to="/user"
          >
            <span>Settings</span>
          </router-link>
        </li>
        <li class="my-1 border-t border-gray-300">
          <router-link
            class="bg-white hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap"
            to="/signin"
          >
            <span>Log Out</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
