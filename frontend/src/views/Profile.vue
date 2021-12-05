<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-8 col-lg-6">
        <!-- Section Heading-->
        <div
          class="section_heading text-center wow fadeInUp"
          data-wow-delay="0.2s"
          style="
            visibility: visible;
            animation-delay: 0.2s;
            animation-name: fadeInUp;
          "
        >
          <h3>{{ data.message }}</h3>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- Single Advisor-->
      <div class="col-12 col-sm-12 col-lg-12">
        <div
          class="single_advisor_profile wow fadeInUp"
          data-wow-delay="0.2s"
          style="
            visibility: visible;
            animation-delay: 0.2s;
            animation-name: fadeInUp;
          "
        >
          <!-- Team Thumb-->
          <div class="advisor_thumb">
            <img v-bind:src="data.image" alt="" />
            <!-- Social Info-->
            <div class="social-info">
              <a href="#"><i class="fa fa-facebook"></i></a
              ><a href="#"><i class="fa fa-twitter"></i></a
              ><a href="#"><i class="fa fa-linkedin"></i></a>
            </div>
          </div>
          <!-- Team Details-->
          <div class="single_advisor_details_info">
            <h6>{{ data.username }}</h6>
            <p class="designation">Email : {{ data.email }}</p>
            <h6 class="designation">Biography : {{ data.biography }}</h6>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteUser(data.id)"
            >
              Supprimer
            </button>
            <button
              type="button"
              class="btn btn-warning"
              @click="UpdateUser(data.id)"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//import { onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Profile",
  /*watch: {
    $route(to, from) {
      // on route change
      return to.params.id;
    },
  },*/
  data() {
    return {
      data: {
        username: "",
        email: "",
        biography: "",
        image: "",
      },
    };
  },
  beforeMount() {
    this.getName();
  },
  methods: {
    getName() {
      const store = useStore();
      axios
        .get("http://localhost:3000/api/profil", {
          withCredentials: true,
        })
        .then((response) => {
          this.data = response.data;
          store.dispatch("setAuthenticated", true);
        })
        .catch((error) => {
          store.dispatch("setAuthenticated", false);
          console.log(error);
        });
    },
    deleteUser(id) {
      axios
        .delete(`http://localhost:3000/api/delete/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response) {
            alert("User deleted");
            this.$router.push("/Login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    UpdateUser(id) {
      this.$router.push(`/UpdateUser/${id}`);
    },
  },
};
</script>

<style scoped>
body {
  margin-top: 20px;
  background: #eee;
}
.single_advisor_profile {
  position: relative;
  margin-bottom: 50px;
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  z-index: 1;
  border-radius: 15px;
  -webkit-box-shadow: 0 0.25rem 1rem 0 rgba(47, 91, 234, 0.125);
  box-shadow: 0 0.25rem 1rem 0 rgba(47, 91, 234, 0.125);
}
.single_advisor_profile .advisor_thumb {
  position: relative;
  z-index: 1;
  border-radius: 15px 15px 0 0;
  margin: 0 auto;
  padding: 30px 30px 0 30px;
  background-color: #ff6600;
  overflow: hidden;
}
.single_advisor_profile .advisor_thumb::after {
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  position: absolute;
  width: 150%;
  height: 80px;
  bottom: -45px;
  left: -25%;
  content: "";
  background-color: #ffffff;
  -webkit-transform: rotate(-15deg);
  transform: rotate(-15deg);
}
@media only screen and (max-width: 575px) {
  .single_advisor_profile .advisor_thumb::after {
    height: 160px;
    bottom: -90px;
  }
}
.single_advisor_profile .advisor_thumb .social-info {
  position: absolute;
  z-index: 1;
  width: 100%;
  bottom: 0;
  right: 30px;
  text-align: right;
}
.single_advisor_profile .advisor_thumb .social-info a {
  font-size: 14px;
  color: #020710;
  padding: 0 5px;
}
.single_advisor_profile .advisor_thumb .social-info a:hover,
.single_advisor_profile .advisor_thumb .social-info a:focus {
  color: #ff6600;
}
.single_advisor_profile .advisor_thumb .social-info a:last-child {
  padding-right: 0;
}
.single_advisor_profile .single_advisor_details_info {
  position: relative;
  z-index: 1;
  padding: 30px;
  text-align: right;
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  border-radius: 0 0 15px 15px;
  background-color: #ffffff;
}
.single_advisor_profile .single_advisor_details_info::after {
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  position: absolute;
  z-index: 1;
  width: 50px;
  height: 3px;
  background-color: #3f43fd;
  content: "";
  top: 12px;
  right: 30px;
}
.single_advisor_profile .single_advisor_details_info h6 {
  margin-bottom: 0.25rem;
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .single_advisor_profile .single_advisor_details_info h6 {
    font-size: 14px;
  }
}
.single_advisor_profile .single_advisor_details_info p {
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  margin-bottom: 0;
  font-size: 14px;
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .single_advisor_profile .single_advisor_details_info p {
    font-size: 12px;
  }
}
.single_advisor_profile:hover .advisor_thumb::after,
.single_advisor_profile:focus .advisor_thumb::after {
  background-color: #ff0800;
}
.single_advisor_profile:hover .advisor_thumb .social-info a,
.single_advisor_profile:focus .advisor_thumb .social-info a {
  color: #ffffff;
}
.single_advisor_profile:hover .advisor_thumb .social-info a:hover,
.single_advisor_profile:hover .advisor_thumb .social-info a:focus,
.single_advisor_profile:focus .advisor_thumb .social-info a:hover,
.single_advisor_profile:focus .advisor_thumb .social-info a:focus {
  color: #ffffff;
}
.single_advisor_profile:hover .single_advisor_details_info,
.single_advisor_profile:focus .single_advisor_details_info {
  background-color: #ff0800;
}
.single_advisor_profile:hover .single_advisor_details_info::after,
.single_advisor_profile:focus .single_advisor_details_info::after {
  background-color: #ffffff;
}
.single_advisor_profile:hover .single_advisor_details_info h6,
.single_advisor_profile:focus .single_advisor_details_info h6 {
  color: #ffffff;
}
.single_advisor_profile:hover .single_advisor_details_info p,
.single_advisor_profile:focus .single_advisor_details_info p {
  color: #ffffff;
}
img {
  width: 100%;
}
</style>