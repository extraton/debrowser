<template>
  <v-card class="tScanQrCode">
    <v-dialog v-model="cameraDialog" max-width="500" persistent>
      <v-card>
        <v-card-title v-text="$t('tag.scanQrCode.scan')"/>
        <v-card-text>
          <qrcode-stream v-if="cameraDialog" @init="onInitStream" @detect="onDetect">
            <div v-if="!cameraInited" v-text="$t('tag.scanQrCode.allowCamera')"/>
          </qrcode-stream>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="cameraDialog=false" text v-text="$t('tag.scanQrCode.cancel')"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-subtitle v-text="$t('tag.scanQrCode.title')"/>
    <v-card-text class="text-center">
      <qrcode-capture @detect="onDetect" :multiple="false" class="tScanQrCode__uploadInput" ref="upload"/>
      <qrcode-drop-zone @detect="onDetect" @dragover="onDragOver" @init="logErrors">
        <div class="tScanQrCode__dropArea" :class="{ 'dragover': dragover }">
          <div class="text-h6" v-text="$t('tag.scanQrCode.drop')"/>
          <div class="text-h6" v-text="$t('tag.scanQrCode.or')"/>
          <div class="tScanQrCode__dropArea__buttons">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" @click="upload" :disabled="element.isUsed" color="primary"
                       large fab>
                  <v-icon large>mdi-upload</v-icon>
                </v-btn>
              </template>
              <span v-text="$t('tag.scanQrCode.upload')"/>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" @click="cameraDialog=true" :disabled="element.isUsed" color="primary" large fab>
                  <v-icon large>mdi-qrcode-scan</v-icon>
                </v-btn>
              </template>
              <span v-text="$t('tag.scanQrCode.scan')"/>
            </v-tooltip>
          </div>
        </div>
      </qrcode-drop-zone>
    </v-card-text>
  </v-card>
</template>

<script>
import {QrcodeDropZone, QrcodeCapture, QrcodeStream} from "vue-qrcode-reader";
import Enc from "@root/encoding";

export default {
  components: {QrcodeDropZone, QrcodeCapture, QrcodeStream},
  props: {element: Object},
  data: () => ({
    dragover: false,
    cameraDialog: false,
    cameraInited: false,
  }),
  computed: {},
  async mounted() {},
  methods: {
    async onInitStream(promise) {
      try {
        /*const { capabilities } = */
        await promise;
        this.cameraInited = true;
      } catch (error) {
        this.$snack.danger({text: `${this.$t('tag.scanQrCode.error')} ${error.name}`});
      }

    },
    upload() {
      this.$refs.upload.$el.click();
    },
    async onDetect(promise) {
      if (!this.element.isUsed) {
        try {
          const {content} = await promise;
          if (null === content) {
            this.$snack.danger({text: this.$t('tag.scanQrCode.couldNotRecognize')});
          } else {
            this.apply(content);
          }
          this.cameraDialog = false;
          this.cameraInited = false;
        } catch (error) {
          this.$snack.danger({text: `${this.$t('tag.scanQrCode.error')} ${error.name}`});
        }
      }
    },
    apply(value) {
      this.element.setUsed();
      this.element.tab.execute(this.element.inputMsg, this.element.answerId, this.element.tab.epoch, {value: Enc.strToHex(value)});
    },
    logErrors(promise) {
      promise.catch(console.error)
    },
    onDragOver(isDraggingOver) {
      this.dragover = isDraggingOver
    }
  }
}
</script>
<style lang="scss">
.tScanQrCode {
  &__uploadInput {
    display: none;
  }

  &__dropArea {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    align-items: center;
    height: 300px;
    border: 3px dashed #808080;

    &__buttons {
      display: flex;
      justify-content: space-evenly;
      width: 100%;
    }
  }

  .drop-error {
    color: red;
    font-weight: bold;
  }
}
</style>
