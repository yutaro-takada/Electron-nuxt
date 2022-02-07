<template>
  <div>
    <h1>ログインページ</h1>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="user.email" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="user.password" />
      </div>
      <button type="submit">ログイン</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      let uri = "http://localhost:5000/user/api/auth/login/";
      const items = await this.$axios.$get(uri, {
        mail: this.user.email,
        pass: this.user.password,
      });
    },
  },
};
</script>

<style></style>
