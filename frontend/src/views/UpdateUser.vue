<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="update" enctype="multipart/form-data">
        <div class="col-md-12 col-md-offset-2">
          <div class="input-group input-group-lg">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-lg"
                >Email</span
              >
            </div>
            <input
              type="email"
              v-model="user.email"
              class="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              :placeholder="data.email"
            />
          </div>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Biography</span>
            </div>
            <textarea
              v-model="user.biography"
              class="form-control"
              aria-label="With textarea"
              :placeholder="data.biography"
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
                name="profil_image"
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
  name: "UpdateUser",
  data() {
    return {
      data: {},
      user: {
        email: "",
        biography: "",
        image: "",
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    selectFile(e) {
      this.user.profil_image = e.target.files[0];
    },
    update() {
      const formData = new FormData();
      formData.append("email", this.user.email);
      formData.append("biography", this.user.biography);
      formData.append("profil_image", this.user.profil_image);
      axios
        .put(
          `http://localhost:3000/api/update/${this.$route.params.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response);
          this.$router.push("/Profile");
        })
        .catch((error) => {
          console.log(error);
        });
    },
      getData() {
    axios
      .get(`http://localhost:3000/api/profil`, {
        withCredentials: true,
      })
      .then((response) => {
        this.data = response.data;
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