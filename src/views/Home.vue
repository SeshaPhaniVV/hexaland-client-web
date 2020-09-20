<template>
  <div class="home">
    <HexaLand />
  </div>
</template>

<script>
import HexaLand from '@/components/HexaLand.vue';

export default {
  name: 'Home',
  components: {
    HexaLand,
  },
};
</script>

<style scoped lang="scss">
.home {
  padding: 50px;
}
</style>
