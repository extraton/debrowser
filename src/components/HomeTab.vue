<template>
  <div class="homeTab">
<!--    <div class="homeTab__item">-->
<!--      <v-btn class="mx-2" color="#ed732d" @click="setAddress({account: '0:ffeef12aafc3a2cf7db6f3fba1a5b381d2ff10efbc755a91e9b98333d490af6d', server: 'http://127.0.0.1'})"-->
<!--             x-large dark fab>-->
<!--        <v-icon x-large dark>-->
<!--          mdi-wallet-->
<!--        </v-icon>-->
<!--      </v-btn>-->
<!--      <div class="homeTab__item__title text-center subtitle-2">Multisig</div>-->
<!--    </div>-->
    <div class="homeTab__item">
      <v-btn class="mx-2" color="#ed732d"
             @click="setAddress({account: '0:81c12c2f4514124536aafea59db7df0262d3af877b4477afe6514bbc5bc9f317', server: 'net.ton.dev'})"
             x-large dark fab>
        <v-icon x-large dark>
          $vuetify.icons.coins
        </v-icon>
      </v-btn>
      <div class="homeTab__item__title text-center subtitle-2">TIP-3 Manager</div>
    </div>
<!--    <div class="homeTab__item">-->
<!--      <v-btn class="mx-2" color="#ff7163"-->
<!--             @click="setAddress({account: '0:a2c12d654183e5746bd15c13de82b0cf4f567ada705a828aa2d91199152fcd88', server: 'http://127.0.0.1'})"-->
<!--             x-large dark fab>-->
<!--        <v-icon x-large dark>-->
<!--          mdi-draw-->
<!--        </v-icon>-->
<!--      </v-btn>-->
<!--      <div class="homeTab__item__title text-center subtitle-2">DoD</div>-->
<!--    </div>-->
    <div class="homeTab__item">
      <v-btn class="mx-2" color="#5dcc89"
             @click="setAddress({account: '0:2a92e3d01c530697a0ec3ab5c3494474faa7ea0af5fa30d4ed508115bc9957a7', server: 'net.ton.dev'})"
             x-large dark fab>
        <v-icon x-large dark>
          mdi-wizard-hat
        </v-icon>
      </v-btn>
      <div class="homeTab__item__title text-center subtitle-2">Demiurge SMV</div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  components: {},
  props: {},
  data: () => ({}),
  computed: {},
  async mounted() {
  },
  methods: {
    ...mapActions('browser', ['setAddress']),
  }
}
</script>
<style lang="scss">
.homeTab {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  flex-wrap: wrap;

  &__item {
    width: 88px;
    margin: 0 10px;

    &__title {
      padding-top: 5px;
    }
  }
}
</style>
