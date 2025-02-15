/**
 * Represents a variable in TestRail.
 */
export interface Variable {
  /** The ID of the variable in the database */
  id: number;
  /** The name of the variable */
  name: string;
}

/**
 * Parameters for adding a new variable.
 */
export interface AddVariable {
  /** The name of the variable */
  name: string;
}

/**
 * Response for variable list request.
 */
export interface VariableResponse {
  /** The offset for pagination */
  offset: number;
  /** The limit for pagination */
  limit: number;
  /** The total number of items */
  size: number;
  /** Pagination links */
  _links: {
    /** URL for the next page, null if no next page exists */
    next: string | null;
    /** URL for the previous page, null if no previous page exists */
    prev: string | null;
  };
  /** List of variables */
  variables: Variable[];
}
