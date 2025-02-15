/**
 * Represents a configuration group in TestRail.
 */
export interface ConfigGroup {
  /** The unique ID of the configuration group */
  id: number;
  /** The name of the configuration group */
  name: string;
  /** The ID of the project this configuration group belongs to */
  project_id: number;
  /** The list of configurations in this group */
  configs: Config[];
}

/**
 * Represents a single configuration in TestRail.
 */
export interface Config {
  /** The unique ID of the configuration */
  id: number;
  /** The name of the configuration */
  name: string;
  /** The ID of the configuration group this configuration belongs to */
  group_id: number;
}

/**
 * Filter parameters for configuration requests.
 */
export interface ConfigFilters {
  /** Optional project ID to filter configurations */
  project_id?: number;
}

/**
 * Parameters for creating a new configuration.
 */
export interface AddConfig {
  /** The name of the new configuration */
  name: string;
}

/**
 * Parameters for creating a new configuration group.
 */
export interface AddConfigGroup {
  /** The name of the new configuration group */
  name: string;
}

/**
 * Parameters for updating an existing configuration.
 */
export interface UpdateConfig {
  /** The new name for the configuration */
  name: string;
}

/**
 * Parameters for updating an existing configuration group.
 */
export interface UpdateConfigGroup {
  /** The new name for the configuration group */
  name: string;
}
