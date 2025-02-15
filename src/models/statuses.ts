/**
 * Represents a test status in TestRail.
 */
export interface Status {
  /** Unique ID of the status */
  id: number;
  /** The system name of the status */
  name: string;
  /** The display name of the status */
  label: string;
  /** RGB color for dark theme */
  color_dark: number;
  /** RGB color for medium theme */
  color_medium: number;
  /** RGB color for bright theme */
  color_bright: number;
  /** Whether this is a system status */
  is_system: boolean;
  /** Whether this is the untested status */
  is_untested: boolean;
  /** Whether this is a final status */
  is_final: boolean;
}

/**
 * Represents a test case status in TestRail.
 * @since TestRail Enterprise 7.3
 */
export interface CaseStatus {
  /** Unique ID of the status */
  case_status_id: number;
  /** The system name of the status */
  name: string;
  /** An alternate label for the status */
  abbreviation: string | null;
  /** True if the status is the default status for test cases */
  is_default: boolean;
  /** True if the status is an approved status */
  is_approved: boolean;
}

/**
 * Response structure when listing case statuses.
 * @since TestRail Enterprise 7.3
 */
export interface CaseStatusResponse {
  /** Where to start counting the step history from */
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
  /** Array of case status information */
  case_statuses: CaseStatus[];
}
