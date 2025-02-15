/**
 * Represents a test case type in TestRail
 */
export interface CaseType {
  /** The unique identifier of the case type */
  id: number;

  /** The name of the case type (e.g. "Automated", "Functionality", "Other") */
  name: string;

  /** Whether this is the default case type in TestRail */
  is_default: boolean;
}
