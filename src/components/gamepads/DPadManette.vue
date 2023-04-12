<template>
  <div class="fullscreen">
    <div class="quarter a" id="a" @click="incrButton('down')">
      <p class="button_label"><font-awesome-icon icon="fa-solid fa-caret-down"></font-awesome-icon></p>
    </div>
    <div class="quarter b" id="b" @click="incrButton('right')">
      <p class="button_label"><font-awesome-icon icon="fa-solid fa-caret-right"></font-awesome-icon></p>
    </div>
    <div class="quarter x" id="x" @click="incrButton('left')">
      <p class="button_label"><font-awesome-icon icon="fa-solid fa-caret-left"></font-awesome-icon></p>
    </div>
    <div class="quarter y" id="y" @click="incrButton('up')">
      <p class="button_label"><font-awesome-icon icon="fa-solid fa-caret-up"></font-awesome-icon></p>
    </div>
  </div>
</template>

<script>
import {incrButton} from "@/services/buttonService";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "DPadManette",
  components: {FontAwesomeIcon},
  data() {
    return {}
  },
  methods:{
    incrButton(name){
      incrButton(name)
    }
  }
}
</script>

<style scoped>
.fullscreen{
  position: absolute;
  display: grid;
  grid-template-areas:  ". y ."
                        "x y b"
                        "x a b"
                        ". a .";
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #b2b4b2;
}
.quarter{
  text-align: center;
  color: black;
  font-size: 10vh;
  font-weight: bolder;
  vertical-align: middle;
  background: #707372;
  border: 2px solid #54585a;
}

.button_label{
  color: #54585a;
  z-index: 100;
  position:relative;
  top:35%;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 45%;
  margin-right: 45%;
}

#a:active, #b:active, #x:active, #y:active{
  background-color: #b2b4b2;
}

#a{
  grid-area: a;
}

#b{
  grid-area: b;
}

#x{
  grid-area: x;
}

#y{
  grid-area: y;
}
</style>