/**
 * Represents a TestRail role.
 * @since TestRail 7.3
 */
export interface Role {
  /** The ID of the role */
  id: number;
  /** The name of the role */
  name: string;
  /** True if this is the default user role */
  is_default: boolean;
  /** True if the role has Project Level Administration permissions (TestRail Enterprise only) */
  is_project_admin?: boolean;
}

/**
 * Response structure when listing roles.
 * @since TestRail 7.3
 */
export interface RoleResponse {
  /** Current offset in pagination */
  offset: number;
  /** Maximum number of items per page */
  limit: number;
  /** Total number of items */
  size: number;
  /** Pagination links */
  _links: {
    /** URL for the next page, null if no next page exists */
    next: string | null;
    /** URL for the previous page, null if no previous page exists */
    prev: string | null;
  };
  /** List of roles */
  roles: Role[];
}
