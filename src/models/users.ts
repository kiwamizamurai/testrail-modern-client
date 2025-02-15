/**
 * Represents a user in TestRail.
 */
export interface User {
  /** The unique ID of the user */
  id: number;
  /** The email address of the user as configured in TestRail */
  email: string;
  /** True if email notifications are enabled for the user */
  email_notifications?: boolean;
  /** True if the user is active and false otherwise */
  is_active: boolean;
  /** True if the user is a TestRail administrator */
  is_admin?: boolean;
  /** The full name of the user */
  name: string;
  /** The unique ID of the user's globally assigned role */
  role_id: number;
  /** The Name of the user's globally assigned role */
  role?: string;
  /** An array of group IDs. Each ID is a group to which the user is assigned */
  group_ids?: number[];
  /** True if the user profile is configured to require MFA at each login */
  mfa_required?: boolean;
  /** True if the user's profile has Single-Sign-On enabled */
  sso_enabled?: boolean;
  /** An array of project IDs. Each ID is a project to which the user is assigned */
  assigned_projects?: number[];
}

/**
 * Parameters for filtering users.
 */
export interface UserFilters {
  /** The ID of the project for which you would like to retrieve user information */
  project_id?: number;
}

/**
 * Parameters for adding a new user.
 * @since TestRail 7.3
 */
export interface AddUser {
  /** The email address of the user */
  email: string;
  /** The name of the user */
  name: string;
  /** The ID of the global role to assign to the user */
  role_id?: number;
  /** True if the user is active or not. Default: False */
  is_active?: boolean;
  /** True to make the user a TestRail Administrator. Default: False */
  is_admin?: boolean;
  /** False to disable email notifications for the user. Default: True */
  email_notifications?: boolean;
  /** Array of group IDs to assign the user to */
  group_ids?: number[];
  /** True to require Multi-Factor Authentication for the user */
  mfa_required?: boolean;
  /** True to enable SSO for the user */
  sso_enabled?: boolean;
  /** An array of project IDs to assign to a Project Level Administrator */
  assigned_projects?: number[];
}
