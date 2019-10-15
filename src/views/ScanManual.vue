<template>
  <v-layout column fill-height class="home">
    <v-content>
      <v-app-bar fixed app>
        <v-btn icon @click="gotoHome">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{$t('scanmanual.title')}}</v-toolbar-title>
      </v-app-bar>
      <v-row 
        dense
        align="center"
        justify="center"
        class="pa-2"
      >
        <v-col cols="2" xs="2" lg="1" class="pa-2" v-for="item in magasins" :key="item.id">
          <v-card class="pa-6" @click="preselectItem(item)" @click.stop="dialog = true" :color="item.validated ? 'success' : ''">
            <v-row justify="center">
              {{item.id}}
            </v-row>    
          </v-card>
        </v-col>
      </v-row>
    </v-content>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Validación de entrada</v-card-title>
        <v-card-text>
          ¿Esta seguro que desea validar la entrada {{this.item != null ? this.item.id : 0}} ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="success"
            text
            @click="selectItem"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { mapState, mapActions } from 'vuex';
  
export default {
  data: () => ({
    dialog: false,
    valid: true,
    item: null,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    observations: '',
    lazy: false,
  }),

  computed: {
    ...mapState('magasin',{
      magasins: state => state.magasins,
      isLoading: state => state.isLoading
    }),
    number(){
      return this.magasins != undefined ? this.magasins[this.magasins.length -1].id + 1 : 1;
    },
  },

  methods: {
    gotoHome() {
      this.$router.push({name: 'home'})
    },
    preselectItem(item){
      this.dialog = true;
      this.item = item;
    },
    async selectItem(){
      this.item.validated = true;
      await this.timeout(2000);
      this.dialog = false
      this.gotoHome();
    },
    save () {
      if (this.$refs.form.validate()) {
        this.gotoHome();
      }
    },
    ...mapActions('magasin',{
      getMagasins: 'getMagasins'
    }),
    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    },
  },
  created () {
    this.getMagasins();
  },
      
};
</script>
