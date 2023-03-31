<template>
  <div class="fullscreen">
    <div class="quarter a" id="ax" @click="postButtonPress('a')">
      <p class="button_label">A</p>
    </div>
    <div class="quarter b" id="bx" @click="postButtonPress('b')">
      <p class="button_label">B</p>
    </div>
    <div class="quarter x" id="xx" @click="postButtonPress('x')">
      <p class="button_label">X</p>
    </div>
    <div class="quarter y" id="yx" @click="postButtonPress('y')">
      <p class="button_label">Y</p>
    </div>
  </div>
</template>

<script>
import {postButtonPress} from "@/services/buttonService";

export default {
  name: "PreciseManette",
  methods: {
    postButtonPress(name){
      const press = {}
      press['timestamp'] = Date.now()
      // press.date = new Date()
      postButtonPress(name, press).then(resp => {
        const time = new Date(resp.data.timestamp)
        const time_string = time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()+','+time?.getMilliseconds();
        alert('Bouton "'+resp.data.name.toUpperCase()+'" appuyé à '+time_string+' par votre IP : '+resp.data.ip)
      })
    },
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

#ax, #bx, #xx, #yx{
  background-color: grey;
  color: white;
}

#ax:active{
  background-color: green;
  color: black;
}
#bx:active{
  background-color: red;
  color: black;
}
#xx:active{
  background-color: blue;
  color: black;
}
#yx:active{
  background-color: yellow;
  color: black;
}

@keyframes f {
  100% {background-position:right}

}
</style>