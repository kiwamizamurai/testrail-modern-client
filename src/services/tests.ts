import { Test, TestFilters } from '../models/tests';
import { BaseService } from './base';

/**
 * Service for interacting with TestRail tests (individual instances of test cases).
 */
export class TestService extends BaseService {
  /**
   * Returns a list of tests for a test run.
   * @param runId - The ID of the test run
   * @param filters - Optional filters for the request
   * @param offset - Optional pagination offset
   * @param limit - Optional pagination limit (max 250)
   * @returns List of tests
   * @throws {Error} - If the test run is invalid or unknown (400)
   * @throws {Error} - If there is no access to the project (403)
   * @throws {Error} - If too many requests are made (429) - TestRail Cloud only
   */
  async list(runId: number, filters?: TestFilters): Promise<Test[]> {
    const response = await this.client.get<Test[]>(`/get_tests/${runId}`, { params: filters });
    return response.data;
  }

  /**
   * Returns an existing test.
   * @param testId - The ID of the test
   * @param withData - Optional parameter to get data
   * @returns The requested test
   * @throws {Error} - If the test is invalid or unknown (400)
   * @throws {Error} - If there is no access to the project (403)
   * @throws {Error} - If too many requests are made (429) - TestRail Cloud only
   */
  async get(testId: number, withData?: string): Promise<Test> {
    const response = await this.client.get(`/get_test/${testId}`, {
      params: withData ? { with_data: withData } : undefined,
    });
    return response.data;
  }
}
