<template>
  <v-dialog content-class="keysManageDialog" v-model="isOpen" max-width="500" :persistent="page==='add'">
    <keys-management-dialog-list v-if="page==='main'" @add="page='add'"/>
    <keys-management-dialog-add v-else-if="page==='add'" @back="page='main'"/>
  </v-dialog>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import KeysManagementDialogList from "@/components/KeysManagementDialogList";
import KeysManagementDialogAdd from "@/components/KeysManagementDialogAdd";

export default {
  components: {KeysManagementDialogAdd, KeysManagementDialogList},
  props: {},
  data: () => ({
    page: 'main'
  }),
  computed: {
    ...mapState('keys', [
      'dialog',
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
    ...mapMutations('keys', [
          'changeOpen'
        ]
    ),
  }
}
</script>
<style lang="scss">
.keysManageDialog {
  &__table {
    margin: 10px;
  }
}
</style>
