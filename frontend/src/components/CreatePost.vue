<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="submit" enctype="multipart/form-data">
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
          <button class="w-100 btn btn-lg btn-success" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreatePost",
  data() {
    return {
      data: {
        title: "",
        content: "",
        image: "",
      },
    };
  },
  methods: {
    selectFile(e) {
      this.data.image = e.target.files[0];
    },
    async submit() {
      const formData = new FormData();
      formData.append("title", this.data.title);
      formData.append("content", this.data.content);
      formData.append("post_image", this.data.image);
      await axios
        .post("http://localhost:3000/api/post/new", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          alert("Post created");
          this.$router.go();
        })
        .catch((err) => {
          alert("Post not created");
          console.log(err);
        });
    },
  },
};
</script>

<style>
input.form-control {
  height: 38px;
  margin-bottom: 10px;
}
#app > main > div.container > div > form > div > div:nth-child(2) > div > span {
  height: 63px;
}
</style>