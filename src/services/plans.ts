import { AddPlan, AddPlanEntry, AddRunToPlanEntry, Plan, PlanFilters } from '../models/plans';
import { BaseService } from './base';

/**
 * Service class for managing TestRail test plans.
 * Test plans allow you to group multiple test runs together and automatically generate test runs
 * for various browser, OS, or other configurations you set without having to add each test run individually.
 */
export class PlanService extends BaseService {
  /**
   * Returns a list of test plans for a project.
   *
   * API Path: GET index.php?/api/v2/get_plans/:project_id
   *
   * @param projectId The ID of the project
   * @param filters Optional filters for the test plans list
   * @returns Array of test plans (without entries field)
   * @throws {Error} 400 - Invalid or unknown project
   * @throws {Error} 403 - No access to the project
   */
  async list(projectId: number, filters?: PlanFilters): Promise<Plan[]> {
    const response = await this.client.get<{ plans: Plan[] }>(`/get_plans/${projectId}`, {
      params: filters,
    });
    return response.data.plans;
  }

  /**
   * Returns an existing test plan.
   *
   * API Path: GET index.php?/api/v2/get_plan/:plan_id
   *
   * @param planId The ID of the test plan
   * @returns The requested test plan including entries
   * @throws {Error} 400 - Invalid or unknown test plan
   * @throws {Error} 403 - No access to the project
   */
  async get(planId: number): Promise<Plan> {
    const response = await this.client.get(`/get_plan/${planId}`);
    return response.data;
  }

  /**
   * Creates a new test plan.
   *
   * API Path: POST index.php?/api/v2/add_plan/:project_id
   *
   * @param projectId The ID of the project the test plan should be added to
   * @param plan The test plan to create (name is required)
   * @returns The created test plan
   * @throws {Error} 400 - Invalid or unknown project
   * @throws {Error} 403 - No permissions to add test plans or no access to the project
   */
  async add(projectId: number, plan: AddPlan): Promise<Plan> {
    const response = await this.client.post(`/add_plan/${projectId}`, plan);
    return response.data;
  }

  /**
   * Updates an existing test plan.
   * Partial updates are supported, i.e. you can submit and update specific fields only.
   * Note: The entries field is not supported in this method.
   *
   * API Path: POST index.php?/api/v2/update_plan/:plan_id
   *
   * @param planId The ID of the test plan
   * @param plan The test plan updates
   * @returns The updated test plan
   * @throws {Error} 400 - Invalid or unknown test plan
   * @throws {Error} 403 - No permissions to modify test plans or no access to the project
   */
  async update(planId: number, plan: Partial<AddPlan>): Promise<Plan> {
    const response = await this.client.post(`/update_plan/${planId}`, plan);
    return response.data;
  }

  /**
   * Closes an existing test plan and archives its test runs & results.
   * Warning: Closing a test plan cannot be undone.
   *
   * API Path: POST index.php?/api/v2/close_plan/:plan_id
   *
   * @param planId The ID of the test plan
   * @returns The closed test plan
   * @throws {Error} 400 - Invalid or unknown test plan
   * @throws {Error} 403 - No permissions to close test plans or no access to the project
   */
  async close(planId: number): Promise<Plan> {
    const response = await this.client.post(`/close_plan/${planId}`);
    return response.data;
  }

  /**
   * Deletes an existing test plan.
   * Warning: Deleting a test plan cannot be undone and also permanently deletes all test runs & results of the test plan.
   *
   * API Path: POST index.php?/api/v2/delete_plan/:plan_id
   *
   * @param planId The ID of the test plan
   * @throws {Error} 400 - Invalid or unknown test plan
   * @throws {Error} 403 - No permissions to delete test plans or no access to the project
   */
  async delete(planId: number): Promise<void> {
    await this.client.post(`/delete_plan/${planId}`);
  }

  /**
   * Adds one or more new test runs to a test plan.
   *
   * API Path: POST index.php?/api/v2/add_plan_entry/:plan_id
   *
   * @param planId The ID of the plan the test runs should be added to
   * @param entry The entry details including test runs to add
   * @returns The new test plan entry including test runs
   * @throws {Error} 400 - Invalid or unknown test plan
   * @throws {Error} 403 - No permissions to modify test plans or no access to the project
   */
  async addEntry(planId: number, entry: AddPlanEntry): Promise<Plan> {
    const response = await this.client.post(`/add_plan_entry/${planId}`, entry);
    return response.data;
  }

  /**
   * Updates one or more groups of test runs in a plan.
   * Partial updates are supported, i.e. you can submit and update specific fields only.
   * Note: The config_ids and runs fields are not supported in this method.
   *
   * API Path: POST index.php?/api/v2/update_plan_entry/:plan_id/:entry_id
   *
   * @param planId The ID of the test plan
   * @param entryId The ID of the test plan entry (note: not the test run ID)
   * @param entry The entry updates
   * @returns The updated test plan entry including test runs
   * @throws {Error} 400 - Invalid or unknown test plan or entry
   * @throws {Error} 403 - No permissions to modify test plans or no access to the project
   */
  async updateEntry(planId: number, entryId: string, entry: Partial<AddPlanEntry>): Promise<Plan> {
    const response = await this.client.post(`/update_plan_entry/${planId}/${entryId}`, entry);
    return response.data;
  }

  /**
   * Deletes one or more existing test runs from a plan.
   * Warning: This operation cannot be undone.
   *
   * API Path: POST index.php?/api/v2/delete_plan_entry/:plan_id/:entry_id
   *
   * @param planId The ID of the test plan
   * @param entryId The ID of the test plan entry (note: not the test run ID)
   * @throws {Error} 400 - Invalid or unknown test plan or entry
   * @throws {Error} 403 - No permissions to delete test plans or no access to the project
   */
  async deleteEntry(planId: number, entryId: string): Promise<void> {
    await this.client.post(`/delete_plan_entry/${planId}/${entryId}`);
  }

  /**
   * Adds a new test run to a test plan entry.
   * Requires TestRail 6.4 or later.
   *
   * API Path: POST index.php?/api/v2/add_run_to_plan_entry/:plan_id/:entry_id
   *
   * @param planId The ID of the plan the test run should be added to
   * @param entryId The ID of the test plan entry
   * @param run The test run to add
   * @returns The updated test plan entry
   * @throws {Error} 400 - Invalid or unknown test plan or entry, or invalid POST body
   * @throws {Error} 403 - No permissions to modify test plans or no access to the project
   */
  async addRunToEntry(planId: number, entryId: string, run: AddRunToPlanEntry): Promise<Plan> {
    const response = await this.client.post(`/add_run_to_plan_entry/${planId}/${entryId}`, run);
    return response.data;
  }

  /**
   * Updates a run inside a plan entry that uses configurations.
   * Requires TestRail 6.4 or later.
   *
   * API Path: POST index.php?/api/v2/update_run_in_plan_entry/:run_id
   *
   * @param runId The ID of the test run
   * @param run The test run updates
   * @returns The updated test run
   * @throws {Error} 400 - Invalid or unknown test run or invalid POST body
   * @throws {Error} 403 - No permissions to modify test plans or no access to the project
   */
  async updateRunInEntry(runId: number, run: Partial<AddRunToPlanEntry>): Promise<Plan> {
    const response = await this.client.post(`/update_run_in_plan_entry/${runId}`, run);
    return response.data;
  }

  /**
   * Deletes a test run from a test plan entry.
   *
   * API Path: POST index.php?/api/v2/delete_run_from_plan_entry/:run_id
   *
   * @param runId The ID of the test run
   * @throws {Error} 400 - Invalid or unknown test run
   * @throws {Error} 403 - No permissions to delete test plans or no access to the project
   */
  async deleteRunFromEntry(runId: number): Promise<void> {
    await this.client.post(`/delete_run_from_plan_entry/${runId}`);
  }
}
