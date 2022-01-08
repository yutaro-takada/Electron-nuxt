<template>
  <div>
    <app-header />
    <nuxt />
  </div>
</template>

<script>
import appHeader from '@/components/header'

export default {
  name: 'DefaultLayout',
  components: { 
    appHeader,
    }
}
</script>

<style>
body {
  padding:0 !important;
}
</style>
