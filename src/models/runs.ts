/**
 * Represents a TestRail test run.
 */
export interface Run {
  /** The ID of the user the entire test run is assigned to */
  assignedto_id: number;
  /** The number of tests in the test run marked as blocked */
  blocked_count: number;
  /** The date/time when the test run was closed (as UNIX timestamp) */
  completed_on: number | null;
  /** The configuration of the test run as a string (if part of a test plan) */
  config: string;
  /** The array of IDs of the configurations of the test run (if part of a test plan) */
  config_ids: number[];
  /** The ID of the user who created the test run */
  created_by: number;
  /** The date/time when the test run was created (as UNIX timestamp) */
  created_on: number;
  /** The number of tests in the test run with custom status 1 */
  custom_status1_count: number;
  /** The number of tests in the test run with custom status 2 */
  custom_status2_count: number;
  /** The number of tests in the test run with custom status 3 */
  custom_status3_count: number;
  /** The number of tests in the test run with custom status 4 */
  custom_status4_count: number;
  /** The number of tests in the test run with custom status 5 */
  custom_status5_count: number;
  /** The number of tests in the test run with custom status 6 */
  custom_status6_count: number;
  /** The number of tests in the test run with custom status 7 */
  custom_status7_count: number;
  /** The description of the test run */
  description: string | null;
  /** The number of tests in the test run marked as failed */
  failed_count: number;
  /** The unique ID of the test run */
  id: number;
  /** True if the test run includes all test cases and false otherwise */
  include_all: boolean;
  /** True if the test run was closed and false otherwise */
  is_completed: boolean;
  /** The ID of the milestone this test run belongs to */
  milestone_id: number | null;
  /** The name of the test run */
  name: string;
  /** The number of tests in the test run marked as passed */
  passed_count: number;
  /** The ID of the test plan this test run belongs to */
  plan_id: number | null;
  /** The ID of the project this test run belongs to */
  project_id: number;
  /** A comma-separated list of references/requirements */
  refs: string | null;
  /** The number of tests in the test run marked as retest */
  retest_count: number;
  /** The ID of the test suite this test run is derived from */
  suite_id: number;
  /** The number of tests in the test run marked as untested */
  untested_count: number;
  /** The date/time when the test run was updated (requires TestRail 6.5.2 or later) */
  updated_on: number | null;
  /** The address/URL of the test run in the user interface */
  url: string;
}

/**
 * Response structure when listing runs.
 */
export interface RunResponse {
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
  /** List of test runs */
  runs: Run[];
}

/**
 * Filters for retrieving test runs.
 */
export interface RunFilters {
  /** Only return test runs created after this date (as UNIX timestamp) */
  created_after?: number;
  /** Only return test runs created before this date (as UNIX timestamp) */
  created_before?: number;
  /** A comma-separated list of creators (user IDs) to filter by */
  created_by?: string;
  /** 1 to return completed test runs only. 0 to return active test runs only */
  is_completed?: 0 | 1;
  /** Limit the result to limit test runs */
  limit?: number;
  /** Use offset to skip records */
  offset?: number;
  /** A comma-separated list of milestone IDs to filter by */
  milestone_id?: number;
  /** A single Reference ID (e.g. TR-a, 4291, etc.) */
  refs_filter?: string;
  /** A comma-separated list of test suite IDs to filter by */
  suite_id?: number;
}

/**
 * Request body for adding a new test run.
 */
export interface AddRun {
  /** The ID of the test suite for the test run (optional if the project is operating in single suite mode, required otherwise) */
  suite_id?: number;
  /** The name of the test run */
  name: string;
  /** The description of the test run */
  description?: string;
  /** The ID of the milestone to link to the test run */
  milestone_id?: number;
  /** The ID of the user the test run should be assigned to */
  assignedto_id?: number;
  /** True for including all test cases of the test suite and false for a custom case selection */
  include_all?: boolean;
  /** An array of case IDs for the custom case selection */
  case_ids?: number[];
  /** A comma-separated list of references/requirements (requires TestRail 6.1 or later) */
  refs?: string;
}

/**
 * Request body for updating a test run.
 */
export interface UpdateRun {
  /** The name of the test run */
  name?: string;
  /** The description of the test run */
  description?: string;
  /** The ID of the milestone to link to the test run */
  milestone_id?: number;
  /** True for including all test cases of the test suite and false for a custom case selection */
  include_all?: boolean;
  /** An array of case IDs for the custom case selection */
  case_ids?: number[];
  /** A comma-separated list of references/requirements (requires TestRail 6.1 or later) */
  refs?: string;
}
