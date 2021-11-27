<template>
  <h1>{{ message }}</h1>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Nav",
  setup() {
    const message = ref("User is not logging in !!!");
    const store = useStore();
    onMounted(() => {
      fetch("http://localhost:3000/api/profil", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            message.value = `Wellcome ${data.username} !!!`;
            store.dispatch("setAuthenticated", true);
          }
        })
        .catch((err) => {
          store.dispatch("setAuthenticated", false);
          console.log(err);
        });
    });
    return {
      message,
    };
  },
};
</script>

<style scoped>
</style>