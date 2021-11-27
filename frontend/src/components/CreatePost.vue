<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="submit">
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
                v-on:change="previewFiles"
                type="file"
                class="custom-file-input"
                id="inputGroupFile01"
                name="post_image"
              />
              <label class="custom-file-label" for="inputGroupFile01"
                >Choose file</label
              >
            </div>
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "CreatePost",
  methods: {
    previewFiles(event) {
      console.log(event.target.files);
    },
  },
  setup() {
    const data = reactive({
      title: "",
      content: "",
      previewFiles: "",
    });

    const submit = async () => {
      console.log(data);
      await fetch("http://localhost:3000/api/post/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
    };

    return {
      data,
      submit,
    };
  },
};
</script>

<style>
</style>