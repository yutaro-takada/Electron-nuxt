<template>
 <div>
  <h1>ログインページ</h1>
  <form @submit.prevent="loginUser">
    <div class="form-group">
      <label for="email">Email:</label>
      <input v-model="user.email">
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" v-model="user.password">
    </div>
    <button type="submit">ログイン</button>
  </form>
  </div>
</template>

<script>
export default {
  // middleware({ store, redirect }) {
  //   if(store.$auth.loggedIn) {
  //     redirect('/');
  //   }
  // },
  data() {
    return {
      user:{
          email:'',
          password:''
        }
    }
  },
  methods: {
    // loginUser(){
    //     this.$auth.loginWith('local',{
    //       data:this.user
    //     })
    //   },
  }
}
</script>

<style>
</style>