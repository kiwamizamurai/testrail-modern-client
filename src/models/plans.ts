/**
 * Represents a test run within a plan entry.
 */
export interface PlanEntryRun {
  /** The unique ID of the test run */
  id: number;
  /** The ID of the test suite */
  suite_id: number;
  /** The name of the test run */
  name: string;
  /** The description of the test run */
  description: string | null;
  /** The ID of the milestone this test run belongs to */
  milestone_id: number | null;
  /** The ID of the user the test run is assigned to */
  assignedto_id: number | null;
  /** True if the test run includes all test cases and false otherwise */
  include_all: boolean;
  /** True if the test run is completed */
  is_completed: boolean;
  /** The date/time when the test run was completed */
  completed_on: number | null;
  /** The number of tests with passed status */
  passed_count: number;
  /** The number of tests with blocked status */
  blocked_count: number;
  /** The number of tests with untested status */
  untested_count: number;
  /** The number of tests with retest status */
  retest_count: number;
  /** The number of tests with failed status */
  failed_count: number;
  /** The number of tests with custom status 1 */
  custom_status1_count: number;
  /** The number of tests with custom status 2 */
  custom_status2_count: number;
  /** The number of tests with custom status 3 */
  custom_status3_count: number;
  /** The number of tests with custom status 4 */
  custom_status4_count: number;
  /** The number of tests with custom status 5 */
  custom_status5_count: number;
  /** The number of tests with custom status 6 */
  custom_status6_count: number;
  /** The number of tests with custom status 7 */
  custom_status7_count: number;
  /** The ID of the project this test run belongs to */
  project_id: number;
  /** The ID of the test plan this test run belongs to */
  plan_id: number;
  /** The index of the entry in the test plan */
  entry_index: number;
  /** The ID of the entry in the test plan */
  entry_id: string;
  /** The configuration name of the test run */
  config: string;
  /** The IDs of the configurations */
  config_ids: number[];
  /** The date/time when the test run was created */
  created_on: number;
  /** A comma-separated list of references/requirements */
  refs: string | null;
  /** The ID of the user who created the test run */
  created_by: number;
  /** The address/URL of the test run in the user interface */
  url: string;
}

/**
 * Represents a test plan entry (group of test runs).
 */
export interface PlanEntry {
  /** The unique ID of the entry */
  id: string;
  /** The ID of the test suite */
  suite_id: number;
  /** The name of the entry */
  name: string;
  /** A comma-separated list of references/requirements */
  refs: string | null;
  /** The description of the entry */
  description: string | null;
  /** True if the entry includes all test cases and false otherwise */
  include_all: boolean;
  /** The test runs in this entry */
  runs: PlanEntryRun[];
}

/**
 * Represents a test plan in TestRail.
 */
export interface Plan {
  /** The unique ID of the test plan */
  id: number;
  /** The name of the test plan */
  name: string;
  /** The description of the test plan */
  description: string | null;
  /** The ID of the milestone this test plan belongs to */
  milestone_id: number | null;
  /** The ID of the user the entire test plan is assigned to */
  assignedto_id: number | null;
  /** True if the test plan was closed and false otherwise */
  is_completed: boolean;
  /** The date/time when the test plan was closed */
  completed_on: number | null;
  /** The number of tests with passed status */
  passed_count: number;
  /** The number of tests with blocked status */
  blocked_count: number;
  /** The number of tests with untested status */
  untested_count: number;
  /** The number of tests with retest status */
  retest_count: number;
  /** The number of tests with failed status */
  failed_count: number;
  /** The number of tests with custom status 1 */
  custom_status1_count: number;
  /** The number of tests with custom status 2 */
  custom_status2_count: number;
  /** The number of tests with custom status 3 */
  custom_status3_count: number;
  /** The number of tests with custom status 4 */
  custom_status4_count: number;
  /** The number of tests with custom status 5 */
  custom_status5_count: number;
  /** The number of tests with custom status 6 */
  custom_status6_count: number;
  /** The number of tests with custom status 7 */
  custom_status7_count: number;
  /** The ID of the project this test plan belongs to */
  project_id: number;
  /** The date/time when the test plan was created */
  created_on: number;
  /** The ID of the user who created the test plan */
  created_by: number;
  /** The address/URL of the test plan in the user interface */
  url: string;
  /** An array of test plan entries */
  entries: PlanEntry[];
}

/**
 * Filter parameters for test plan requests.
 */
export interface PlanFilters {
  /** 1 to return completed test plans only. 0 to return active test plans only */
  is_completed?: boolean;
  /** A comma-separated list of milestone IDs to filter by */
  milestone_id?: number | number[];
  /** A comma-separated list of assignee IDs to filter by */
  assignedto_id?: number | number[];
  /** Only return test plans created after this date (as UNIX timestamp) */
  created_after?: number;
  /** Only return test plans created before this date (as UNIX timestamp) */
  created_before?: number;
  /** A comma-separated list of creator IDs to filter by */
  created_by?: number | number[];
}

/**
 * Parameters for creating a new test plan.
 */
export interface AddPlan {
  /** The name of the test plan (required) */
  name: string;
  /** The description of the test plan */
  description?: string;
  /** The ID of the milestone to link to the test plan */
  milestone_id?: number;
  /** An array of entries describing the test runs of the plan */
  entries?: {
    /** The ID of the test suite for the test run(s) */
    suite_id: number;
    /** The name of the test run(s) */
    name?: string;
    /** The description of the test run(s) */
    description?: string;
    /** The ID of the user the test run should be assigned to */
    assignedto_id?: number;
    /** True for including all test cases and false for a custom case selection */
    include_all?: boolean;
    /** An array of case IDs for the custom case selection */
    case_ids?: number[];
    /** An array of configuration IDs */
    config_ids?: number[];
    /** An array of test runs with specific configurations */
    runs?: {
      /** The name of the test run */
      name?: string;
      /** The description of the test run */
      description?: string;
      /** The ID of the user the test run should be assigned to */
      assignedto_id?: number;
      /** True for including all test cases and false for a custom case selection */
      include_all?: boolean;
      /** An array of case IDs for the custom case selection */
      case_ids?: number[];
      /** An array of configuration IDs */
      config_ids?: number[];
    }[];
  }[];
}

/**
 * Parameters for adding a new entry to a test plan.
 */
export interface AddPlanEntry {
  /** The ID of the test suite for the test run(s) */
  suite_id: number;
  /** The name of the test run(s) */
  name?: string;
  /** The description of the test run(s) */
  description?: string;
  /** The ID of the user the test run should be assigned to */
  assignedto_id?: number;
  /** True for including all test cases and false for a custom case selection */
  include_all?: boolean;
  /** An array of case IDs for the custom case selection */
  case_ids?: number[];
  /** An array of configuration IDs */
  config_ids?: number[];
  /** An array of test runs with specific configurations */
  runs?: {
    /** The name of the test run */
    name?: string;
    /** The description of the test run */
    description?: string;
    /** The ID of the user the test run should be assigned to */
    assignedto_id?: number;
    /** True for including all test cases and false for a custom case selection */
    include_all?: boolean;
    /** An array of case IDs for the custom case selection */
    case_ids?: number[];
    /** An array of configuration IDs */
    config_ids?: number[];
  }[];
}

/**
 * Parameters for adding a new run to a plan entry.
 */
export interface AddRunToPlanEntry {
  /** An array of configuration IDs (required) */
  config_ids: number[];
  /** The description of the test run */
  description?: string;
  /** The ID of the user the test run should be assigned to */
  assignedto_id?: number;
  /** True for including all test cases and false for a custom case selection */
  include_all?: boolean;
  /** An array of case IDs for the custom case selection */
  case_ids?: number[];
  /** A comma-separated list of references/requirements */
  refs?: string;
}
