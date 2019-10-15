<template>
  <v-layout column fill-height class="home">
    <v-content>
      <v-app-bar fixed app>
        <v-btn icon @click="gotoHome">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{$t('search.title')}}</v-toolbar-title>
      </v-app-bar>
      <v-container fill-height fluid>
        <v-row>
          <v-col cols="12">
            <v-row 
              dense
              align="center"
              justify="center"
            >
              <v-col cols="6" class="pa-2">
                <v-card class="pa-6">
                  <v-row justify="center">
                    <v-badge>
                      <template v-slot:badge>{{validated}}</template>
                      <v-icon large class="pl-2 pr-2">
                        mdi-qrcode-scan
                      </v-icon>
                    </v-badge>
                  </v-row>    
                  <v-row justify="center">
                    Escaneados
                  </v-row>    
                </v-card>
              </v-col>
              <v-col cols="6" class="pa-2">
                <v-card class="pa-6">
                  <v-row justify="center">
                    <v-badge>
                      <template v-slot:badge>{{pendingValidations}}</template>
                      <v-icon large class="pl-2 pr-2">
                        mdi-clock
                      </v-icon>
                    </v-badge>
                  </v-row>    
                  <v-row justify="center">
                    Pendientes
                  </v-row>  
                </v-card>
              </v-col>
            </v-row>
            <v-row 
              dense
              align="center"
              justify="center"
            >
              <v-col cols="6" class="pa-2">
                <v-card class="pa-6">
                  <v-row justify="center">
                    <v-badge>
                      <template v-slot:badge>{{added}}</template>
                      <v-icon large class="pl-2 pr-2">
                        mdi-plus-box
                      </v-icon>
                    </v-badge>
                  </v-row>    
                  <v-row justify="center">
                    Añadidos
                  </v-row>    
                </v-card>
              </v-col>
              <v-col cols="6" class="pa-2">
                <v-card class="pa-6">
                  <v-row justify="center">
                    <v-badge>
                      <template v-slot:badge>{{all}}</template>
                      <v-icon large class="pl-2 pr-2">
                        mdi-collapse-all
                      </v-icon>
                    </v-badge>
                  </v-row>    
                  <v-row justify="center">
                    Todos
                  </v-row>  
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-layout>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    data: () => ({
    }),
    computed: {
      ...mapState('magasin',{
        magasins: state => state.magasins,
        isLoading: state => state.isLoading
      }),
      validated(){
        return this.magasins != undefined ? (this.magasins.filter(magasin => {
          return magasin.validated && !magasin.added;
        }).length) : 0;
      },
      pendingValidations(){
        return this.magasins != undefined ? (this.magasins.filter(magasin => {
          return !magasin.validated
        }).length) : 0;
      },
      added(){
        return this.magasins != undefined ? (this.magasins.filter(magasin => {
          return magasin.added;
        }).length) : 0;
      },
      all(){
        return this.magasins != undefined ? this.magasins.length : 0;
      },
    },
    methods: {
      ...mapActions('magasin',{
        getMagasins: 'getMagasins'
      }),
      gotoHome() {
        this.$router.push({name: 'home'})
      }
    },
    created () {
      this.getMagasins()
    }
  };
</script>
