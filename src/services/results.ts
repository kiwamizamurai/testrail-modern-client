import {
  AddResult,
  AddResults,
  AddResultsForCases,
  Result,
  ResultFilters,
  ResultForRunFilters,
  ResultResponse,
} from '../models/results';
import { BaseService } from './base';

/**
 * Service for managing TestRail test results.
 * @since TestRail 6.7
 */
export class ResultService extends BaseService {
  /**
   * Returns a list of test results for a test.
   * @param testId - The ID of the test
   * @param offset - The offset of the first record to return (used for pagination)
   * @param limit - The maximum number of records to return (used for pagination, max 250)
   * @param filters - Optional filters to apply
   * @returns A list of test results
   * @throws {Error} 400 - Invalid or unknown test
   * @throws {Error} 403 - No access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async list(testId: number, offset = 0, limit = 250, filters?: ResultFilters): Promise<Result[]> {
    const response = await this.client.get<ResultResponse>(`/get_results/${testId}`, {
      params: {
        offset,
        limit,
        ...filters,
      },
    });
    return response.data.results;
  }

  /**
   * Returns a list of test results for a test case in a specific test run.
   * @param runId - The ID of the test run
   * @param caseId - The ID of the test case
   * @param offset - The offset of the first record to return (used for pagination)
   * @param limit - The maximum number of records to return (used for pagination, max 250)
   * @param filters - Optional filters to apply
   * @returns A list of test results
   * @throws {Error} 400 - Invalid or unknown test run or case
   * @throws {Error} 403 - No access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async listForCase(
    runId: number,
    caseId: number,
    offset = 0,
    limit = 250,
    filters?: ResultFilters
  ): Promise<Result[]> {
    const response = await this.client.get<ResultResponse>(
      `/get_results_for_case/${runId}/${caseId}`,
      {
        params: {
          offset,
          limit,
          ...filters,
        },
      }
    );
    return response.data.results;
  }

  /**
   * Returns a list of test results for a test run.
   * @param runId - The ID of the test run
   * @param offset - The offset of the first record to return (used for pagination)
   * @param limit - The maximum number of records to return (used for pagination, max 250)
   * @param filters - Optional filters to apply
   * @returns A list of test results
   * @throws {Error} 400 - Invalid or unknown test run
   * @throws {Error} 403 - No access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async listForRun(
    runId: number,
    offset = 0,
    limit = 250,
    filters?: ResultForRunFilters
  ): Promise<Result[]> {
    const response = await this.client.get<ResultResponse>(`/get_results_for_run/${runId}`, {
      params: {
        offset,
        limit,
        ...filters,
      },
    });
    return response.data.results;
  }

  /**
   * Returns an existing test result.
   * @param resultId - The ID of the test result
   * @returns The test result
   * @throws {Error} 400 - Invalid or unknown test result
   * @throws {Error} 403 - No access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async get(resultId: number): Promise<Result> {
    const response = await this.client.get<Result>(`/get_result/${resultId}`);
    return response.data;
  }

  /**
   * Adds a new test result, comment or assigns a test.
   * @param testId - The ID of the test
   * @param result - The test result data to add
   * @returns The created test result
   * @throws {Error} 400 - Invalid or unknown test
   * @throws {Error} 403 - No permissions to add test results or no access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async add(testId: number, result: AddResult): Promise<Result> {
    const response = await this.client.post<Result>(`/add_result/${testId}`, result);
    return response.data;
  }

  /**
   * Adds a new test result, comment or assigns a test (for a test run and case combination).
   * @param runId - The ID of the test run
   * @param caseId - The ID of the test case
   * @param result - The test result data to add
   * @returns The created test result
   * @throws {Error} 400 - Invalid or unknown test run or case
   * @throws {Error} 403 - No permissions to add test results or no access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async addForCase(runId: number, caseId: number, result: AddResult): Promise<Result> {
    const response = await this.client.post<Result>(
      `/add_result_for_case/${runId}/${caseId}`,
      result
    );
    return response.data;
  }

  /**
   * Adds multiple test results for cases in a test run.
   * @param runId - The ID of the test run
   * @param results - The test results data to add
   * @returns The created test results
   * @throws {Error} 400 - Invalid or unknown test run/cases
   * @throws {Error} 403 - No permissions to add test results or no access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async addForCases(runId: number, results: AddResultsForCases): Promise<Result[]> {
    const response = await this.client.post<Result[]>(`/add_results_for_cases/${runId}`, results);
    return response.data;
  }

  /**
   * Adds multiple test results for tests in a test run.
   * @param runId - The ID of the test run
   * @param results - The test results data to add
   * @returns The created test results
   * @throws {Error} 400 - Invalid or unknown test run/tests
   * @throws {Error} 403 - No permissions to add test results or no access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async addForTests(runId: number, results: AddResults): Promise<Result[]> {
    const response = await this.client.post<Result[]>(`/add_results/${runId}`, results);
    return response.data;
  }
}
