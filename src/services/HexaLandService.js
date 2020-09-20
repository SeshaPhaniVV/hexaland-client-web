import { RouteGroup } from '@/constants/RouteGroup';
import { BaseService } from '@/services/BaseService';

export class HexaLandService extends BaseService {
  constructor() {
    super(RouteGroup.HEXAGON);
  }

  /**
   * Get a Hexagon Details.
   *
   * @param id
   * @param params
   *
   * @returns {Promise<*>}
   */
  getHexagon(id, params) {
    return this.getData(`${id}`, params);
  }

  /**
   * Gets list of hexagons
   *
   * @param params
   *
   * @returns {*}
   */
  // eslint-disable-next-line no-unused-vars
  getList(params) {
    return this.getData(null, params);
  }

  /**
   * Adds a hexagon.
   *
   * @param data
   * @param config
   *
   * @returns {*}
   */
  addHexagon(data, config) {
    return this.postData(data, null, config);
  }

  /**
   * Deletes a hexagon.
   *
   * @param name
   * @param config
   *
   * @returns {*}
   */
  deleteHexagon(name, config) {
    return this.deleteData(name, config);
  }
}

export default new HexaLandService();
