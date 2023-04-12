<template>
  <diag-manette @pass="checkPass" v-if="locked" :send="false"></diag-manette>
  <div class="fullscreen" v-else>
    <div class="title">
      Chapter {{chapter_number}}
    </div>
    <div class="admin_text">
      <p>{{text}}</p>
    </div>
    <div class="quarter" id="a" @click="previousChapter">
      <p class="button_label"><font-awesome-icon icon="fa-solid fa-caret-left"/></p>
    </div>
    <div class="quarter" id="b" @click="nextChapter">
      <p class="button_label"><font-awesome-icon icon="fa-solid fa-caret-right"/></p>
    </div>
    <div class="quarter" id="x" @click="resetCounts">
      <p class="button_label"><font-awesome-icon icon="fa-solid fa-trash"/></p>
    </div>
    <div class="quarter" id="y" @click="setNextTrue">
      <p class="button_label"><font-awesome-icon icon="fa-solid fa-horse"/></p>
    </div>
  </div>
</template>

<script>
import {deleteAllButtonPress, resetButton} from "@/services/buttonService";
import {getChap, setChap, setNextTrue} from "@/services/currentService";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import DiagManette from "@/components/gamepads/DiagManette.vue";
import {getText} from "@/services/textService";
export default {
  name: "AdminView",
  components: {DiagManette, FontAwesomeIcon},
  data() {
    return {
      locked: true,
      chapter_number: 0,
      text: '',
    }
  },
  methods:{
    getText(){
      getText().then(resp => {
        this.text = resp.data.text
      })
      setTimeout(this.getText, 1000)
    },
    nextChapter(){
      setChap(this.chapter_number + 1).then(resp => {
        this.chapter_number = resp.data.number
      })
    },
      previousChapter(){
      setChap(this.chapter_number - 1).then(resp => {
        this.chapter_number = resp.data.number
      })
    },
    resetCounts(){
      resetButton()
      deleteAllButtonPress()
    },
    setNextTrue(){
      setNextTrue();
    },
    checkPass(pass){
      if(pass === 'aayyxxbb')
        this.locked = false
    }
  },
  mounted() {
    getChap().then(resp => {
      this.chapter_number = resp.data.number
    })
    this.getText()
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

.title{
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  background-color: black;
  color: white;
  font-size: 5vh;
  z-index: 100;
  width: 100%;
  padding: 2vh;
}

.admin_text{
  position: absolute;
  top: 10%;
  left: 25%;
  width: 50%;
  font-size: 5vh;
  padding-left: 2vw;
  padding-right: 2vw;
}

.admin_text p{
  width: 90%;
}

.quarter{
  position: absolute;
  text-align: center;
  width: 25%;
  height: 50%;
  font-size: 7vh;
  margin: 0;
  vertical-align: middle;
  border: 2px #2c3e50 solid;
  }

.button_label{
  position:relative;
  top: 50%;
  transform: translateY(-50%);
}

#a:active, #b:active, #x:active, #y:active{
  background-color: grey;
}

#a{
	top:0;
	left:0;
}

#b{
	top:0;
	right:0;
}

#x{
	bottom:0;
	left:0;
}

#y{
	bottom:0;
	right:0;
}
</style>
