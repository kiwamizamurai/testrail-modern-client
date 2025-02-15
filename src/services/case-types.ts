import { CaseType } from '../models/case-types';
import { BaseService } from './base';

/**
 * Service for managing test case types in TestRail
 */
export class CaseTypeService extends BaseService {
  /**
   * Returns a list of available test case types
   * @returns List of case types
   * @throws {Error} 403 - No access to TestRail
   * @example
   * ```ts
   * const caseTypes = await client.caseTypes.list();
   * // [
   * //   { id: 1, name: "Automated", is_default: false },
   * //   { id: 2, name: "Functionality", is_default: false },
   * //   { id: 6, name: "Other", is_default: true }
   * // ]
   * ```
   */
  async list(): Promise<CaseType[]> {
    const response = await this.client.get<CaseType[]>('/get_case_types');
    return response.data;
  }
}
