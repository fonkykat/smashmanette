<template>
  <div class="fullscreen">
    <div class="quarter a" id="a" @click="incrButton('a')">
      <p class="button_label">A</p>
    </div>
    <div class="quarter b" id="b" @click="incrButton('b')">
      <p class="button_label">B</p>
    </div>
    <div class="quarter x" id="x" @click="incrButton('x')">
      <p class="button_label">X</p>
    </div>
    <div class="quarter y" id="y" @click="incrButton('y')">
      <p class="button_label">Y</p>
    </div>
  </div>
</template>

<script>
import {incrButton} from "@/services/buttonService";

export default {
  name: "MashManette",
  data() {
    return {
      pass: "",
    }
  },
  props:{
    send: {type: Boolean, default: true},
  },
  methods:{
    incrButton(name){
      if(this.send)
        incrButton(name)
      else{
        this.pass += name
        console.log(this.pass)
        if(this.pass.length === 8)
        {
          this.$emit('pass',this.pass)
          this.pass = ""
        }
      }
    }
  }
}
</script>

<style scoped>
.fullscreen{
  width:100%;
  height:100%;
  margin:0;
  padding: 0;
}
.quarter{
  position: absolute;
  text-align: center;
  width: 50%;
  height: 50%;
  color: black;
  font-size: 10vh;
  font-weight: bolder;
  margin: 0;
  vertical-align: middle;
}

.button_label{
  position:relative;
  top:35%;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 45%;
  margin-right: 45%;
}

#a:active, #b:active, #x:active, #y:active{
  background-color: grey;
}

.a{
  top:0;
  left:0;
}

.b {
  top: 0;
  right: 0;
}

.x {
  bottom: 0;
  left: 0;
}

.y {
  bottom: 0;
  right: 0;
}

@keyframes f {
  100% {background-position:right}

}

#a{
  background-color: #008d45;
}

#b{
  background-color: #eb1a1d;
}

#x{
  background-color: #0749b4;
}

#y{
  background-color: #fece15;
}
</style>