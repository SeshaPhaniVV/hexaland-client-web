<template>
  <div>
    <div class="font-weight-bold text-center mb-2">Perform Action</div>
    <b-form>
      <b-form-group id="input-group-1" label-for="input-3" :description="getDescriptionText()">
        <b-form-select id="input-1" v-model="action" :options="actions" required></b-form-select>
      </b-form-group>
      <b-form-group description="Name of the hexagon">
        <label class="sr-only" for="inline-form-input-name">Name</label>
        <b-input
          v-model="name"
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Name"
        ></b-input>
      </b-form-group>
      <b-form-group v-if="isAddAction" description="Name of the neighbor hexagon">
        <label class="sr-only" for="inline-form-input-neighbor">Neighbor</label>
        <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
          <b-input
            v-model="neighbor"
            id="inline-form-input-neighbor"
            placeholder="Neighbor"
          ></b-input>
        </b-input-group>
      </b-form-group>

      <div v-if="isGetNeighborAction" class="mb-3">Neighbors: {{ neighbors }}</div>

      <b-form-group id="input-group-2" v-if="isAddAction">
        <b-form-select v-model="position" :options="positions" required></b-form-select>
        <slot name="description">
          <small class="form-text text-muted">
            Position to which hexagon is attached to its neighbor.
            <a
              href="https://docs.google.com/document/d/1mSBnJTa1Bfijap2OnJEufYQHZAZeMk_0FSlFFl1tlSU"
              target="_blank"
            >
              Link
            </a>
            for documentation
          </small>
        </slot>
      </b-form-group>
      <b-button v-if="isAddAction" variant="primary" class="align-items-lg-center" @click="onSave">
        Save
      </b-button>
      <b-button
        v-else-if="isDeleteAction"
        variant="danger"
        class="align-items-lg-center"
        @click="onDelete"
      >
        Delete
      </b-button>
      <b-button v-else variant="primary" class="align-items-lg-center" @click="getNeighbors">
        Get Neighbors
      </b-button>
    </b-form>
  </div>
</template>

<script>
import HexaLandService from '@/services/HexaLandService';

export default {
  name: 'ActionCard',
  data() {
    return {
      actions: ['Add', 'Delete', 'Get Neighbors'],
      action: 'Add',
      position: 0,
      positions: [0, 1, 2, 3, 4, 5],
      name: null,
      neighbor: null,
      neighbors: [],
      positionMap: {
        0: [0, -1],
        1: [1, -1],
        2: [1, 0],
        3: [0, 1],
        4: [-1, 1],
        5: [-1, 0],
      },
    };
  },
  computed: {
    isAddAction() {
      return this.action === 'Add';
    },
    isDeleteAction() {
      return this.action === 'Delete';
    },
    isGetNeighborAction() {
      return this.action === 'Get Neighbors';
    },
  },
  methods: {
    getDescriptionText() {
      return this.action === 'Add' ? 'Add a new hexagon' : 'Remove an existing hexagon';
    },
    async onSave() {
      if (!this.name || !this.neighbor) {
        this.$toastr.e('Please fill in the required details');
        return;
      }

      try {
        const response = await HexaLandService.addHexagon({
          hexagon: {
            name: this.name,
            neighbor: this.neighbor,
            position: this.position,
          },
        });

        if (response.data.statusCode === 200) {
          this.$toastr.s('Data successfully saved');
          this.$emit('refresh-data');
        }
      } catch (e) {
        this.$toastr.e(e.response.data.error.description);
      }
    },
    async onDelete() {
      if (!this.name) {
        this.$toastr.e('Please fill in the required details');
        return;
      }

      try {
        const response = await HexaLandService.deleteHexagon(this.name);

        if (response.data.statusCode === 200) {
          this.$toastr.s('Data successfully deleted');
          this.$emit('refresh-data');
        }
      } catch (e) {
        this.$toastr.e(e.response.data.error.description);
      }
    },
    getPosition(original, neighbor) {
      original = original.split(',');
      for (let i = 0; i < 6; i++) {
        const adders = this.positionMap[i];
        const hexX = Number(original[0]);
        const hexY = Number(original[1]);
        const newX = hexX + adders[0];
        const newY = hexY + adders[1];

        if (`${newX},${newY}` === neighbor) {
          return i;
        }
      }
    },
    async getNeighbors() {
      if (!this.name) {
        this.$toastr.e('Please fill in the required details');
        return;
      }

      try {
        const response = await HexaLandService.getHexagon(this.name, { include_neighbors: true });

        if (response.data.statusCode === 200) {
          this.$toastr.s('Neighbors successfully retrieved');
          const hexagon = response.data.data.hexagon;
          const neighbors = response.data.data.neighbors;

          this.neighbors = neighbors.map((hex) => {
            const pos = this.getPosition(hexagon.coords, hex.coords);
            return [hex.name, pos];
          });
        }
      } catch (e) {
        this.$toastr.e(e.response.data.error.description);
      }
    },
  },
};
</script>
