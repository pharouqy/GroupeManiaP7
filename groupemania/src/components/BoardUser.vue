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
import axios from "axios";

export default {
  name: "User",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/profil")
      .then((response) => (this.content = response.data))
      .catch((error) => console.log(error));
  },
};
</script>