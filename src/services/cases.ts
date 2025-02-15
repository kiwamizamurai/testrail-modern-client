import {
  AddTestCase,
  CaseHistory,
  TestCase,
  TestCaseFilters,
  UpdateTestCase,
} from '../models/cases';
import { BaseService } from './base';

/**
 * Service for managing test cases in TestRail
 */
export class CaseService extends BaseService {
  /**
   * Returns a list of test cases for a project or specific test suite
   * @param projectId - The ID of the project
   * @param filters - Optional filters to apply
   * @returns List of test cases
   * @throws {Error} 400 - Invalid or unknown test case
   * @throws {Error} 403 - No access to the project
   */
  async list(projectId: number, filters?: TestCaseFilters): Promise<TestCase[]> {
    const response = await this.client.get<{ cases: TestCase[] }>(`/get_cases/${projectId}`, {
      params: filters,
    });
    return response.data.cases;
  }

  /**
   * Returns an existing test case
   * @param caseId - The ID of the test case
   * @returns The test case
   * @throws {Error} 400 - Invalid or unknown test case
   * @throws {Error} 403 - No access to the project
   */
  async get(caseId: number): Promise<TestCase> {
    const response = await this.client.get<TestCase>(`/get_case/${caseId}`);
    return response.data;
  }

  /**
   * Creates a new test case
   * @param sectionId - The ID of the section the test case should be added to
   * @param testCase - The test case to create
   * @returns The created test case
   * @throws {Error} 400 - Invalid or unknown test case
   * @throws {Error} 403 - No access to the project
   */
  async add(sectionId: number, testCase: AddTestCase): Promise<TestCase> {
    const response = await this.client.post<TestCase>(`/add_case/${sectionId}`, testCase);
    return response.data;
  }

  /**
   * Updates an existing test case (partial updates are supported)
   * @param caseId - The ID of the test case
   * @param testCase - The test case fields to update
   * @returns The updated test case
   * @throws {Error} 400 - Invalid or unknown test case
   * @throws {Error} 403 - No access to the project
   */
  async update(caseId: number, testCase: UpdateTestCase): Promise<TestCase> {
    const response = await this.client.post<TestCase>(`/update_case/${caseId}`, testCase);
    return response.data;
  }

  /**
   * Updates multiple test cases with the same values
   * @param suiteId - The ID of the test suite (optional if the project is operating in single suite mode)
   * @param caseIds - The IDs of the test cases to update
   * @param updates - The fields to update for all test cases
   * @returns The updated test cases
   * @throws {Error} 400 - Invalid or unknown test case
   * @throws {Error} 403 - No access to the project
   */
  async updateBulk(
    suiteId: number,
    caseIds: number[],
    updates: UpdateTestCase
  ): Promise<TestCase[]> {
    const response = await this.client.post<TestCase[]>(`/update_cases/${suiteId}`, {
      case_ids: caseIds,
      ...updates,
    });
    return response.data;
  }

  /**
   * Copies test cases to another suite/section
   * @param sectionId - The ID of the section to copy the cases to
   * @param caseIds - The IDs of the test cases to copy
   * @throws {Error} 400 - Invalid or unknown test case
   * @throws {Error} 403 - No access to the project
   */
  async copyToSection(sectionId: number, caseIds: number[]): Promise<void> {
    await this.client.post(`/copy_cases_to_section/${sectionId}`, {
      case_ids: caseIds,
    });
  }

  /**
   * Moves test cases to another suite/section
   * @param sectionId - The ID of the section to move the cases to
   * @param suiteId - The ID of the suite to move the cases to
   * @param caseIds - The IDs of the test cases to move
   * @throws {Error} 400 - Invalid or unknown test case
   * @throws {Error} 403 - No access to the project
   */
  async moveToSection(sectionId: number, suiteId: number, caseIds: number[]): Promise<void> {
    await this.client.post(`/move_cases_to_section/${sectionId}`, {
      suite_id: suiteId,
      case_ids: caseIds,
    });
  }

  /**
   * Deletes an existing test case
   * @param caseId - The ID of the test case
   * @param soft - If true, returns information about what would be deleted without actually deleting
   * @throws {Error} 400 - Invalid or unknown test case
   * @throws {Error} 403 - No access to the project
   * @remarks Deleting a test case cannot be undone and also permanently deletes all test results in active test runs
   */
  async delete(caseId: number, soft = false): Promise<void> {
    await this.client.post(`/delete_case/${caseId}`, { soft: soft ? 1 : 0 });
  }

  /**
   * Deletes multiple test cases
   * @param suiteId - The ID of the test suite (optional if the project is operating in single suite mode)
   * @param projectId - The ID of the project
   * @param caseIds - The IDs of the test cases to delete
   * @param soft - If true, returns information about what would be deleted without actually deleting
   * @throws {Error} 400 - Invalid or unknown test case
   * @throws {Error} 403 - No access to the project
   * @remarks Deleting test cases cannot be undone and also permanently deletes all test results in active test runs
   */
  async deleteBulk(
    suiteId: number,
    projectId: number,
    caseIds: number[],
    soft = false
  ): Promise<void> {
    await this.client.post(`/delete_cases/${suiteId}`, {
      project_id: projectId,
      case_ids: caseIds,
      soft: soft ? 1 : 0,
    });
  }

  /**
   * Returns the edit history for a test case
   * @param caseId - The ID of the test case
   * @returns List of history entries
   * @throws {Error} 400 - Invalid or unknown test case
   * @throws {Error} 403 - No access to the project
   * @since TestRail 6.5.4
   */
  async getHistory(caseId: number): Promise<{ history: CaseHistory[] }> {
    const response = await this.client.get<{ history: CaseHistory[] }>(
      `/get_history_for_case/${caseId}`
    );
    return response.data;
  }
}
