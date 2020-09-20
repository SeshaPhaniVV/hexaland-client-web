<template>
  <div class="hex-grid">
    <h2>Hexaland</h2>
    <hex-grid width="100%" height="100%" viewBox="-100 -100 300 400">
      <layout :size="hexagonSize" :flat="true" :spacing="1" :origin="{ x: 50, y: 50 }">
        <hexagon v-for="(hex, i) in moreHexas" :key="i" :q="hex.q" :r="hex.r" :s="hex.s">
          <TextComponent>{{ hex.q }} {{ hex.r }} {{ hex.name }}</TextComponent>
        </hexagon>
      </layout>
    </hex-grid>
  </div>
</template>

<script>
import { HexGrid, Layout, Hexagon, Text } from 'vue-hexgrid';
import Hex from '@/models/Hex';

export default {
  name: 'Hexgrid',
  components: {
    HexGrid,
    Layout,
    Hexagon,
    TextComponent: Text,
  },
  props: {
    hexagons: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      hexagonSize: {
        x: 10,
        y: 10,
      },
      moreHexas: null,
    };
  },
  static: {
    positionMap: {
      0: [0, -1],
      1: [1, -1],
      2: [1, 0],
      3: [0, 1],
      4: [-1, 1],
      5: [-1, 0],
    },
  },
  created() {
    this.moreHexas = this.hexagons.map((hex) => new Hex(Number(hex[0]), Number(hex[1]), 1, hex[2]));
  },
  methods: {
    generateHex(val1, val2, val3) {
      return new Hex(val1, val2, val3);
    },
  },
};
</script>

<style lang="scss">
svg {
  g {
    fill: #030303;
    fill-opacity: 0.6;
    &:hover {
      fill: #7be3f6;
      fill-opacity: 0.7;
      text {
        fill-opacity: 1;
      }
    }

    polygon {
      stroke: #7be3f6;
      stroke-width: 0.5;
      transition: fill-opacity 0.5s;
    }
    text {
      font-size: 0.2em;
      fill: white;
      fill-opacity: 0.7;
      transition: fill-opacity 0.5s;
    }
  }
}

.hex-grid {
  text-align: center;
}

[draggable] {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -moz-user-drag: element;
  -webkit-user-drag: element;
  -khtml-user-drag: element;
  user-drag: element;
}
</style>
