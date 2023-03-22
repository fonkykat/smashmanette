<template>
  <manette-view @pass="checkPass" v-if="locked" :send="false"></manette-view>
  <div class="fullscreen" v-else>
    <div class="title">
      Chapter {{chapter_number}}
    </div>
    <div class="quarter" id="a" @click="previousChapter">
      <p class="button_label">Previous</p>
    </div>
    <div class="quarter" id="b" @click="nextChapter">
      <p class="button_label">Next</p>
    </div>
    <div class="quarter" id="x" @click="resetCounts">
      <p class="button_label">Reset</p>
    </div>
    <div class="quarter" id="y">
      <p class="button_label">?</p>
    </div>
  </div>
</template>

<script>
import ManetteView from "@/components/ManetteView";
import {deleteAllButtonPress, resetButton} from "@/services/buttonService";
import {getChap, setChap} from "@/services/currentService";
export default {
  name: "AdminView",
  components: {ManetteView},
  data() {
    return {
      locked: true,
      chapter_number: 0,
    }
  },
  methods:{
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
    checkPass(pass){
      if(pass === 'aayyxxbb')
        this.locked = false
    }
  },
  mounted() {
    getChap().then(resp => {
    console.log(resp.data)
    console.log(resp.data.number)
      this.chapter_number = resp.data.number
    })
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

.quarter{
  position: absolute;
  text-align: center;
  width: 50%;
  height: 50%;
  font-size: 10vh;
  margin: 0;
  vertical-align: middle;
  border: 2px #2c3e50 solid;
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
