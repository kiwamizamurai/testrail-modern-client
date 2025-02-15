/**
 * Represents a TestRail section.
 */
export interface Section {
  /** The level in the section hierarchy of the test suite */
  depth: number;
  /** The description of the section */
  description: string | null;
  /** The order in the test suite */
  display_order: number;
  /** The unique ID of the section */
  id: number;
  /** The name of the section */
  name: string;
  /** The ID of the parent section in the test suite */
  parent_id: number | null;
  /** The ID of the test suite this section belongs to */
  suite_id: number;
}

/**
 * Response structure when listing sections.
 */
export interface SectionResponse {
  /** Current offset in pagination */
  offset: number;
  /** Maximum number of items per page */
  limit: number;
  /** Total number of items */
  size: number;
  /** Pagination links */
  _links: {
    /** URL for the next page, null if no next page exists */
    next: string | null;
    /** URL for the previous page, null if no previous page exists */
    prev: string | null;
  };
  /** List of sections */
  sections: Section[];
}

/**
 * Request body for adding a new section.
 */
export interface AddSection {
  /** The description of the section */
  description?: string;
  /** The ID of the test suite (ignored if the project is operating in single suite mode, required otherwise) */
  suite_id?: number;
  /** The ID of the parent section (to build section hierarchies) */
  parent_id?: number;
  /** The name of the section */
  name: string;
}

/**
 * Request body for moving a section.
 * @since TestRail 6.5.2
 */
export interface MoveSection {
  /** The ID of the parent section (it can be null if it should be moved to the root). Must be in the same project and suite. May not be a direct child of the section being moved. */
  parent_id?: number | null;
  /** The section ID after which the section should be put (can be null) */
  after_id?: number | null;
}

/**
 * Request body for updating a section.
 */
export interface UpdateSection {
  /** The description of the section */
  description?: string;
  /** The name of the section */
  name?: string;
}
