/**
 * Represents a template (field layout) in TestRail.
 */
export interface Template {
  /** The unique ID of the template */
  id: number;
  /** The name of the template */
  name: string;
  /** True for the default template and false otherwise */
  is_default: boolean;
}

/**
 * Parameters for adding a new template.
 */
export interface AddTemplate {
  /** The name of the template */
  name: string;
  /** True to set as default template, false otherwise */
  is_default?: boolean;
}
