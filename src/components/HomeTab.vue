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
        address: {account: '0:5e4380c442b9cf09c113367e6f4c74b715d3826c57323491d7a1efc1c36c9ce9', server: 'net.ton.dev'},
        color: '#ff7163',
        icon: 'mdi-eye',
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
