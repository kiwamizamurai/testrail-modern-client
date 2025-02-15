/**
 * Represents a step in a shared step set.
 */
export interface SharedStepSeparated {
  /** The text contents of the "Step" field */
  content: string;
  /** The text contents of the "Additional Info" field */
  additional_info: string | null;
  /** The text contents of the "Expected Result" field */
  expected: string | null;
  /** Reference information for the "References" field */
  refs: string | null;
}

/**
 * Represents a TestRail shared step.
 * @since TestRail 7.0
 */
export interface SharedStep {
  /** The ID of the set of shared steps */
  id: number;
  /** The title given to the set of steps */
  title: string;
  /** The ID of the project in which the steps reside */
  project_id: number;
  /** The ID of the user who created the set of steps */
  created_by: number;
  /** The date/time when the steps were created (as UNIX timestamp) */
  created_on: number;
  /** The ID of the user who last updated the set of steps */
  updated_by: number;
  /** The date/time when the set of steps was last updated (as UNIX timestamp) */
  updated_on: number;
  /** An array of objects. Each object contains the details for an individual step */
  custom_steps_separated: SharedStepSeparated[];
  /** An array of integers. The array contains all test cases which use the set of shared steps */
  case_ids: number[];
}

/**
 * Response structure when listing shared steps.
 */
export interface SharedStepResponse {
  /** Where to start counting the shared steps from */
  offset: number;
  /** The maximum number of records to return */
  limit: number;
  /** The number of records returned */
  size: number;
  /** Pagination links */
  _links: {
    /** URL for the next page, null if no next page exists */
    next: string | null;
    /** URL for the previous page, null if no previous page exists */
    prev: string | null;
  };
  /** List of shared steps */
  shared_steps: SharedStep[];
}

/**
 * Request body for adding a new shared step.
 */
export interface AddSharedStep {
  /** The title for the set of steps */
  title: string;
  /** An array of objects. Each object contains the details for an individual step */
  custom_steps_separated?: SharedStepSeparated[];
}

/**
 * Filters for retrieving shared steps.
 */
export interface SharedStepFilters {
  /** Only return shared steps created after this date (as UNIX timestamp) */
  created_after?: number;
  /** Only return shared steps created before this date (as UNIX timestamp) */
  created_before?: number;
  /** A comma-separated list of creators (user IDs) to filter by */
  created_by?: number[];
  /** Only return shared steps updated after this date (as UNIX timestamp) */
  updated_after?: number;
  /** Only return shared steps updated before this date (as UNIX timestamp) */
  updated_before?: number;
  /** A single Reference ID (e.g. TR-a, 4291, etc.) */
  refs?: string;
}

/**
 * Request body for deleting a shared step.
 */
export interface DeleteSharedStep {
  /** Default is 1 (true). Submit keep_in_cases=0 to delete the shared steps from all test cases as well as the shared step repository */
  keep_in_cases?: boolean;
}
