<template>
  <v-layout column fill-height class="magasin">
    <v-content>
      <v-app-bar fixed app>
        <v-btn icon @click="gotoHome">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{$t('ticket.title')}}</v-toolbar-title>
        <v-text-field
          :placeholder="$t('ticket.search')"
          append-icon="mdi-magnify"
          v-model="search"
          class="pl-2"
          hide-details
          clearable
        ></v-text-field>
        <v-badge class="ml-4 mr-4"
          >
          <template v-slot:badge>{{pendingValidations}}</template>
          <v-icon 
            :color="pendingValidations > 0 ? 'warning' : 'success'"
            >mdi-account</v-icon>
        </v-badge>
      </v-app-bar>
      <v-layout row v-if="isLoading">
        <v-flex xs12 pt-4>
          <v-layout
            row
            justify-center
            align-center
          > 
            <v-progress-circular
              indeterminate
              :size="70"
              color="primary"
            ></v-progress-circular>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-list v-if="!isLoading && filteredItems.length > 0">
        <v-list-item-group color="primary">
          <v-list-item
            v-for="item in filteredItems"
            :key="item.id"
            @click="selectItem(item)"
          >
            <v-list-item-icon>
              <v-icon :color="item.validated ? 'success' : ''">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="$t('ticket.label') + ' ' + item.id"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-list disabled v-if="!isLoading && filteredItems.length == 0">
        <v-subheader>Invitacion no encontrada</v-subheader>
      </v-list>

    </v-content>
  </v-layout>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    data: () => ({
      search: '',
      item: null,
    }),
    methods: {
      gotoHome() {
        this.$router.push({name: 'home'})
      },
      selectItem(item){
        item.validated = true;
      },
      selectMagasin(selectedMagasin){
        const id = selectedMagasin.id;
        const formatedId = '00000'.substr(0, ('00000'.length - id.toString().length ) ) +id;
        const sitePartyNumber = '007' + formatedId + formatedId;
        const name = selectedMagasin.name.toLowerCase();
        const magasin = {id : sitePartyNumber, name : name, site: selectedMagasin.site};
        this.setUserMagasin(magasin);
        this.$router.push({name: 'home'});
      },
      ...mapActions('magasin',{
        getMagasins: 'getMagasins'
      }),
      ...mapActions('account',{
        setUserMagasin: 'setUserMagasin'
      })
    },
    computed: {
      ...mapState('magasin',{
        magasins: state => state.magasins,
        isLoading: state => state.isLoading
      }),
      pendingValidations(){
        return this.magasins != undefined ? (this.magasins.filter(magasin => {
          return !magasin.validated
        }).length) : 0;
      },
      filteredItems() {
        if (this.magasins == undefined){
          return [];
        }

        return this.magasins.filter(magasin => {
          return (magasin.id.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1)
          || (magasin.name.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1)
        })
        
      }
    },
    created () {
      this.getMagasins()
    },
  };
</script>
