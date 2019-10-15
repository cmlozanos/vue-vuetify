<template>
  <v-layout column fill-height class="home">
    <v-content>
      <v-app-bar fixed app>
        <v-btn icon @click="gotoHome">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{$t('add.title')}}</v-toolbar-title>
      </v-app-bar>
      <v-row 
        dense
        align="center"
        justify="center"
      >
        <v-col cols="10" class="pa-2">
          <v-form
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
          >
            <v-text-field
              v-model="number"
              label="Numero de entrada"
              readonly
              disabled
            ></v-text-field>

            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="Nombre"
              required
              clearable
            ></v-text-field>

            <v-textarea
              name="input-7-1"
              label="Observaciones"
              v-model="observations"
              hint="Hint text"
              clearable
            ></v-textarea>

            <v-row
                          dense
              align="center"
              justify="center"
            >
              <v-col cols="6">
                <v-btn
                  :disabled="!valid"
                  color="success"
                  block
                  @click="save"
                >
                  Guardar
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  color="error"
                  block
                  @click="gotoHome"
                >
                  Cancelar
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-content>
  </v-layout>
</template>
<script>
import { mapState, mapActions } from 'vuex';
  
export default {
  data: () => ({
    valid: true,
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
    save () {
      if (this.$refs.form.validate()) {
        this.gotoHome();
      }
    },
    ...mapActions('magasin',{
      getMagasins: 'getMagasins'
    }),
  },
  created () {
    this.getMagasins();
  },
      
};
</script>
