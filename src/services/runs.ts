import { AddRun, Run, RunFilters, RunResponse, UpdateRun } from '../models/runs';
import { BaseService } from './base';

/**
 * Service for managing TestRail test runs.
 */
export class RunService extends BaseService {
  /**
   * Returns a list of test runs for a project. Only returns those test runs that are not part of a test plan.
   * @param projectId - The ID of the project
   * @param filters - Optional filters to apply
   * @returns A list of test runs
   * @throws {Error} 400 - Invalid or unknown project
   * @throws {Error} 403 - No access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async list(projectId: number, filters?: RunFilters): Promise<Run[]> {
    const response = await this.client.get<RunResponse>(`/get_runs/${projectId}`, {
      params: filters,
    });
    return response.data.runs;
  }

  /**
   * Returns an existing test run.
   * @param runId - The ID of the test run
   * @returns The test run
   * @throws {Error} 400 - Invalid or unknown test run
   * @throws {Error} 403 - No access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async get(runId: number): Promise<Run> {
    const response = await this.client.get<Run>(`/get_run/${runId}`);
    return response.data;
  }

  /**
   * Creates a new test run.
   * @param projectId - The ID of the project the test run should be added to
   * @param run - The test run data to add
   * @returns The created test run
   * @throws {Error} 400 - Invalid or unknown project
   * @throws {Error} 403 - No permissions to add test runs or no access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async add(projectId: number, run: AddRun): Promise<Run> {
    const response = await this.client.post<Run>(`/add_run/${projectId}`, run);
    return response.data;
  }

  /**
   * Updates an existing test run (partial updates are supported).
   * @param runId - The ID of the test run
   * @param run - The test run data to update
   * @returns The updated test run
   * @throws {Error} 400 - Invalid or unknown test run
   * @throws {Error} 403 - No permissions to modify test runs or no access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async update(runId: number, run: UpdateRun): Promise<Run> {
    const response = await this.client.post<Run>(`/update_run/${runId}`, run);
    return response.data;
  }

  /**
   * Closes an existing test run and archives its tests & results.
   * Note: Closing a test run cannot be undone.
   * @param runId - The ID of the test run
   * @returns The closed test run
   * @throws {Error} 400 - Invalid or unknown test run
   * @throws {Error} 403 - No permissions to close test runs or no access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async close(runId: number): Promise<Run> {
    const response = await this.client.post<Run>(`/close_run/${runId}`);
    return response.data;
  }

  /**
   * Deletes an existing test run.
   * Note: Deleting a test run cannot be undone and also permanently deletes all tests & results of the test run.
   * @param runId - The ID of the test run
   * @throws {Error} 400 - Invalid or unknown test run
   * @throws {Error} 403 - No permissions to delete test runs or no access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async delete(runId: number): Promise<void> {
    await this.client.post(`/delete_run/${runId}`);
  }
}
