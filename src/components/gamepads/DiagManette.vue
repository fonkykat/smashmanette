<template>
  <div class="fullscreen" :style="'grid-template-areas:'+padLayout">
    <div id="pad_brand" @click="changeBrand">{{brand}}</div>
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
  name: "DiagManette",
  data() {
    return {
      pass: "",
      brand: "Xbox",
      xboxLayout: '". y ."\n' +
          '      "x y b"\n' +
          '      "x a b"\n' +
          '      ". a ."',
      nintendoLayout: '". x ."\n' +
          '      "y x a"\n' +
          '      "y b a"\n' +
          '      ". b ."'
    }
  },
  computed:{
    padLayout() {
      if(this.brand === 'Xbox')
        return this.xboxLayout
      else return this.nintendoLayout
    },
  },
  props:{
    send: {type: Boolean, default: true},
  },
  methods:{
    changeBrand(){
      if(this.brand === "Xbox"){
        this.brand = "Nintendo"
      }
      else{
        this.brand = "Xbox"
      }
    },
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
  position: absolute;
  display: grid;
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
  margin: 4px;
  vertical-align: middle;
  border-radius: 5vh 10vw;
}

#pad_brand{
  position: absolute;
  top: 0;
  left: 0;
  height: 5%;
  width: 10%;
  background: white;
  color: black;
  padding-top: 1%;
  user-select: none;
}

.button_label{
  position:relative;
  top:35%;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 45%;
  margin-right: 45%;
  pointer-events: none;
  user-select: none;
}

#a:active, #b:active, #x:active, #y:active{
  background-color: #b2b4b2;
}

#a{
  background-color: #008d45;
  grid-area: a;
}

#b{
  background-color: #eb1a1d;
  grid-area: b;
}

#x{
  background-color: #0749b4;
  grid-area: x;
}

#y{
  background-color: #fece15;
  grid-area: y;
}
</style>