<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand"
        ><img class="img-logo" src="../assets/icon-left-font.png" alt=""
      /></router-link>
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
            <router-link to="/Profiles" class="nav-link active"
              >Profiles</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/Profile" class="nav-link active"
              >Profile</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="#" class="nav-link active" @click="lougout()"
              >Lougout</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Nav",
  computed: {
    isLoggedIn() {
      const store = useStore();
      return store.state.authenticated;
    },
  },
  setup() {
    const router = useRouter();
    /*const store = useStore();
    const isLoggedIn = computed(() => {
      return store.state.authenticated;
    });*/
    const lougout = () => {
      fetch("http://localhost:3000/api/logout", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            console.log(data.message);
            router.push("/Login");
          }
        });
    };
    return {
      //isLoggedIn,
      lougout,
    };
  },
};
</script>

 <style>
.img-logo {
  width: 280%;
  height: 80px;
  object-fit: cover;
}
</style>