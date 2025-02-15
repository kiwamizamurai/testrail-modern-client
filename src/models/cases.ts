/**
 * Represents a test case in TestRail
 */
export interface TestCase {
  /** The unique ID of the test case */
  id: number;
  /** The title of the test case */
  title: string;
  /** The ID of the section the test case belongs to */
  section_id: number;
  /** The ID of the template (field layout) the test case uses */
  template_id: number;
  /** The ID of the test case type that is linked to the test case */
  type_id: number;
  /** The ID of the priority that is linked to the test case */
  priority_id: number;
  /** The ID of the milestone that is linked to the test case */
  milestone_id: number | null;
  /** A comma-separated list of references/requirements */
  refs: string | null;
  /** The timestamp when this test case was created */
  created_on: number;
  /** The ID of the user who created this test case */
  created_by: number;
  /** The timestamp when this test case was last updated */
  updated_on: number;
  /** The ID of the user who last updated this test case */
  updated_by: number;
  /** The estimate, e.g. "30s" or "1m 45s" */
  estimate: string | null;
  /** The estimate forecast, e.g. "30s" or "1m 45s" */
  estimate_forecast: string | null;
  /** The ID of the test suite this test case belongs to */
  suite_id: number;
  /** The display order in the test suite */
  display_order: number;
  /** True if the test case is deleted */
  is_deleted: number;
  /** The automation type of the test case */
  custom_automation_type: number;
  /** The automation status (REVERSE_ENGINEERING) */
  custom_automation_status?: number | null;
  /** The automation ID (REVERSE_ENGINEERING) */
  custom_automation_id?: string | null;
  /** The test data (REVERSE_ENGINEERING) */
  custom_testdata?: string | null;
  /** The preconditions of the test case */
  custom_preconds?: string | null;
  /** The test steps of the test case */
  custom_steps?: string | null;
  /** The expected result */
  custom_expected?: string | null;
  /** The separated test steps */
  custom_steps_separated?: {
    /** The content of the test step */
    content: string;
    /** The expected result of the test step */
    expected: string;
  }[];
  /** The mission of the test case */
  custom_mission?: string | null;
  /** The goals of the test case */
  custom_goals?: string | null;
  /** The auto tag (REVERSE_ENGINEERING) */
  custom_autotag?: string | null;
  /** The BDD scenario (REVERSE_ENGINEERING) */
  custom_testrail_bdd_scenario?: string | null;
}

/**
 * Filter options for test case list endpoints
 * @since TestRail 6.7
 */
export interface TestCaseFilters {
  /** The ID of the test suite (optional if the project is operating in single suite mode) */
  suite_id?: number;
  /** The ID of the section to filter by */
  section_id?: number;
  /** A comma-separated list of template IDs to filter by (requires TestRail 5.2 or later) */
  template_id?: number | number[];
  /** A comma-separated list of case type IDs to filter by */
  type_id?: number | number[];
  /** A comma-separated list of priority IDs to filter by */
  priority_id?: number | number[];
  /** A comma-separated list of milestone IDs to filter by (not available if milestone field is disabled) */
  milestone_id?: number | number[];
  /** Only return test cases created after this date (as UNIX timestamp) */
  created_after?: number;
  /** Only return test cases created before this date (as UNIX timestamp) */
  created_before?: number;
  /** A comma-separated list of creators (user IDs) to filter by */
  created_by?: number | number[];
  /** Only return test cases updated after this date (as UNIX timestamp) */
  updated_after?: number;
  /** Only return test cases updated before this date (as UNIX timestamp) */
  updated_before?: number;
  /** A comma-separated list of user IDs who updated test cases to filter by */
  updated_by?: number | number[];
  /** Only return cases with matching filter string in the case title */
  filter?: string;
  /** A single Reference ID (e.g. TR-1, 4291, etc.) (requires TestRail 6.5.2 or later) */
  refs?: string;
  /** The number of test cases to return (default: 250) (requires TestRail 6.7 or later) */
  limit?: number;
  /** Where to start counting the test cases from (requires TestRail 6.7 or later) */
  offset?: number;
}

/**
 * Parameters for creating a new test case
 */
export interface AddTestCase {
  /** The title of the test case (required) */
  title: string;
  /** The ID of the template (field layout) */
  template_id?: number;
  /** The ID of the case type */
  type_id?: number;
  /** The ID of the case priority */
  priority_id?: number;
  /** The estimate, e.g. "30s" or "1m 45s" */
  estimate?: string;
  /** The ID of the milestone to link to the test case */
  milestone_id?: number;
  /** A comma-separated list of references/requirements */
  refs?: string;
  /** The preconditions of the test case */
  custom_preconds?: string;
  /** The test steps of the test case */
  custom_steps?: string;
  /** The expected result */
  custom_expected?: string;
  /** The separated test steps */
  custom_steps_separated?: {
    /** The content of the test step */
    content: string;
    /** The expected result of the test step */
    expected: string;
    /** The ID of a shared step to include */
    shared_step_id?: number;
  }[];
  /** The mission of the test case */
  custom_mission?: string;
  /** The goals of the test case */
  custom_goals?: string;
}

/**
 * Parameters for updating an existing test case
 */
export interface UpdateTestCase extends Partial<AddTestCase> {
  /** The ID of the section to move the test case to */
  section_id?: number;
}

/**
 * Represents a change in a test case's history
 * @since TestRail 6.5.4
 */
export interface CaseHistory {
  /** The ID of the test case change */
  id: number;
  /** The change type (typically 6 for 'update') */
  type_id: number;
  /** Changes made to the test case fields */
  changes: {
    [key: string]: {
      /** The previous value */
      old: string | number | boolean | null;
      /** The new value */
      new: string | number | boolean | null;
    };
  };
  /** The timestamp when the change was made */
  created_on: number;
  /** The ID of the user who made the change */
  user_id: number;
  /** The ID of the test case */
  case_id: number;
  /** The version ID of the change */
  version_id: number;
}
