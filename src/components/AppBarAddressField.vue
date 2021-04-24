<template>
  <v-text-field v-model="internalAddress" @keydown.enter="onAddressInput(internalAddress)" class="appBarAddressField"
                :placeholder="$t('appBar.address.placeholder')" filled outlined dense hide-details rounded>
    <template v-slot:prepend-inner>
      <span :class="serverClasses">{{ address.server }}</span>
    </template>
    <template v-slot:prepend>
      <v-btn @click="refresh" small icon>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-btn @click="goHome" small icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </template>
    <template v-slot:append>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" small icon>
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
        </template>
        <span class="subtitle-1" v-text="$t('appBar.address.tip.title')"/>
        <br/><span class="text-overline" v-text="$t('appBar.address.tip.format')"/>
        <br/>
        <br/><span class="subtitle-2" v-text="$t('appBar.address.tip.main')"/>
        <br/><span class="text-overline">0:2cf3ba...</span>
        <br/><span class="subtitle-2" v-text="$t('appBar.address.tip.test')"/>
        <br/><span class="text-overline">net.ton.dev/0:2cf3ba...</span>
        <br/><span class="subtitle-2" v-text="$t('appBar.address.tip.local')"/>
        <br/><span class="text-overline">http://127.0.0.1/0:2cf3ba...</span>
      </v-tooltip>
    </template>
    <!--    <template v-slot:append>-->
    <!--      <v-btn small icon>-->
    <!--        <v-icon>mdi-star</v-icon>-->
    <!--      </v-btn>-->
    <!--    </template>-->
  </v-text-field>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import tonApi from "@/api/ton";

export default {
  components: {},
  props: {},
  data: () => ({
    internalAddress: '',
  }),
  watch: {
    address(value) {
      this.internalAddress = value.account;
    }
  },
  computed: {
    ...mapGetters('browser', ['address']),
    serverClasses() {
      return [
        'appBarAddressField__server',
        {'appBarAddressField__server--unknown': this.address.server !== tonApi.serverDefault},
      ]
    },
  },
  async mounted() {
  },
  methods: {
    ...mapActions('browser', [
      'goHome',
      'refresh',
      'onAddressInput',
    ]),
    backspace() {
      //@TODO delete server
    }
  }
}

</script>
<style lang="scss">
.appBarAddressField {
  width: 100%;
  margin-top: 7px !important;

  input {
    padding-top: 10px !important;
  }

  &__server {
    color: #05b3fb;
    font-weight: bold;
    margin-top: 5px !important;

    &--unknown {
      color: #fbd205;
    }
  }

  .v-input__append-inner {
    margin-top: 6px !important;
  }

  .v-input__prepend-outer {
    margin-top: 6px !important;

    .v-btn {
      margin-right: 3px;
    }

    .v-btn:last-child {
      margin-right: 0;
    }
  }
}
</style>
