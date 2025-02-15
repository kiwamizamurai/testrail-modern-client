import { AddVariable, Variable } from '../models/variables';
import { BaseService } from './base';

/**
 * Service for interacting with TestRail variables.
 * @requires TestRail Enterprise license/subscription
 */
export class VariableService extends BaseService {
  /**
   * Returns a list of available variables.
   * @param projectId - The ID of the project from which to retrieve variables
   * @returns List of variables
   * @throws {Error} - If the project ID is invalid or missing (400)
   * @throws {Error} - If authentication fails (401)
   * @throws {Error} - If there are insufficient permissions or not an Enterprise license (403)
   */
  async list(projectId: number): Promise<Variable[]> {
    const response = await this.client.get<Variable[]>(`/get_variables/${projectId}`);
    return response.data;
  }

  /**
   * Creates a new variable.
   * @param projectId - The ID of the project to which the variable should be added
   * @param variable - The variable to create
   * @returns The created variable
   * @throws {Error} - If the project ID is invalid or missing (400)
   * @throws {Error} - If the variable name is invalid or already exists (400)
   * @throws {Error} - If the number of allowed variables is exceeded (400)
   * @throws {Error} - If authentication fails (401)
   * @throws {Error} - If there are insufficient permissions or not an Enterprise license (403)
   */
  async add(projectId: number, variable: AddVariable): Promise<Variable> {
    const response = await this.client.post(`/add_variable/${projectId}`, variable);
    return response.data;
  }

  /**
   * Updates an existing variable.
   * @param variableId - The ID of the variable to update
   * @param variable - The variable fields to update
   * @returns The updated variable
   * @throws {Error} - If the variable ID is invalid or missing (400)
   * @throws {Error} - If the variable name is invalid or already exists (400)
   * @throws {Error} - If authentication fails (401)
   * @throws {Error} - If there are insufficient permissions or not an Enterprise license (403)
   */
  async update(variableId: number, variable: AddVariable): Promise<Variable> {
    const response = await this.client.post(`/update_variable/${variableId}`, variable);
    return response.data;
  }

  /**
   * Deletes an existing variable.
   * @param variableId - The ID of the variable to be deleted
   * @throws {Error} - If the variable ID is invalid or missing (400)
   * @throws {Error} - If authentication fails (401)
   * @throws {Error} - If there are insufficient permissions or not an Enterprise license (403)
   */
  async delete(variableId: number): Promise<void> {
    await this.client.post(`/delete_variable/${variableId}`);
  }
}
