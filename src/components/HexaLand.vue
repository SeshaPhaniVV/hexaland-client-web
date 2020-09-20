<template>
  <div>
    <b-spinner v-if="loadingData" variant="primary" label="Spinning"></b-spinner>
    <div v-else class="d-flex">
      <b-col cols="3">
        <ActionCard @refresh-data="refreshData"></ActionCard>
      </b-col>
      <b-col>
        <HexGrid :hexagons="hexagons"></HexGrid>
      </b-col>
    </div>
  </div>
</template>

<script>
import ActionCard from '@/components/ActionCard';
import HexGrid from '@/components/Hexgrid';
import HexaLandService from '@/services/HexaLandService';

export default {
  name: 'HexaLand',
  components: { ActionCard, HexGrid },
  data() {
    return {
      hexagons: [],
      loadingData: true,
    };
  },
  methods: {
    async initialise() {
      const response = await HexaLandService.getList();
      this.hexagons = response.data.data.map((hex) => {
        let coords = hex['coords'].split(',');
        coords.push(hex.name);
        return coords;
      });
      this.loadingData = false;
    },
    refreshData() {
      this.loadingData = true;
      this.initialise();
    },
  },
  mounted() {
    this.initialise();
  },
};
</script>
