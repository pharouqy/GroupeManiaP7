<template>
  <CreatePost />
  <Wall />
</template>

<script>
import CreatePost from "../components/CreatePost.vue";
import Wall from '../components/Wall.vue';

export default {
  name: "Home",
  components: { CreatePost, Wall},
};
</script>

<style scoped>
</style>