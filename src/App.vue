<template>
  <router-view/>
</template>

<script>

import {sayHello} from "@/services/concertService";

export default {
  name: 'App',
  mounted()
  {
    sayHello()
  }
}
</script>

<style>
@font-face {
  font-family: "SilkScreen";
  src: local("SilkScreen"),
  url("@/fonts/slkscr.ttf") format("truetype");
}

#app {
  font-family: "SilkScreen", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1vh;
}
</style>
