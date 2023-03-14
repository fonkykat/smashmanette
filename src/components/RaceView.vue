<template>
  <div id="decor" :style="{ backgroundImage: 'url(' + background + ')' }">
    <img :src="track" id="track">
    <img :src="car1" id="car1" class="cars" :style="{left: X1}">
    <img :src="car2" id="car2" class="cars" :style="{left: X2}">
    <h1 v-if="redwin">RED WIN</h1>
    <h1 v-if="greenwin">GREEN WIN</h1>
  </div>
</template>

<script>
import racetrack from "@/assets/racetrack.jpg"
import background from "@/assets/sand.jpg"
import car1 from "@/assets/car1.png"
import car2 from "@/assets/car2.png"
import {getButtons} from "@/services/buttonService";

export default {
  name: "RaceView",
  data() {
    return {
      track : racetrack,
      background: background,
      car1: car1,
      car2: car2,
      redwin: false,
      greenwin: false,
      raceX1: 0,
      raceX2: 0,
    }
  },
  computed: {
    X1: function () {
      return this.raceX1+'px';
    },
    X2: function () {
      return this.raceX2+'px';
    }
  },
  methods: {
    checkPosition() {
      getButtons().then(resp => {
        const data = resp.data
        this.raceX1 = data.filter(e => e.name === 'b')[0].count *10
        this.raceX2 = data.filter(e => e.name === 'a')[0].count *10

        if(this.raceX1 > 800) this.redwin = true
        if(this.raceX2 > 800) this.greenwin = true

      }).finally(() => {
        this.checkPosition()
      })
    }
  },
  mounted() {
      this.checkPosition()
  }
}
</script>

<style scoped>
#decor{
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: 0;
  background-repeat: no-repeat;
  background-size: cover;
}

.cars{
  height: 12vh;
  position: absolute;
}

#car1{
  top:25vh;
}

#car2{
  top:40vh;
}

#track{
  width: 100%;
  margin-top: 20vh;
}

</style>
