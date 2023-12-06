<template>
  <diag-manette @pass="checkPass" v-if="locked" :send="false"></diag-manette>
  <n-grid class="fullscreen" v-else :cols="12">
    <n-gi :span="12">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    </n-gi>
    <n-gi :span="10">
      <n-button>naive</n-button>
    </n-gi>
<!--    <div class="title">-->
<!--      <p v-if="concert.name == null">Nouveau Concert, Renseignez les infos suivantes :</p>-->
<!--      <p v-else> Nom morceau, Nom et numéro scene </p>-->
<!--      <p class="param_button"><font-awesome-icon icon="fa-solid fa-gears"/></p>-->
<!--    </div>-->
<!--    <div class="admin_text">-->
<!--      <div v-if="concert.name == null">-->
<!--        <label for="concert_location">Nom du Public</label><input v-model="concert.location" id="concert_location" type="text"/><br/>-->
<!--        <label for="concert_name">Référence du concert</label><input v-model="concert.name" id="concert_name" type="text"/>-->
<!--      </div>-->
<!--      <p v-else>{{text}}</p>-->
<!--    </div>-->
  </n-grid>
</template>

<script>
import {deleteAllButtonPress, resetButton, unlockAdmin} from "@/services/buttonService";
import {getChap, setChap, setNextTrue} from "@/services/currentService";
// import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import DiagManette from "@/components/gamepads/DiagManette.vue";
import {getText} from "@/services/textService";
import {getTodays} from "@/services/concertService";
import {NIcon, NMenu, NButton, NGrid, NGi} from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from '@vicons/ionicons5'
import {Home as HomeIcon,
        Book as BookIcon} from "@vicons/ionicons5";
import {Cogs as CogIcon} from "@vicons/fa";

import { h } from 'vue'

export default {
  name: "AdminView",
  components: {DiagManette, NMenu, NButton, NGrid, NGi},
  data() {
    return {
      locked: true,
      chapter_number: 0,
      text: '',
      confirm: true,
      concert: {},
      activeKey : 0,
      menuOptions: [
        {
          key: 'home',
          href: 'https://en.wikipedia.org/wiki/Hear_the_Wind_Sing',
          icon: this.renderIcon(HomeIcon)
        },
        {
          key: 'chapters',
          icon: this.renderIcon(BookIcon)
        },
        {
          key: 'params',
          icon: this.renderIcon(CogIcon)
        },
      ]
    }
  },
  computed: {
    renderMenuLabel (option) {
      if ('href' in option) {
        return h('a', { href: option.href, target: '_blank' }, [
          option.label
        ])
      }
      return option.label
    },
    renderMenuIcon (option) {
      // return render placeholder for indent
      if (option.key === 'sheep-man') return true
      // return falsy, don't render icon placeholder
      if (option.key === 'food') return null
      return h(NIcon, null, { default: () => h(BookmarkOutline) })
    },
    expandIcon () {
      return h(NIcon, null, { default: () => h(CaretDownOutline) })
    },
  },
  methods:{
    renderIcon (icon) {
      return () => h(NIcon, null, { default: () => h(icon) })
    },
    getTodaysConcert(){
      getTodays().then(resp => {
        this.concert = resp.data;
      })
    },
    checkChapter(){
      getChap().then(resp => {
        this.chapter_number = resp.data.number
      }).finally(() => {
        setTimeout(this.checkChapter,1000)
      })
    },
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
      if(this.confirm)
      {
        this.confirm = false
      }
      else{
        this.confirm = true
        resetButton()
        deleteAllButtonPress()
      }
    },
    setNextTrue(){
      setNextTrue();
    },
    checkPass(pass){
      if(pass.length < 7) return
      unlockAdmin(pass).then(resp => {
        this.locked = !resp.data
      }).catch({

      })
    }
  },
  mounted() {
    this.checkChapter()
    this.getText()
    this.getTodaysConcert()
  }
}
</script>

<style scoped>
.fullscreen{
  font-family: Arial;
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
  font-size: 3vh;
  z-index: 100;
  width: 100%;
  padding: 1vh;
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
