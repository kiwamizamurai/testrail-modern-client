import { CaseStatus, CaseStatusResponse, Status } from '../models/statuses';
import { BaseService } from './base';

/**
 * Service for managing TestRail statuses.
 */
export class StatusService extends BaseService {
  /**
   * Returns a list of available test case statuses.
   * @param offset - Where to start counting the statuses from (the offset)
   * @param limit - The number of statuses the response should return
   * @returns A list of case statuses
   * @throws {Error} 200 - Success (the available case statuses are returned as part of the response)
   * @since TestRail Enterprise 7.3
   */
  async listForCase(offset = 0, limit = 250): Promise<CaseStatus[]> {
    const response = await this.client.get<CaseStatusResponse>('/get_case_statuses', {
      params: { offset, limit },
    });
    return response.data.case_statuses;
  }

  /**
   * Returns a list of available test statuses.
   * @returns A list of all system and custom statuses
   * @throws {Error} 200 - Success (the available statuses are returned as part of the response)
   */
  async list(): Promise<Status[]> {
    const response = await this.client.get<Status[]>('/get_statuses');
    return response.data;
  }
}
