import { apiAxios } from '@/helpers/AxiosHelper';

export class BaseService {
  /**
   * Represents the base route of an API module endpoint
   *
   * @type {RouteGroup}
   */
  routeGroup;

  /**
   * Represents axiosInstance for the API
   *
   * @type {AxiosInstance}
   */
  apiHelper;

  /**
   * @param routeGroup
   * @param apiHelper
   */
  constructor(routeGroup, apiHelper = apiAxios) {
    this.routeGroup = routeGroup;
    this.apiHelper = apiHelper;
  }

  /**
   * @param route
   * @param params
   * @param config
   * @returns {*}
   */
  getData(route, params = {}, config = {}) {
    return this.apiHelper.get(this._buildRoute(route), { params, ...config });
  }

  /**
   * @param data
   * @param route
   * @param config
   * @returns {*}
   */
  async postData(data, route, config = {}) {
    return this.apiHelper.post(this._buildRoute(route), data, config);
  }

  /**
   * @param data
   * @param route
   * @param config
   * @returns {*}
   */
  async putData(data, route, config = {}) {
    return this.apiHelper.put(this._buildRoute(route), data, config);
  }

  /**
   * @param route
   * @param config
   * @returns {*}
   */
  async deleteData(route, config = {}) {
    return this.apiHelper.delete(this._buildRoute(route), config);
  }

  /**
   * @param route
   * @returns {*}
   * @private
   */
  _buildRoute(route) {
    return route ? `${this.routeGroup}/${route}` : this.routeGroup;
  }
}
