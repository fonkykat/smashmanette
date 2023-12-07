<template>
  <diag-manette @pass="checkPass" v-if="locked" :send="false"></diag-manette>
  <n-grid class="fullscreen" v-else :cols="12">
    <n-gi :span="12">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    </n-gi>
    <n-gi :span="12">
      <h1>INITITALISATION CONCERT</h1>
      <n-grid class="forms" v-if="current = 1" :cols="6">
        <n-gi :span="2">
          <n-space class="steps" vertical>
            <n-steps vertical :current="current" :status="currentStatus">
              <n-step
                  title="Nom du concert"
              />
              <n-step
                  title="Choix des premiers morceaux"
              />
              <n-step
                  title="Come Together"
              />
              <n-step
                  title="Something"
              />
              <n-step
                  title="Anything"
              />
            </n-steps>
          </n-space>
        </n-gi>
        <n-gi :span="2">
          <n-form
              ref="formRef"
              :label-width="80"
              :model="songEdit"
              :size="size"
          >
            <n-form-item label="Nom du Public" path="concert.name">
              <n-input v-model:value="concert.name" placeholder="Nom du Public" />
            </n-form-item>
            <n-form-item label="Lieu du concert" path="concert.location">
              <n-input v-model:value="concert.location" type="number" placeholder="Lieu du Concert" />
            </n-form-item>
          </n-form>
        </n-gi>
        <n-gi :span="2"></n-gi>
        <n-gi :span="2"></n-gi>
        <n-gi><n-button v-if="current > 1" @click="current--">Retour</n-button></n-gi>
        <n-gi><n-button @click="current++">Continuer</n-button></n-gi>
        <n-gi :span="2"></n-gi>
        <n-button>Suivant</n-button>
      </n-grid>
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
import {NIcon, NMenu, NButton, NGrid, NGi, NSpace, NStep, NSteps, NForm, NFormItem, NInput} from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from '@vicons/ionicons5'
import {Home as HomeIcon,
  Book as BookIcon} from "@vicons/ionicons5";
import {Cogs as CogIcon} from "@vicons/fa";

import { h } from 'vue'

export default {
  name: "AdminView",
  components: {DiagManette, NMenu, NButton, NGrid, NGi, NSpace, NStep, NSteps,NForm, NFormItem, NInput},
  data() {
    return {
      locked: false,
      chapter_number: 0,
      text: '',
      confirm: true,
      concert: {},
      activeKey : 0,
      current: 1,
      currentStatus: 'process',
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

.steps{
  margin-left: 2vw;
  margin-right: 2vw;
}

.forms{
  margin-top: 10vh;
}

.admin_text p{
  font-family: "Arial", Helvetica;
  width: 90%;
}
</style>
