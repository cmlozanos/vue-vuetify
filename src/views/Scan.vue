<template>
  <v-layout column fill-height class="home">
    <v-content>
      <v-app-bar fixed app>
        <v-btn icon @click="gotoHome">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{$t('scan.title')}}</v-toolbar-title>
      </v-app-bar>
      <v-container fill-height fluid>
        <v-row 
          dense
          align="center"
          justify="center"
        >
          <v-col cols="12" class="pa-2">
            <v-card class="pa-6">
              <qrcode-drop-zone @decode="onDecode" @init="logErrors">
                <qrcode-stream 
                    :camera="camera" 
                    :track="this.paintBlueDots"
                    @decode="onDecode" @init="onInit">
                  <div v-if="validationSuccess" class="validation-success">
                    {{$t('scan.ticket.valid')}}
                  </div>

                  <div v-if="validationFailure" class="validation-failure">
                    {{$t('scan.ticket.invalid')}}
                  </div>

                  <div v-if="validationPending" class="validation-pending">
                    {{$t('scan.ticket.validating')}}
                  </div>
                </qrcode-stream>
              </qrcode-drop-zone>

              <qrcode-capture v-if="noStreamApiSupport" @decode="onDecode" />
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-btn block color="info" @click="gotoManual" dark>{{$t('scan.ticket.manual')}}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-layout>
</template>
<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, .8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
</style>

<script>
  import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
  
  export default {
    components: { QrcodeStream, QrcodeDropZone, QrcodeCapture },
      data () {
    return {
      isValid: undefined,
      camera: 'auto',
      result: null,
      noStreamApiSupport: false
    }
  },

  computed: {
    validationPending () {
      return this.isValid === undefined
        && this.camera === 'off'
    },

    validationSuccess () {
      return this.isValid === true
    },

    validationFailure () {
      return this.isValid === false
    }
  },

  methods: {

    gotoManual() {
      this.$router.push({name: 'scanmanual'})
    },

    gotoHome() {
      this.$router.push({name: 'home'})
    },
    
    async onInit (promise) {
      try {
        await promise.then(this.resetValidationState)
      } catch (error) {
        if (error.name === 'StreamApiNotSupportedError') {
          this.noStreamApiSupport = true
        }
      }
    },
    logErrors (promise) {
      promise.catch(console.error)
    },

    resetValidationState () {
      this.isValid = undefined
    },

    async onDecode (content) {
      this.result = content
      this.turnCameraOff()

      // pretend it's taking really long
      await this.timeout(3000)
      //const word = 'icaba';
      const word = '';
      this.isValid = content.startsWith(word) && !isNaN(content.substr(word.length, content.length));
      // some more delay, so users have time to read the message
      await this.timeout(2000)
      if (this.isValid){
        this.result = content.substr(word.length, content.length);
        this.gotoHome();
      }else{
        this.turnCameraOn()
      }
    },
    turnCameraOn () {
      this.camera = 'auto'
    },

    turnCameraOff () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    },
    paintBlueDots (location, ctx) {
      const {
        topLeftFinderPattern,
        topRightFinderPattern,
        bottomLeftFinderPattern
      } = location

      const pointArray = [
        topLeftFinderPattern,
        topRightFinderPattern,
        bottomLeftFinderPattern
      ]

      ctx.fillStyle = '#007bff'

      pointArray.forEach(({ x, y }) => {
        ctx.fillRect(x - 5, y - 5, 10, 10)
      })
    }
  }
      
  };
</script>
