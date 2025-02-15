/**
 * Represents a test case priority in TestRail.
 */
export interface Priority {
  /** The unique ID of the priority */
  id: number;
  /** The full name of the priority */
  name: string;
  /** The short version of the priority name */
  short_name: string;
  /** True for the default priority and false otherwise */
  is_default: boolean;
  /** The order/position of the priority */
  priority: number;
}
