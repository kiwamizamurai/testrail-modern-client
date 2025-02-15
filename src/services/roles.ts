import { Role, RoleResponse } from '../models/roles';
import { BaseService } from './base';

/**
 * Service for managing TestRail roles.
 * @since TestRail 7.3
 */
export class RoleService extends BaseService {
  /**
   * Returns a list of available roles.
   * @param offset - The offset of the first record to return (used for pagination)
   * @param limit - The maximum number of records to return (used for pagination, max 250)
   * @returns A list of roles
   * @throws {Error} 403 - No access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   * @since TestRail 7.3
   */
  async list(offset = 0, limit = 250): Promise<Role[]> {
    const response = await this.client.get<RoleResponse>('/get_roles', {
      params: { offset, limit },
    });
    return response.data.roles;
  }
}
