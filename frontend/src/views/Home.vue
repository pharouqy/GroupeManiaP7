<template>
  <CreatePost />
  <div class="home">
    <div class="container">
      <div class="row" v-for="post in data.posts" v-bind:key="post.id">
        <div class="col-md-12">
          <img v-bind:src="post.image" alt="" />
          <h1>{{ post.title }}</h1>
          <p>
            {{ post.content }}
          </p>
          <span>Like {{ post.isLike }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreatePost from "../components/CreatePost.vue";

export default {
  name: "Home",
  components: { CreatePost },
  data() {
    return {
      data: {},
    };
  },
  beforeMount() {
    this.getName();

  },
  methods: {
    async getName() {
      const res = await fetch("http://localhost:3000/api/post");
      const data = await res.json();
      this.data = data;
    },
  },
};
</script>

<style scoped>
</style>