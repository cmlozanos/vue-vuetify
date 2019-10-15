<template>
  <v-layout column fill-height class="home">
    <v-content>
      <v-app-bar fixed app>
        <v-btn icon >
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-toolbar-title>{{$t('home.title')}}</v-toolbar-title>
      </v-app-bar>
      <v-container fill-height fluid>
        <v-row 
          dense
          align="center"
          justify="center"
        >
          <v-col cols="4" class="pa-2">
            <v-card class="pa-6" @click="gotoScan">
              <v-row justify="center">
                <v-icon large>
                  mdi-qrcode-scan
                </v-icon>
              </v-row>    
              <v-row justify="center">
                Escanear
              </v-row>    
            </v-card>
          </v-col>
          <v-col cols="4" class="pa-2">
            <v-card class="pa-6" @click="gotoAdd">
              <v-row justify="center">
                <v-icon large>
                  mdi-plus-box
                </v-icon>
              </v-row>    
              <v-row justify="center">
                Añadir
              </v-row>  
            </v-card>
          </v-col>
          <v-col cols="4" class="pa-2">
            <v-card class="pa-6" @click="gotoSearch">
              <v-row justify="center">
                <v-icon large>
                  mdi-magnify
                </v-icon>
              </v-row>    
              <v-row justify="center">
                Consultar
              </v-row>  
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
    }),
    methods: {
      gotoScan() {
        this.$router.push({name: 'scan'})
      },
      gotoAdd() {
        this.$router.push({name: 'add'})
      },
      gotoSearch() {
        this.$router.push({name: 'search'})
      }
    }
  };
</script>
