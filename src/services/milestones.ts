import { Milestone, MilestoneFilters, UpdateMilestone } from '../models/milestones';
import { BaseService } from './base';

/**
 * Service class for managing TestRail milestones.
 */
export class MilestoneService extends BaseService {
  /**
   * Returns the list of milestones for a project.
   *
   * API Path: GET index.php?/api/v2/get_milestones/:project_id
   *
   * @param projectId The ID of the project
   * @param filters Optional filters for the milestones list
   * @returns Array of milestones
   * @throws {Error} 400 - Invalid or unknown project
   * @throws {Error} 403 - No access to the project
   */
  async getMilestones(projectId: number, filters?: MilestoneFilters): Promise<Milestone[]> {
    const response = await this.client.get<{ milestones: Milestone[] }>(
      `/get_milestones/${projectId}`,
      { params: filters }
    );
    return response.data.milestones;
  }

  /**
   * Returns an existing milestone.
   *
   * API Path: GET index.php?/api/v2/get_milestone/:milestone_id
   *
   * @param milestoneId The ID of the milestone
   * @returns The requested milestone
   * @throws {Error} 400 - Invalid or unknown milestone
   * @throws {Error} 403 - No access to the project
   */
  async getMilestone(milestoneId: number): Promise<Milestone> {
    const response = await this.client.get(`/get_milestone/${milestoneId}`);
    return response.data;
  }

  /**
   * Creates a new milestone.
   *
   * API Path: POST index.php?/api/v2/add_milestone/:project_id
   *
   * @param projectId The ID of the project the milestone should be added to
   * @param milestone The milestone to create (name is required)
   * @returns The created milestone
   * @throws {Error} 400 - Invalid or unknown project
   * @throws {Error} 403 - No permissions to add milestones or no access to the project
   */
  async addMilestone(
    projectId: number,
    milestone: Omit<Milestone, 'id' | 'url'>
  ): Promise<Milestone> {
    const response = await this.client.post(`/add_milestone/${projectId}`, milestone);
    return response.data;
  }

  /**
   * Updates an existing milestone.
   * Partial updates are supported, i.e. you can submit and update specific fields only.
   *
   * API Path: POST index.php?/api/v2/update_milestone/:milestone_id
   *
   * @param milestoneId The ID of the milestone
   * @param milestone The milestone updates
   * @returns The updated milestone
   * @throws {Error} 400 - Invalid or unknown milestone
   * @throws {Error} 403 - No permissions to modify milestones or no access to the project
   */
  async updateMilestone(milestoneId: number, milestone: UpdateMilestone): Promise<Milestone> {
    const response = await this.client.post(`/update_milestone/${milestoneId}`, milestone);
    return response.data;
  }

  /**
   * Deletes an existing milestone.
   * Warning: Deleting a milestone cannot be undone.
   *
   * API Path: POST index.php?/api/v2/delete_milestone/:milestone_id
   *
   * @param milestoneId The ID of the milestone
   * @throws {Error} 400 - Invalid or unknown milestone
   * @throws {Error} 403 - No permissions to delete milestones or no access to the project
   */
  async deleteMilestone(milestoneId: number): Promise<void> {
    await this.client.post(`/delete_milestone/${milestoneId}`);
  }
}
