import {
  AddConfig,
  AddConfigGroup,
  Config,
  ConfigGroup,
  UpdateConfig,
  UpdateConfigGroup,
} from '../models/configurations';
import { BaseService } from './base';

/**
 * Service class for managing TestRail configurations and configuration groups.
 * Configurations are used to define different test environments or variations for test plans.
 */
export class ConfigurationService extends BaseService {
  /**
   * Returns a list of available configurations, grouped by configuration groups.
   *
   * API Path: GET index.php?/api/v2/get_configs/:project_id
   *
   * @param projectId The ID of the project
   * @returns An array of configuration groups, each containing a list of configurations
   * @throws {Error} 400 - Invalid or unknown project
   * @throws {Error} 403 - No access to the project
   */
  async getConfigs(projectId: number): Promise<ConfigGroup[]> {
    const response = await this.client.get<ConfigGroup[]>(`/get_configs/${projectId}`);
    return response.data;
  }

  /**
   * Creates a new configuration group.
   *
   * API Path: POST index.php?/api/v2/add_config_group/:project_id
   *
   * @param projectId The ID of the project the configuration group should be added to
   * @param group The configuration group to add (requires name property)
   * @returns The created configuration group
   * @throws {Error} 400 - Invalid or unknown project
   * @throws {Error} 403 - No permissions to add configuration groups or no access to the project
   */
  async addConfigGroup(projectId: number, group: AddConfigGroup): Promise<ConfigGroup> {
    const response = await this.client.post(`/add_config_group/${projectId}`, group);
    return response.data;
  }

  /**
   * Creates a new configuration within a configuration group.
   *
   * API Path: POST index.php?/api/v2/add_config/:config_group_id
   *
   * @param configGroupId The ID of the configuration group the configuration should be added to
   * @param config The configuration to add (requires name property)
   * @returns The created configuration
   * @throws {Error} 400 - Invalid or unknown configuration group
   * @throws {Error} 403 - No permissions to add configurations or no access to the project
   */
  async addConfig(configGroupId: number, config: AddConfig): Promise<Config> {
    const response = await this.client.post(`/add_config/${configGroupId}`, config);
    return response.data;
  }

  /**
   * Updates an existing configuration group.
   *
   * API Path: POST index.php?/api/v2/update_config_group/:config_group_id
   *
   * @param configGroupId The ID of the configuration group
   * @param group The configuration group updates (name property)
   * @returns The updated configuration group
   * @throws {Error} 400 - Invalid or unknown configuration group
   * @throws {Error} 403 - No permissions to modify configuration groups or no access to the project
   */
  async updateConfigGroup(configGroupId: number, group: UpdateConfigGroup): Promise<ConfigGroup> {
    const response = await this.client.post(`/update_config_group/${configGroupId}`, group);
    return response.data;
  }

  /**
   * Updates an existing configuration.
   *
   * API Path: POST index.php?/api/v2/update_config/:config_id
   *
   * @param configId The ID of the configuration
   * @param config The configuration updates (name property)
   * @returns The updated configuration
   * @throws {Error} 400 - Invalid or unknown configuration
   * @throws {Error} 403 - No permissions to modify configurations or no access to the project
   */
  async updateConfig(configId: number, config: UpdateConfig): Promise<Config> {
    const response = await this.client.post(`/update_config/${configId}`, config);
    return response.data;
  }

  /**
   * Deletes an existing configuration group and its configurations.
   * Warning: This operation cannot be undone and permanently deletes all configurations in this group.
   * Note: It does not affect closed test plans/runs, or active test plans/runs unless they are updated.
   *
   * API Path: POST index.php?/api/v2/delete_config_group/:config_group_id
   *
   * @param configGroupId The ID of the configuration group
   * @throws {Error} 400 - Invalid or unknown configuration group
   * @throws {Error} 403 - No permissions to delete configuration groups or no access to the project
   */
  async deleteConfigGroup(configGroupId: number): Promise<void> {
    await this.client.post(`/delete_config_group/${configGroupId}`);
  }

  /**
   * Deletes an existing configuration.
   * Warning: This operation cannot be undone.
   * Note: It does not affect closed test plans/runs, or active test plans/runs unless they are updated.
   *
   * API Path: POST index.php?/api/v2/delete_config/:config_id
   *
   * @param configId The ID of the configuration
   * @throws {Error} 400 - Invalid or unknown configuration
   * @throws {Error} 403 - No permissions to delete configurations or no access to the project
   */
  async deleteConfig(configId: number): Promise<void> {
    await this.client.post(`/delete_config/${configId}`);
  }
}
