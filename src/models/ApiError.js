export class ApiError extends Error {
  /**
   * @var {number}
   */
  status;

  /**
   * @var {string}
   */
  file;

  /**
   * @var {array}
   */
  warnings;

  /**
   * @param response
   */
  constructor(response) {
    super();
    this.message = response.data || response.error;
    this.status = response.status;
    this.file = response.file;
    this.warnings = response.warnings;
  }
}
