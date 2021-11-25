import axios from "axios";

const API_URL = "http://localhost:3000/api/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          //console.log("cookies", decodeURIComponent(document.cookie));
          /*console.log(response.data.token);
          const d = new Date();
          d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
          let expires = "expires=" + d.toUTCString();*/
          //document.cookie = "token" + "=" + response.data.token + ";" + expires + ";path=/";
        }

        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "register", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
