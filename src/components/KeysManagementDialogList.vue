<template>
  <v-card class="keysManageDialogList">
    <v-card-title v-text="$t('keysManagement.title')"/>
    <v-divider></v-divider>
    <v-card-text>
      <v-simple-table class="keysManageDialogList__table">
        <template v-slot:default>
          <thead>
          <tr>
            <th v-text="$t('keysManagement.name')"/>
            <th v-text="$t('keysManagement.publicKey')"/>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in keys" :key="item.id">
            <td>{{ item.name }}</td>
            <td>
              <public-key :publicKey="item.keys.public" left/>
            </td>
            <td class="text-end">
              <v-btn @click="remove(item.id)" :disabled="1===item.id" small icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="text-center">
        <v-btn @click="$emit('add')" fab small>
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="changeOpen(false)" v-text="$t('keysManagement.close')"/>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapMutations, mapActions, mapState} from "vuex";
import PublicKey from "@/components/PublicKey";

export default {
  components: {PublicKey},
  props: {},
  data: () => ({}),
  computed: {
    ...mapState('keys', [
      'keys',
    ]),
  },
  async created() {
  },
  async mounted() {
  },
  methods: {
    ...mapMutations('keys', [
          'changeOpen'
        ]
    ),
    ...mapActions('keys', [
          'remove',
        ]
    ),
  }
}
</script>
<style lang="scss">
.keysManageDialogList {
  &__table {
    margin: 10px;
  }
}
</style>
