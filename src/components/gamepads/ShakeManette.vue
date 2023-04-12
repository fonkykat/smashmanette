<template>
  <div id="background" :style="myStyle">
    <h1 class="infos" v-if="!phoneShook">Shake</h1>
    <h1 class="infos" v-if="phoneShook">SHOOOOK !!</h1>
  </div>
</template>

<script>
import {incrButton} from "@/services/buttonService";

export default {
  name: "ShakeManette",
  data() {
    return {
      shakeCounter: 0,
      phoneShook: false,
      myStyle:{
        backgroundColor: "#555"
      },

    }
  },
  mounted() {
// Add a devicemotion event listener to the window object
    window.addEventListener('devicemotion', handleMotion);

    const component = this
    function handleMotion(event) {
      // Extract acceleration data from the event
      const { x, y, z } = event.accelerationIncludingGravity;

      // Calculate the total acceleration (excluding gravity)
      const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2) - 9.81;

      // Check if the acceleration exceeds a certain threshold
      if (acceleration > 30) {
        // Phone is shaking
        component.shakeCounter++
        if(component.shakeCounter >= 5)
        {
          incrButton('shake')
          component.shakeCounter = 0
          component.phoneShook = true
          component.myStyle.backgroundColor = "#023020"
          console.log('Phone shaking detected!');

          setTimeout(() => {
            component.phoneShook = false
            component.myStyle.backgroundColor = "#555"
          }, 200)
        }
      }
    }
  }
}
</script>

<style scoped>
#background{
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  background: dimgrey;
}

.infos{
  margin-top: 30%;
  color: white;
}
</style>