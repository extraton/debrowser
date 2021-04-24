import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import TonCrystalIcon from "@/components/icons/TonCrystalIcon";
import CoinsIcon from "@/components/icons/CoinsIcon";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: '#184059',
        bar: '#184059',
        secondary: '#5D8AA6',
        // info: '#D7D7D9',
        warning: '#BF7B3F',
        error: '#8c2f1b',
      },
      dark: {
        primary: '#2196f3',
        bar: '#272727',
        secondary: '#5D8AA6',
        // info: '#D7D7D9',
        warning: '#BF7B3F',
        error: '#ff5252',
      },
    },
  },
  icons: {
    values: {
      tonCrystal: {
        component: TonCrystalIcon,
      },
      coins: {
        component: CoinsIcon,
      },
    },
  },
});
