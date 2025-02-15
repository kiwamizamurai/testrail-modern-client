import { BDDTestCase } from '../models/bdd';
import { BaseService } from './base';

/**
 * Service for managing BDD scenarios in TestRail
 */
export class BDDService extends BaseService {
  /**
   * Exports a BDD scenario from a test case as a .feature file
   * @param caseId - The ID of the test case
   * @returns The feature file content
   * @throws {Error} 400 - Invalid or unknown test case
   * @throws {Error} 500 - An error occurred during export
   */
  async get(caseId: number): Promise<string> {
    const response = await this.client.get(`/get_bdd/${caseId}`);
    return response.data;
  }

  /**
   * Imports/uploads a BDD scenario from a test case as a .feature file
   * @param sectionId - The ID of the section to add the BDD scenario to
   * @param featureContent - The content of the feature file
   * @returns The created test case with BDD scenario
   * @throws {Error} 400 - Invalid or unknown section
   * @throws {Error} 403 - Insufficient permissions (cannot access project)
   * @throws {Error} 500 - An error occurred during import
   */
  async add(sectionId: number, featureContent: string): Promise<BDDTestCase> {
    const response = await this.client.post(`/add_bdd/${sectionId}`, featureContent, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    return response.data;
  }
}
