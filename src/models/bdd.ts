/**
 * Represents a test case with BDD scenario
 */
export interface BDDTestCase {
  /** The unique identifier of the test case */
  id: number;
  /** The title of the test case */
  title: string;
  /** The ID of the section this test case belongs to */
  section_id: number;
  /** The ID of the template this test case uses */
  template_id: number;
  /** The ID of the type this test case is assigned to */
  type_id: number;
  /** The ID of the priority this test case is assigned to */
  priority_id: number;
  /** The ID of the milestone this test case is assigned to */
  milestone_id: number | null;
  /** A comma-separated list of references/requirements */
  refs: string;
  /** The ID of the user who created this test case */
  created_by: number;
  /** The timestamp when this test case was created */
  created_on: number;
  /** The ID of the user who last updated this test case */
  updated_by: number;
  /** The timestamp when this test case was last updated */
  updated_on: number;
  /** The estimate, e.g. "30s" or "1m 45s" */
  estimate: string | null;
  /** The forecast estimate */
  estimate_forecast: string | null;
  /** The ID of the test suite this test case belongs to */
  suite_id: number;
  /** The display order in the test suite */
  display_order: number;
  /** True if the test case is deleted */
  is_deleted: number;
  /** The automation type of the test case */
  custom_automation_type: number;
  /** The preconditions of the test case */
  custom_preconds: string | null;
  /** The test steps of the test case */
  custom_steps: string | null;
  /** The BDD scenario in TestRail format */
  custom_testrail_bdd_scenario: string;
  /** The expected result */
  custom_expected: string | null;
  /** The separated test steps */
  custom_steps_separated: string | null;
  /** The mission of the test case */
  custom_mission: string | null;
  /** The goals of the test case */
  custom_goals: string | null;
}
