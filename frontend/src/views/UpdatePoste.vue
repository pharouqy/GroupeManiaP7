<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="update" enctype="multipart/form-data">
        <!-- @submit.prevent="submit" -->
        <div class="col-md-12 col-md-offset-2">
          <div class="input-group input-group-lg">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-lg"
                >Title</span
              >
            </div>
            <input
              type="text"
              v-model="data.title"
              class="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              :placeholder="dato.title"
            />
          </div>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Content</span>
            </div>
            <textarea
              v-model="data.content"
              class="form-control"
              aria-label="With textarea"
              :placeholder="dato.content"
            ></textarea>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Upload</span>
            </div>
            <div class="custom-file">
              <input
                v-on:change="selectFile"
                type="file"
                class="custom-file-input"
                id="inputGroupFile01"
                name="post_image"
                ref="file"
              />
              <label class="custom-file-label" for="inputGroupFile01"
                >Choose file</label
              >
            </div>
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UpdatePost",
  data() {
    return {
      dato: {},
      data: {
        title: "",
        content: "",
        post_image: "",
      },
    };
  },
  mounted() {
    this.getData(this.$route.params.idPost);
  },
  methods: {
    selectFile(e) {
      this.data.post_image = e.target.files[0];
    },
    update() {
      const formData = new FormData();
      formData.append("title", this.data.title);
      formData.append("content", this.data.content);
      formData.append("post_image", this.data.post_image);
      axios
        .put(
          `http://localhost:3000/api/post/${this.$route.params.idPost}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          alert(res.data.message);
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.response.data.message);
          console.log(error);
        });
    },
    getData(PostId) {
      axios
        .get(`http://localhost:3000/api/post/${PostId}`)
        .then((response) => {
          this.dato = response.data.post;
          console.log(this.dato);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

 <style scoped>
</style>