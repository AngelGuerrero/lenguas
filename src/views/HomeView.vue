<template>
  <b-container class="dev mt-5">
    <h3>Home</h3>
    <router-link :to="{name: 'access'}">Ingresar</router-link>
    <router-link :to="{name: 'admin'}">Admin</router-link>
    <router-view></router-view>
  </b-container>
</template>

<script>
export default {}
</script>
