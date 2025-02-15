import {
  AddSharedStep,
  DeleteSharedStep,
  SharedStep,
  SharedStepFilters,
  SharedStepResponse,
} from '../models/shared-steps';
import { BaseService } from './base';

/**
 * Service for managing TestRail shared steps.
 * @since TestRail 7.0
 */
export class SharedStepService extends BaseService {
  /**
   * Returns a list of shared steps for a project.
   * @param projectId - The ID of the project
   * @param offset - Where to start counting the shared steps from (the offset)
   * @param limit - The number of shared steps the response should return (max 250)
   * @param filters - Optional filters to apply
   * @returns A list of shared steps
   * @throws {Error} 400 - Invalid or unknown set of shared steps
   * @throws {Error} 403 - Insufficient permissions
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async list(
    projectId: number,
    offset = 0,
    limit = 250,
    filters?: SharedStepFilters
  ): Promise<SharedStep[]> {
    const response = await this.client.get<SharedStepResponse>(`/get_shared_steps/${projectId}`, {
      params: {
        offset,
        limit,
        ...filters,
      },
    });
    return response.data.shared_steps;
  }

  /**
   * Returns an existing set of shared steps.
   * @param sharedStepId - The ID of the set of shared steps
   * @returns The shared step
   * @throws {Error} 400 - Invalid or unknown shared step
   * @throws {Error} 403 - Insufficient permissions
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async get(sharedStepId: number): Promise<SharedStep> {
    const response = await this.client.get<SharedStep>(`/get_shared_step/${sharedStepId}`);
    return response.data;
  }

  /**
   * Creates a new set of shared steps.
   * @param projectId - The ID of the project
   * @param sharedStep - The shared step data to add
   * @returns The created shared step
   * @throws {Error} 400 - Invalid or unknown set of shared steps
   * @throws {Error} 403 - Insufficient permissions
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async add(projectId: number, sharedStep: AddSharedStep): Promise<SharedStep> {
    const response = await this.client.post<SharedStep>(
      `/add_shared_step/${projectId}`,
      sharedStep
    );
    return response.data;
  }

  /**
   * Updates an existing set of shared steps (partial updates are supported).
   * @param sharedStepId - The ID of the set of shared steps
   * @param sharedStep - The shared step data to update
   * @returns The updated shared step
   * @throws {Error} 400 - Invalid or unknown test
   * @throws {Error} 403 - Insufficient permissions
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async update(sharedStepId: number, sharedStep: Partial<AddSharedStep>): Promise<SharedStep> {
    const response = await this.client.post<SharedStep>(
      `/update_shared_step/${sharedStepId}`,
      sharedStep
    );
    return response.data;
  }

  /**
   * Deletes an existing shared step entity.
   * Note: Deleting shared test steps cannot be undone. By default, deleting a shared step set will keep the steps in all test cases which used the set.
   * @param sharedStepId - The ID of the set of shared steps
   * @param options - Options for deletion
   * @throws {Error} 400 - Invalid or unknown shared step ID
   * @throws {Error} 403 - Insufficient permissions
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async delete(sharedStepId: number, options?: DeleteSharedStep): Promise<void> {
    await this.client.post(`/delete_shared_step/${sharedStepId}`, options);
  }

  /**
   * Returns a list of test cases that use a shared step.
   * @param sharedStepId - The ID of the set of shared steps
   * @returns An array of test case IDs
   * @throws {Error} 400 - Invalid or unknown shared step
   * @throws {Error} 403 - Insufficient permissions
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async getCases(sharedStepId: number): Promise<number[]> {
    const response = await this.client.get<{ case_ids: number[] }>(
      `/get_shared_step/${sharedStepId}/get_cases`
    );
    return response.data.case_ids;
  }
}
