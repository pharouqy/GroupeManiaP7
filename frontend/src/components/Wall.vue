<template>
  <div class="home">
    <div class="container">
      <div class="row" v-for="post in data.posts" v-bind:key="post.id">
        <div class="col-md-12 post">
          <div v-for="user in donnee" v-bind:key="user.id" >
            <div v-if="post.idUSERS === user.id">
              <img class="img-user"  v-bind:src="user.image" alt="">
              <span>{{user.username}}</span>
            </div>
          </div>
          <img class="img-post" v-bind:src="post.image" alt="" />
          <span>{{ post.createdAt }}</span>
          <h1>{{ post.title }}{{ post.idUSERS }}</h1>
          <p>
            {{ post.content }}
          </p>
          <span>Like {{ post.isLike }}</span>
          <button
            type="button"
            class="btn btn-danger"
            @click="deletePost(post.id)"
          >
            Supprimer
          </button>
          <button
            type="button"
            class="btn btn-warning"
            @click="UpdatePost(post.id)"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Wall",
  watch: {
    $route(to, from) {
      // on route change
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
    this.retriveUser();
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
    retriveUser() {
      axios
        .get("http://localhost:3000/api/profils", {
          withCredentials: true,
        })
        .then((response) => {
          this.donnee = response.data.users;
        })
        .catch((error) => {
          console.log(error);
        });
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
img.img-user {
    width: 20%;
    border-radius: 50%;
}
</style>