/**
 * Represents a user group in TestRail.
 * Available in TestRail 7.5 or later.
 */
export interface Group {
  /** The unique ID of the group */
  id?: number;
  /** The name of the group */
  name: string;
  /** An array of user IDs belonging to this group */
  user_ids: number[];
}

/**
 * Filter parameters for group requests.
 */
export interface GroupFilter {
  /** Filter by project ID */
  project_id?: number;
  /** Filter by group name */
  name?: string;
}
