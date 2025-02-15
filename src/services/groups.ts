import { Group, GroupFilter } from '../models/groups';
import { BaseService } from './base';

/**
 * Service class for managing TestRail user groups.
 * Available in TestRail 7.5 or later.
 */
export class GroupService extends BaseService {
  /**
   * Returns a list of available groups.
   *
   * API Path: GET index.php?/api/v2/get_groups
   *
   * @param filters Optional filters for the groups list
   * @returns Array of groups
   * @throws {Error} 400 - Invalid parameters
   */
  async list(filters?: GroupFilter): Promise<Group[]> {
    const response = await this.client.get<Group[]>('/get_groups', { params: filters });
    return response.data;
  }

  /**
   * Returns an existing group.
   *
   * API Path: GET index.php?/api/v2/get_group/:group_id
   *
   * @param groupId The ID of the group
   * @returns The requested group
   * @throws {Error} 400 - Invalid group_id parameter
   */
  async get(groupId: number): Promise<Group> {
    const response = await this.client.get(`/get_group/${groupId}`);
    return response.data;
  }

  /**
   * Creates a new group.
   *
   * API Path: POST index.php?/api/v2/add_group
   *
   * @param group The group to create (name and user_ids required)
   * @returns The created group
   * @throws {Error} 400 - Invalid field value, such as an invalid ID in the user_ids array
   * @throws {Error} 403 - No permission to create user groups
   */
  async add(group: Omit<Group, 'id'>): Promise<Group> {
    const response = await this.client.post('/add_group', group);
    return response.data;
  }

  /**
   * Updates an existing group.
   * Note: This will set the group's members to match the user_ids array provided.
   * It is not possible to add or remove users individually.
   * The user_ids array should always be the full list of users in the group.
   *
   * API Path: POST index.php?/api/v2/update_group/:group_id
   *
   * @param groupId The ID of the group
   * @param group The group updates (name and/or user_ids)
   * @returns The updated group
   * @throws {Error} 400 - Invalid field value, such as an invalid ID in the user_ids array
   * @throws {Error} 403 - No permission to edit user groups
   */
  async update(groupId: number, group: Partial<Group>): Promise<Group> {
    const response = await this.client.post(`/update_group/${groupId}`, group);
    return response.data;
  }

  /**
   * Deletes an existing group.
   *
   * API Path: POST index.php?/api/v2/delete_group/:group_id
   *
   * @param groupId The ID of the group
   * @throws {Error} 400 - Invalid group_id
   * @throws {Error} 403 - No permission to delete user groups
   */
  async delete(groupId: number): Promise<void> {
    await this.client.post(`/delete_group/${groupId}`);
  }
}
