<template>
  <div id="dev_quarter" v-if="current !== 0" :style="'color:'+pingColor">{{ping}} ms</div>
  <div class="fullscreen" id="no_concert" v-if="current===0 && send">
    <h1>Il n'y a pas de concert en cours désolé, revenez plus tard !!</h1>
  </div>
  <diag-manette :send="send" v-else-if="current===1 || !send"/>
  <precise-manette v-else-if="current===2"/>
  <shake-manette v-else-if="current==3"/>
  <d-pad-manette v-else/>

</template>

<script>
import {getChap} from "@/services/currentService";
import DiagManette from "@/components/gamepads/DiagManette.vue";
import PreciseManette from "@/components/gamepads/PreciseManette.vue";
import ShakeManette from "@/components/gamepads/ShakeManette.vue";
import DPadManette from "@/components/gamepads/DPadManette.vue";

export default {
  name: "ManetteView",
  components: {DPadManette, DiagManette, ShakeManette, PreciseManette},
  data() {
    return {
      pass:"",
      current:1,
      ping: 0,
    }
  },
  computed:{
    pingColor() {
      return this.ping > 100 ? 'red': 'green';
    }
  },
  props:{
    send: {type: Boolean, default: true},
  },
  methods:{
    checkChapter(){
      let start = new Date().getTime()
      getChap().then(resp => {
        this.current = resp.data.number
        this.ping = new Date().getTime() - start
      }).finally(() => {
        setTimeout(this.checkChapter,1000)
      })
    },
  },
  mounted() {
    this.checkChapter()
  }
}
</script>

<style scoped>

#dev_quarter{
  z-index: 100;
  position: absolute;
  top: 0;
  right: 0;
  background: white;
  color: black;
  padding-top: 1%;
  padding-left: 1%;
  padding-right: 1%;
  user-select: none;
}
</style>
