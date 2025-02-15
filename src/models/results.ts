import { BaseFilter, PaginationFilter } from './common';

/**
 * Represents a test result to be added.
 */
export interface TestResult {
  /** The ID of the test the result should be added to */
  test_id: number;
  /** The ID of the test status (1: Passed, 2: Blocked, 3: Untested, 4: Retest, 5: Failed) */
  status_id: number;
  /** The comment/description for the test result */
  comment?: string;
  /** The version or build you tested against */
  version?: string;
  /** The time it took to execute the test, e.g. "30s" or "1m 45s" */
  elapsed?: string;
  /** A comma-separated list of defects to link to the test result */
  defects?: string;
  /** The ID of a user the test should be assigned to */
  assignedto_id?: number;
  /** Timestamp when the result was created */
  created_on?: number;
  /** ID of the user who created the result */
  created_by?: number;
}

/**
 * Filters for retrieving test results.
 * @since TestRail 6.7
 */
export interface ResultFilters extends BaseFilter, PaginationFilter {
  /** A comma-separated list of status IDs to filter by */
  status_id?: number[];
  /** A single Defect ID (e.g. TR-1, 4291, etc.) */
  defects_filter?: string;
}

/**
 * Additional filters for retrieving test results for a run.
 */
export interface ResultForRunFilters extends ResultFilters {
  /** A comma-separated list of creators (user IDs) to filter by */
  assignedto_id?: number[];
  /** Only return test results created after this date (as UNIX timestamp) */
  created_after?: number;
  /** Only return test results created before this date (as UNIX timestamp) */
  created_before?: number;
  /** A comma-separated list of creators (user IDs) to filter by */
  created_by?: number[];
}

/**
 * Request body for adding multiple test results.
 */
export interface AddResults {
  /** Array of test results to add */
  results: {
    /** The ID of the test */
    test_id: number;
    /** The ID of the test status */
    status_id: number;
    /** The comment/description */
    comment?: string;
    /** The version or build tested against */
    version?: string;
    /** The execution time */
    elapsed?: string;
    /** Comma-separated list of defects */
    defects?: string;
    /** ID of assigned user */
    assignedto_id?: number;
  }[];
}

/**
 * Request body for adding multiple test results for cases.
 */
export interface AddResultsForCases {
  /** Array of test results to add */
  results: {
    /** The ID of the test case */
    case_id: number;
    /** The ID of the test status */
    status_id: number;
    /** The comment/description */
    comment?: string;
    /** The version or build tested against */
    version?: string;
    /** The execution time */
    elapsed?: string;
    /** Comma-separated list of defects */
    defects?: string;
    /** ID of assigned user */
    assignedto_id?: number;
  }[];
}

/**
 * Represents a complete test result.
 */
export interface Result {
  /** The unique ID of the test result */
  id: number;
  /** The ID of the test this result belongs to */
  test_id: number;
  /** The ID of the test status */
  status_id: number;
  /** The ID of the user who created the result */
  created_by: number;
  /** The date/time when the result was created (UNIX timestamp) */
  created_on: number;
  /** The ID of the assigned user */
  assignedto_id: number;
  /** The comment/description */
  comment: string;
  /** The version or build tested against */
  version: string;
  /** The execution time (e.g. "1m" or "2m 30s") */
  elapsed: string;
  /** Comma-separated list of defects */
  defects: string;
  /** IDs of attachments */
  attachment_ids: number[];
  /** Custom fields as key-value pairs */
  custom_fields?: Record<string, unknown>;
}

/**
 * Response structure when listing results.
 * @since TestRail 6.7
 */
export interface ResultResponse {
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
  /** List of test results */
  results: Result[];
}

/**
 * Represents a test result for a specific test case.
 */
export interface ResultForCase {
  /** The unique ID of the test result */
  id: number;
  /** The ID of the test status */
  status_id: number;
  /** The ID of the user who created the result */
  created_by: number;
  /** The date/time when the result was created (UNIX timestamp) */
  created_on: number;
  /** The ID of the assigned user */
  assignedto_id: number;
  /** The comment/description */
  comment: string;
  /** The version or build tested against */
  version: string;
  /** The execution time (e.g. "1m" or "2m 30s") */
  elapsed: string;
  /** Comma-separated list of defects */
  defects: string;
  /** The ID of the test */
  test_id: number;
  /** The ID of the test case */
  case_id: number;
  /** The ID of the test run */
  run_id: number;
  /** IDs of attachments */
  attachment_ids: number[];
  /** Custom fields as key-value pairs */
  custom_fields?: Record<string, unknown>;
}

/**
 * Request body for adding a single test result.
 */
export interface AddResult {
  /** The ID of the test status */
  status_id?: number;
  /** The comment/description */
  comment?: string;
  /** The version or build tested against */
  version?: string;
  /** The execution time */
  elapsed?: string;
  /** Comma-separated list of defects */
  defects?: string;
  /** ID of assigned user */
  assignedto_id?: number;
  /** Custom fields as key-value pairs */
  custom_fields?: Record<string, unknown>;
}

/**
 * Request body for updating a test result.
 */
export interface UpdateResult {
  /** The ID of the test status */
  status_id?: number;
  /** The comment/description */
  comment?: string;
  /** The version or build tested against */
  version?: string;
  /** The execution time */
  elapsed?: string;
  /** Comma-separated list of defects */
  defects?: string;
  /** ID of assigned user */
  assignedto_id?: number;
  /** Custom fields as key-value pairs */
  custom_fields?: Record<string, unknown>;
}
