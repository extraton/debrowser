<template>
  <v-dialog content-class="approveDialog" v-model="isOpen" max-width="500" persistent>
    <v-card v-if="isOpen">
      <v-card-title v-text="$t('approveDialog.title')"/>
      <v-divider></v-divider>
      <v-card-text class="approveDialog__content">
        <div v-if="'Transaction' === activity.type">
          <v-simple-table class="approveDialog__info">
            <tbody>
            <tr>
              <td class="subtitle-2 text-end" v-text="$t('approveDialog.type')"/>
              <td>{{ activity.type }}</td>
            </tr>
            <tr>
              <td class="subtitle-2 text-end" v-text="$t('approveDialog.dst')"/>
              <td>
                <addr :address="activity.dst" left/>
              </td>
            </tr>
            <tr>
              <td class="subtitle-2 text-end" v-text="$t('approveDialog.fee')"/>
              <td>
                <amount :nano="activity.fee.toString()"/>
              </td>
            </tr>
            </tbody>
          </v-simple-table>
          <template v-if="activity.out.length > 0">
            <div class="text-h6" v-text="$t('approveDialog.outs')"/>
            <v-simple-table class="approveDialog__outs">
              <thead>
              <tr>
                <th v-text="$t('approveDialog.amount')"/>
                <th v-text="$t('approveDialog.dst1')"/>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, i) in activity.out" :key="i">
                <td>
                  <amount :nano="item.amount.toString()"/>
                </td>
                <td>
                  <addr :address="item.dst" left/>
                </td>
              </tr>
              </tbody>
            </v-simple-table>
          </template>
        </div>
        <v-alert v-else type="error" outlined v-text="$t('approveDialog.unknown')"/>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="cancel" color="error" text v-text="$t('approveDialog.reject')"/>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="approve" v-text="$t('approveDialog.approve')"/>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapMutations, mapState, mapActions} from "vuex";
import Addr from "@/components/Addr";
import Amount from "@/components/Amount";

export default {
  components: {Amount, Addr},
  props: {},
  data: () => ({}),
  computed: {
    ...mapState('approve', [
      'dialog',
      'activity',
    ]),
    isOpen: {
      get() {
        return this.dialog;
      },
      set(val) {
        this.changeOpen(val);
      }
    }
  },
  async mounted() {
  },
  methods: {
    ...mapMutations('approve', [
          'changeOpen',
        ]
    ),
    ...mapActions('approve', [
          'approve',
          'cancel',
        ]
    ),
  }
}
</script>
<style lang="scss">
.approveDialog {
  &__content {
    //padding-top: 20px !important;
  }

  &__table {
    margin: 10px;
  }
}
</style>
