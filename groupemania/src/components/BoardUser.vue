<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Message : {{ content.message }}</h3>
      <h3>Email : {{ content.email }}</h3>
      <h3>Username : {{ content.username }}</h3>
      <h3>Biography : {{ content.biography }}</h3>
      <h3>Role : {{ content.isAdmin }}</h3>
      <h3>Image : {{ content.image }}</h3>
      <h3>Contenu : {{ content }}</h3>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "User",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>