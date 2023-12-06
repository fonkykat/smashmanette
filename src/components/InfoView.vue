<template>
  <div class="fullscreen">
    <div class="title">
      Chapter {{chapter_number}}
    </div>
    <div class="admin_text">
      <p>{{text}}</p>
    </div>
  </div>
</template>

<script>
import {getChap} from "@/services/currentService";
import {getText} from "@/services/textService";
export default {
  name: "InfoView",
  data() {
    return {
      chapter_number: 0,
      text: '',
    }
  },
  methods: {
    checkChapter() {
      getChap().then(resp => {
        this.chapter_number = resp.data.number
      }).finally(() => {
        setTimeout(this.checkChapter, 1000)
      })
    },
    getText() {
      getText().then(resp => {
        this.text = resp.data.text
      })
      setTimeout(this.getText, 1000)
    },
  },
  mounted() {
    this.checkChapter()
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
  font-family: "Arial", Helvetica;
  width: 90%;
}

</style>
