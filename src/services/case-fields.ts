import { AddCaseField, CaseField } from '../models/case-fields';
import { BaseService } from './base';

/**
 * Service for managing test case custom fields in TestRail
 */
export class CaseFieldService extends BaseService {
  /**
   * Returns a list of available test case custom fields
   * @returns List of case fields
   * @throws {Error} 403 - No access
   */
  async list(): Promise<CaseField[]> {
    const response = await this.client.get<CaseField[]>('/get_case_fields');
    return response.data;
  }

  /**
   * Creates a new test case custom field
   * @param field - The field to create
   * @returns The created field
   * @throws {Error} 400 - Invalid field data
   * @throws {Error} 403 - No access
   */
  async add(field: AddCaseField): Promise<CaseField> {
    const response = await this.client.post('/add_case_field', field);
    return response.data;
  }
}
