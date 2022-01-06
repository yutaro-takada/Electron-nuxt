<template>
  <div>
    <app-header />
    <menu-header />
    <nuxt />
  </div>
</template>

<script>
import appHeader from '@/components/header'
import menuHeader from '@/components/menu'

export default {
  name: 'DefaultLayout',
  components: { 
    appHeader,
    menuHeader
    }
}
</script>

<style>
body {
  margin: 0 !important;
}
</style>
