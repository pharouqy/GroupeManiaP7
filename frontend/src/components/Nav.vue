<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!isLoggedIn">
          <li class="nav-item">
            <router-link to="/Login" class="nav-link active">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Register" class="nav-link active"
              >Register</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="isLoggedIn">
          <li class="nav-item">
            <router-link to="/Profile" class="nav-link active"
              >Profile</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="#"
              class="nav-link active"
              @click="lougout()"
              >Lougout</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Nav",
  setup() {
    const router = useRouter();
    const store = useStore();
    const isLoggedIn = computed(() => {
      return store.state.authenticated;
    });
    const lougout = () => {
      fetch("http://localhost:3000/api/logout", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            router.push("/");
          }
        });
    };
    return {
      isLoggedIn,
      lougout,
    };
  },
};
</script>

 <style scoped>
</style>