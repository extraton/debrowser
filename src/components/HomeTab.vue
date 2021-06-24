<template>
  <div class="homeTab">
    <div v-for="(bot, i) in bots" :key="i" class="homeTab__item">
      <v-btn class="mx-2" :color="bot.color" @click="setAddress(bot.address)" x-large dark fab>
        <v-icon x-large dark>{{ bot.icon }}</v-icon>
      </v-btn>
      <div class="homeTab__item__title text-center subtitle-2">{{ bot.name }}</div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  components: {},
  props: {},
  data: () => ({
    bots: [
      {
        name: 'Interfaces Demo',
        address: {account: '0:16f2d38778dd31f67854939e95eb30438074ef4c43265d91bc54dfe94a031880', server: 'net.ton.dev'},
        color: '#ff7163',
        icon: 'mdi-eye',
      },
      {
        name: 'TIP-3 Manager',
        address: {account: '0:81c12c2f4514124536aafea59db7df0262d3af877b4477afe6514bbc5bc9f317', server: 'net.ton.dev'},
        color: '#ed732d',
        icon: '$vuetify.icons.coins',
      },
      {
        name: 'Demiurge SMV',
        address: {account: '0:2a92e3d01c530697a0ec3ab5c3494474faa7ea0af5fa30d4ed508115bc9957a7', server: 'net.ton.dev'},
        color: '#5dcc89',
        icon: 'mdi-wizard-hat',
      },
    ],
  }),
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
