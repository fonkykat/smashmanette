<template>
  <div id="background">
    <h1 id="requestTrigger">Shake</h1>
    <h1 v-if="phoneShook">SHOOOK</h1>
  </div>
</template>

<script>
export default {
  name: "ShakeView",
  data() {
    return {
      shakeCounter: 0,
      phoneShook: false,
    }
  },
  mounted() {
// Add a devicemotion event listener to the window object
    window.addEventListener('devicemotion', handleMotion);

    function handleMotion() {
      // Extract acceleration data from the event
        console.log('Phone shaking detected!');
    }
  }
}
</script>

<style scoped>
#background{
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  background: grey;
}
</style>