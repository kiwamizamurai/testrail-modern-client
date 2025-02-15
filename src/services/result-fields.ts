import { ResultField } from '../models/result-fields';
import { BaseService } from './base';

/**
 * Service for managing TestRail result fields (custom fields for test results).
 */
export class ResultFieldService extends BaseService {
  /**
   * Returns a list of available test result custom fields.
   * @param offset - The offset of the first record to return (used for pagination)
   * @param limit - The maximum number of records to return (used for pagination, max 250)
   * @returns A list of result fields
   * @throws {Error} 403 - No access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async list(offset = 0, limit = 250): Promise<ResultField[]> {
    const response = await this.client.get<ResultField[]>('/get_result_fields', {
      params: { offset, limit },
    });
    return response.data;
  }
}
