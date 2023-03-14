<template>
  <div class="fullscreen" id="no_concert" v-if="chapter===0 && send">
    <h1>Il n'y a pas de concert en cours désolé, revenez plus tard !!</h1>
  </div>
  <div class="fullscreen" id="simple_manette" v-else-if="chapter===1 || !send">
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
  <div class="fullscreen" id="complex_manette" v-else-if="chapter===2">
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
  <div class="fullscreen" id="sonex" v-else-if="chapter===3" @click="goFast()">
    <h1 v-if="!go"> GO !!</h1>
    <img :src="sonex" v-if="go && winner"/>
    <img :src="telz" v-if="go && loser"/>
  </div>
</template>

<script>
import {incrButton, postButtonPress} from "@/services/buttonService";
import {getChap} from "@/services/chapterService";
import sonex from "@/assets/sonex.png"
import telz from "@/assets/telz.png"

export default {
  name: "ManetteView",
  data() {
    return {
      pass:"",
      chapter:1,
      sonex: sonex,
      telz: telz,
      go:false,
      winner:false,
      loser:false,
    }
  },
  props:{
    send: {type: Boolean, default: true},
  },
  methods:{
    goFast(){
      this.go = true
      const press = {}
      press['timestamp'] = Date.now()
      // press.date = new Date()
      postButtonPress('a', press).then(() => {
        this.winner = true
      }).catch(() => {
        this.loser = true
      })
    },
    checkChapter(){
      getChap().then(resp => {
        if(resp.data.number === 3 && this.chapter !== 3) {
          this.go = false
          this.winner = false
          this.loser = false
          setTimeout(() => this.chapter = 3, 5000)
        }
        else
          this.chapter = resp.data.number
      }).finally(() => {
        setTimeout(this.checkChapter,1000)
      })
    },
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
  },
  mounted() {
    this.checkChapter()
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

#a{
  background-color:green;
}

#b{
  background-color:red;
}

#x{
  background-color:blue;
}

#y{
  background-color:yellow
}
</style>
