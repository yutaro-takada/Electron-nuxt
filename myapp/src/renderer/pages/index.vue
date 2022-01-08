<template>
  
  <div style="background-color:aqua;">あ</div>
</template>

<script>
import appHeader from '@/components/header'
export default {
  name: "IndexPage",
  components: {
    appHeader
  },
  data() {
    return {
      externalContent: '',
    };
  },
  methods: {
  },
};
</script>

<style>
.e-nuxt-container {
  min-height: calc(100vh - 50px);
  background: linear-gradient(to right, #ece9e6, #ffffff);
  font-family: Helvetica, sans-serif;
}

.e-nuxt-content {
  display: flex;
  justify-content: space-around;
  padding-top: 50px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.e-nuxt-logo {
  width: 400px;
}

.e-nuxt-system-info {
  padding: 20px;
  border-top: 1px solid #397c6d;
  border-bottom: 1px solid #397c6d;
}

.e-nuxt-links {
  padding: 20px 0;
  display: flex;
  /* justify-content: center; */
}
</style>
