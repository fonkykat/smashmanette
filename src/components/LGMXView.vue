<template>
  <diag-manette @pass="checkPass" v-if="locked" :send="false"></diag-manette>
  <n-grid class="fullscreen" v-else :cols="12">
    <n-gi :span="12">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    </n-gi>
    <n-gi :span="12" v-if="activeKey === 'home'">
      <h1>Accueil</h1>
      <p>Là y'a rien</p>
    </n-gi>
    <n-gi :span="12" v-if="activeKey === 'songs'">
      <n-grid :cols="12">
      <n-gi :span="4"></n-gi>
        <n-gi :span="4">
        <h1>Liste des Morceaux</h1>
        </n-gi>
        <n-gi :span="2"></n-gi>
        <n-gi :span="2">
          <n-button @click="showDrawer=true">Nouveau Morceau</n-button>
        </n-gi>
      </n-grid>
      <n-drawer v-model:show="showDrawer" :width="300">
        <n-drawer-content>
          <template #header>
            Modifier le Morceau
          </template>
          <n-form
              ref="formRef"
              :label-width="80"
              :model="songEdit"
              :size="size"
          >
            <n-form-item label="Titre" path="songEdit.title">
              <n-input v-model:value="songEdit.title" placeholder="Titre du morceau" />
            </n-form-item>
            <n-form-item label="Tempo" path="songEdit.bpm">
              <n-input v-model:value="songEdit.bpm" type="number" placeholder="Bpm" />
            </n-form-item>
            <n-form-item label="Couleur 1" path="songEdit.color1">
              <n-input v-model:value="songEdit.color1" placeholder="Couleur 1" />
            </n-form-item>
            <n-form-item label="Couleur 2" path="songEdit.color2">
              <n-input v-model:value="songEdit.color2" placeholder="Couleur 2" />
            </n-form-item>
            <n-checkbox v-model:checked="songEdit.synchro">
              Anim synchro avec la musique
            </n-checkbox>
          </n-form>
          <template #footer>
            <n-button @click="saveSong">Enregistrer</n-button>
          </template>
        </n-drawer-content>
      </n-drawer>
      <n-grid :x-gap="12" :y-gap="8" cols="2 s:3 m:4 l:6 xl:12" responsive="screen">
        <n-gi class="card" :span="3" v-for="s in songs" :key="s.id">
          <n-card class="song_card" :title="s.title">
            <template #header-extra>
              {{s.bpm}}bpm
            </template>
            <n-grid :cols="3">
              <n-gi>
                <h4>Couleur : </h4>
              </n-gi>
              <n-gi>
                <p>{{s.color1}}</p>
              </n-gi>
              <n-gi>
                <p>{{s.color2}}</p>
              </n-gi>
              <n-gi>
                <h4>Sync : </h4>
              </n-gi>
              <n-gi>
                <p>{{s.synchro ? 'Oui':'Non'}}</p>
              </n-gi>
            </n-grid>
            <template #footer>
            </template>
            <template #action>
              <n-button @click="editCard(s)">Edit</n-button>
            </template>
          </n-card>
        </n-gi>
      </n-grid>
    </n-gi>
    <n-gi :span="12" v-if="activeKey === 'params'">
      <p>Là non plus</p>
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
import {unlockLGMX} from "@/services/buttonService";
// import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import DiagManette from "@/components/gamepads/DiagManette.vue";
import {NIcon, NMenu, NButton, NGrid, NGi, NCard, NDrawer, NDrawerContent, NForm, NFormItem, NInput, NCheckbox} from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from '@vicons/ionicons5'
import {Home as HomeIcon,
  MusicalNote as NoteIcon} from "@vicons/ionicons5";
import {Cogs as CogIcon} from "@vicons/fa";

import { h } from 'vue'
import {getSongs, editSong, addSong} from "@/services/lgmxService";

export default {
  name: "LGMXView",
  components: {DiagManette, NMenu, NButton, NGrid, NGi, NCard, NDrawer, NDrawerContent, NForm, NFormItem, NInput, NCheckbox},
  data() {
    return {
      locked: false,
      confirm: true,
      activeKey : 'songs',
      showDrawer: false,
      songEdit: {},
      songs: {},
      rules: {
        songEdit: {
          title: {
            required: true,
            message: 'Le morceau doit avoir un nom',
            trigger: 'blur'
          },
          bpm: {
            required: true,
            message: 'Le morceau doit avoir un tempo',
            trigger: ['input', 'blur']
          }
        },
      },
      menuOptions: [
        {
          key: 'home',
          icon: this.renderIcon(HomeIcon)
        },
        {
          key: 'songs',
          icon: this.renderIcon(NoteIcon)
        },
        {
          key: 'params',
          icon: this.renderIcon(CogIcon)
        },0.
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
    editCard(song){
      this.showDrawer = true
      this.songEdit = song
    },
    saveSong(){
      if(this.songEdit.id == null)
      {
        addSong(this.songEdit).then(resp => {
          this.songs.add(resp.data)
          this.songEdit = {}
          this.showDrawer = false
        })
      }
      else
      {
        editSong(this.songEdit, this.songEdit.id).then(resp => {
          console.log(resp.data)
          this.songEdit = {}
          this.showDrawer = false
        })
      }
    },
    getSongs(){
      getSongs().then(resp => {
        this.songs = resp.data
      })
    },
    checkPass(pass){
      unlockLGMX(pass).then(resp => {
        this.locked = !resp.data
      }).catch({

      })
    }
  },
  mounted() {
    this.getSongs()
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


.admin_text p{
  font-family: "Arial", Helvetica;
  width: 90%;
}
</style>
