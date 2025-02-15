/**
 * Represents a test in TestRail (individual instance of test case added to specific test run).
 */
export interface Test {
  /** The unique ID of the test */
  id: number;
  /** The ID of the related test case */
  case_id: number;
  /** The ID of the current status of the test */
  status_id: number;
  /** The ID of the user the test is assigned to */
  assignedto_id: number;
  /** The ID of the test run the test belongs to */
  run_id: number;
  /** The title of the related test case */
  title: string;
  /** The ID of the test case type that is linked to the test case */
  type_id: number;
  /** The ID of the priority that is linked to the test case */
  priority_id: number;
  /** The estimate of the related test case, e.g. "30s" or "1m 45s" */
  estimate: string;
  /** The estimated forecast of the related test case, e.g. "30s" or "1m 45s" */
  estimate_forecast: string | null;
  /** A comma-separated list of references/requirements that are linked to the test case */
  refs: string;
  /** The ID of the milestone that is linked to the test case */
  milestone_id: number;
  /** Custom field: Test preconditions */
  custom_preconds?: string;
  /** Custom field: Test steps */
  custom_steps?: string;
  /** Custom field: Expected result */
  custom_expected?: string;
  /** Custom field: Test steps separated */
  custom_steps_separated?: {
    content: string;
    expected: string;
  }[];
  /** Custom field: Test mission */
  custom_mission?: string;
  /** Custom field: Test goals */
  custom_goals?: string;
}

/**
 * Parameters for filtering tests.
 */
export interface TestFilters {
  /** A comma-separated list of status IDs to filter by */
  status_id?: number[];
  /** The number that sets the position where the response should start from */
  offset?: number;
  /** The number that sets the limit of tests to be shown on the response */
  limit?: number;
  /** The parameter to get data */
  with_data?: string;
}
