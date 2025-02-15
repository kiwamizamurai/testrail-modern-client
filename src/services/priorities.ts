import { Priority } from '../models/priorities';
import { BaseService } from './base';

/**
 * Service class for managing TestRail test case priorities.
 */
export class PrioritiesService extends BaseService {
  /**
   * Returns a list of available test case priorities.
   *
   * API Path: GET index.php?/api/v2/get_priorities
   *
   * @returns Array of priorities ordered by their priority field
   */
  async list(): Promise<Priority[]> {
    const response = await this.client.get<Priority[]>('/get_priorities');
    return response.data;
  }
}
