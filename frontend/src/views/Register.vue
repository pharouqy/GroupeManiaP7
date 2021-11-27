<template>
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please sign up</h1>
    <div class="form-floating">
      <input v-model="data.username" type="test" class="form-control" placeholder="Username" required />
      <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating">
      <input v-model="data.email" type="email" class="form-control" placeholder="name@example.com" required />
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input v-model="data.password" type="password" class="form-control" placeholder="Password" required />
      <label for="floatingPassword">Password</label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import {reactive} from 'vue';
import {useRouter} from 'vue-router';

export default {
    name: 'Register',
    setup() {
        const data = reactive({
            username: '',
            email: '',
            password: '',
        });
        const router = useRouter();

        const submit = async () => {
            console.log(data);
            await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(data),
            });
            await router.push('/Login');
        };

        return {
            data,
            submit,
        };
    },
}
</script>

<style scoped>

</style>