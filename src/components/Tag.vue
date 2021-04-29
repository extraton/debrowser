<template>
  <div class="tag" ref="tab">
    <t-text v-if="element instanceof list.TextElement" :element="element"/>
    <t-menu v-else-if="element instanceof list.MenuElement" :element="element"/>
    <t-input v-else-if="element instanceof list.InputElement" :element="element"/>
    <t-input-amount v-else-if="element instanceof list.InputAmountElement" :element="element"/>
    <t-input-confirm v-else-if="element instanceof list.InputConfirmElement" :element="element"/>
    <t-fatal v-else-if="element instanceof list.FatalElement" :element="element"/>
    <t-input-address v-else-if="element instanceof list.InputAddressElement" :element="element"/>
    <t-input-number v-else-if="element instanceof list.InputNumberElement" :element="element"/>
    <t-select-key v-else-if="element instanceof list.SelectKeyElement" :element="element"/>
    <t-scan-qr-code v-else-if="element instanceof list.ScanQrCodeElement" :element="element"/>
    <div v-else v-text="$t('tag.unknown')"/>
  </div>
</template>

<script>
import tText from "@/components/tag/Text";
import tMenu from "@/components/tag/Menu";
import tInput from "@/components/tag/Input";
import tInputAmount from "@/components/tag/InputAmount";
import tInputConfirm from "@/components/tag/InputConfirm";
import tFatal from "@/components/tag/Fatal";
import tInputAddress from "@/components/tag/InputAddress";
import tInputNumber from "@/components/tag/InputNumber";
import tSelectKey from "@/components/tag/SelectKey";
import tScanQrCode from "@/components/tag/ScanQrCode";
import TextElement from "@/lib/browser/element/TextElement";
import MenuElement from "@/lib/browser/element/MenuElement";
import InputElement from "@/lib/browser/element/InputElement";
import InputAmountElement from "@/lib/browser/element/InputAmountElement";
import InputConfirmElement from "@/lib/browser/element/InputConfirmElement";
import FatalElement from "@/lib/browser/element/FatalElement";
import InputAddressElement from "@/lib/browser/element/InputAddressElement";
import InputNumberElement from "@/lib/browser/element/InputNumberElement";
import SelectKeyElement from "@/lib/browser/element/SelectKeyElement";
import ScanQrCodeElement from "@/lib/browser/element/ScanQrCodeElement";

export default {
  components: {
    tText,
    tMenu,
    tInput,
    tInputAmount,
    tInputConfirm,
    tFatal,
    tInputAddress,
    tInputNumber,
    tSelectKey,
    tScanQrCode
  },
  props: {element: Object},
  data: () => ({
    list: {
      TextElement,
      MenuElement,
      InputElement,
      InputAmountElement,
      InputConfirmElement,
      FatalElement,
      InputAddressElement,
      InputNumberElement,
      SelectKeyElement,
      ScanQrCodeElement
    },
  }),
  computed: {},
  async mounted() {
    setTimeout(function(){
      this.$refs.tab.scrollIntoView({behavior: 'smooth'});
    }.bind(this), 300);
  },
  methods: {}
}
</script>
<style lang="scss">
.tag {
  margin: 10px 0;

  > .v-card {
    max-width: 700px;
    margin: auto;
  }
}
</style>
