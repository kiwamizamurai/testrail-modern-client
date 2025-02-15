/**
 * Represents a TestRail test suite.
 */
export interface Suite {
  /** The unique ID of the test suite */
  id: number;
  /** The name of the test suite */
  name: string;
  /** The description of the test suite */
  description: string | null;
  /** The ID of the project this test suite belongs to */
  project_id: number;
  /** The address/URL of the test suite in the user interface */
  url: string;
  /** True if the test suite is a master test suite and false otherwise */
  is_master: boolean;
  /** True if the test suite is a baseline test suite and false otherwise */
  is_baseline: boolean;
  /** True if the test suite is marked as completed/archived and false otherwise */
  is_completed: boolean;
  /** The date/time when the test suite was closed (as UNIX timestamp) */
  completed_on: number | null;
}

/**
 * Request body for adding a new test suite.
 */
export interface AddSuite {
  /** The name of the test suite */
  name: string;
  /** The description of the test suite */
  description?: string;
}
/**
 * Request body for updating a test suite.
 */
export interface UpdateSuite {
  /** The name of the test suite */
  name?: string;
  /** The description of the test suite */
  description?: string;
}

/**
 * Request body for deleting a test suite.
 */
export interface DeleteSuite {
  /** If true, only returns data about affected items without actually deleting */
  soft?: boolean;
}
