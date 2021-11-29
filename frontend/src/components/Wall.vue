<template>
  <div class="home">
    <div class="container">
      <div class="row" v-for="post in data.posts" v-bind:key="post.id">
        <div class="col-md-12 post">
          <img class="img-post" v-bind:src="post.image" alt="" />
          <h1>{{ post.title }}{{ post.id }}</h1>
          <p>
            {{ post.content }}
          </p>
          <span>Like {{ post.isLike }}</span>
          <button @click="deletePost(post.id)">Supprimer</button>
          <button @click="UpdatePost(post.id)">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Wall",
  watch: {
    $route(to, from) { // on route change
      to.params.idPost;
    },
  },
  data() {
    return {
      data: {},
      idPost: null,
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
    async deletePost(idPost) {
      await fetch("http://localhost:3000/api/post/" + idPost, {
        method: "DELETE",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            this.getName();
          }
        });
    },
    UpdatePost(idPost) {
      this.$router.push(`/UpdatePoste/${idPost}`);
    },
  },
};
</script>

<style scoped>
.img-post {
  width: 100%;
  height: auto;
  border-radius: 15px;
}
.post {
  margin: 20px 0;
  box-shadow: 8px 5px 15px 0px #ccc;
  border-radius: 50px;
  padding: 25px;
  background-color: #ffd2bd;
}
</style>