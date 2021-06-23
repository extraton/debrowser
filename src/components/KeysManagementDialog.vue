<template>
  <v-dialog content-class="keysManageDialog" v-model="isOpen" max-width="700" :persistent="page==='add'">
    <keys-management-dialog-list v-if="page==='main'" @add="toAdd" @edit="toEdit"/>
    <keys-management-dialog-form v-else-if="page==='add'" :edit-id="editId" @back="page='main'"/>
  </v-dialog>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import KeysManagementDialogList from "@/components/KeysManagementDialogList";
import KeysManagementDialogForm from "@/components/KeysManagementDialogForm";

export default {
  components: {KeysManagementDialogForm, KeysManagementDialogList},
  props: {},
  data: () => ({
    page: 'main',
    editId: null,
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
    toAdd() {
      this.editId = null;
      this.page='add';
    },
    toEdit(id) {
      this.editId = id;
      this.page='add';
    },
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
