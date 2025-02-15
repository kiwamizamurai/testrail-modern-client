import { AddSuite, DeleteSuite, Suite, UpdateSuite } from '../models/suites';
import { BaseService } from './base';

/**
 * Service for managing TestRail test suites.
 */
export class SuiteService extends BaseService {
  /**
   * Returns a list of test suites for a project.
   * @param projectId - The ID of the project
   * @returns A list of test suites
   * @throws {Error} 400 - Invalid or unknown project
   * @throws {Error} 403 - No access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async list(projectId: number): Promise<Suite[]> {
    const response = await this.client.get<Suite[]>(`/get_suites/${projectId}`);
    return response.data;
  }

  /**
   * Returns an existing test suite.
   * @param suiteId - The ID of the test suite
   * @returns The test suite
   * @throws {Error} 400 - Invalid or unknown test suite
   * @throws {Error} 403 - No access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async get(suiteId: number): Promise<Suite> {
    const response = await this.client.get<Suite>(`/get_suite/${suiteId}`);
    return response.data;
  }

  /**
   * Creates a new test suite.
   * @param projectId - The ID of the project the test suite should be added to
   * @param suite - The test suite data to add
   * @returns The created test suite
   * @throws {Error} 400 - Invalid or unknown project
   * @throws {Error} 403 - No permissions to add test suites or no access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async add(projectId: number, suite: AddSuite): Promise<Suite> {
    const response = await this.client.post<Suite>(`/add_suite/${projectId}`, suite);
    return response.data;
  }

  /**
   * Updates an existing test suite (partial updates are supported).
   * @param suiteId - The ID of the test suite
   * @param suite - The test suite data to update
   * @returns The updated test suite
   * @throws {Error} 400 - Invalid or unknown test suite
   * @throws {Error} 403 - No permissions to modify test suites or no access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async update(suiteId: number, suite: UpdateSuite): Promise<Suite> {
    const response = await this.client.post<Suite>(`/update_suite/${suiteId}`, suite);
    return response.data;
  }

  /**
   * Deletes an existing test suite.
   * Note: Deleting a test suite cannot be undone and also deletes all active test runs & results, i.e. test runs & results that weren't closed (archived) yet.
   * @param suiteId - The ID of the test suite
   * @param options - Options for deletion
   * @throws {Error} 400 - Invalid or unknown test suite
   * @throws {Error} 403 - No permissions to delete test suites or no access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async delete(suiteId: number, options?: DeleteSuite): Promise<void> {
    await this.client.post(`/delete_suite/${suiteId}`, options);
  }
}
