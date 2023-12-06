<template>
<!--  <div id="dev_quarter" v-if="current !== 0" :style="'color:'+pingColor">{{ping}} ms</div>-->
<!--  <div class="fullscreen" v-if="current===0 && send">-->
<!--    <h1 id="no_concert">Il n'y a pas de concert en cours, revenez plus tard !!</h1>-->
<!--  </div>-->
  <diag-manette :send="send"/>
  <!--precise-manette v-else-if="current===2"/>
  <shake-manette v-else-if="current==3"/>
  <d-pad-manette v-else/-->

</template>

<script>
import {getChap} from "@/services/currentService";
import DiagManette from "@/components/gamepads/DiagManette.vue";

export default {
  name: "ManetteView",
  components: {DiagManette},
  data() {
    return {
      current:0,
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
        //setTimeout(this.checkChapter,1000)
      })
    },
  },
  mounted() {
    //this.checkChapter()
  }
}
</script>

<style scoped>
.fullscreen{
  background-color: #707372;
  position: absolute;
  display: grid;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
#no_concert{
  position: absolute;
  z-index: 10;
  color: #a7a4e0;
  top: 30%;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%);
}
</style>
