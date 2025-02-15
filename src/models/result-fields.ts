/**
 * Configuration context for a result field.
 */
export interface ResultFieldConfig {
  /** Context information for the field configuration */
  context: {
    /** Whether this configuration applies globally */
    is_global: boolean;
    /** List of project IDs this configuration applies to, null if global */
    project_ids: number[] | null;
  };
  /** Field options */
  options: {
    /** Whether the field is required */
    is_required: boolean;
    /** Default value for the field */
    default_value?: string;
    /** Format of the field (e.g., 'markdown') */
    format?: string;
    /** Number of rows for text fields */
    rows?: string;
    /** Whether the step results field has an actual result column */
    has_actual?: boolean;
    /** Whether the step results field has an expected result column */
    has_expected?: boolean;
  };
}

/**
 * Represents a custom field for test results.
 */
export interface ResultField {
  /** Unique identifier of the field */
  id: number;
  /** Internal name of the field */
  name: string;
  /** System name of the field (used when submitting) */
  system_name: string;
  /** Display label of the field */
  label: string;
  /** Description of the field */
  description: string | null;
  /** Type ID of the field:
   * - 1: String
   * - 2: Integer
   * - 3: Text
   * - 4: URL
   * - 5: Checkbox
   * - 6: Dropdown
   * - 7: User
   * - 8: Date
   * - 9: Milestone
   * - 11: Step Results
   * - 12: Multi-select
   */
  type_id: number;
  /** Location ID of the field */
  location_id: number;
  /** Display order in the UI */
  display_order: number;
  /** Whether to include the field in all templates */
  include_all: boolean;
  /** Whether the field is active */
  is_active: boolean;
  /** List of template IDs this field is included in */
  template_ids: number[];
  /** Field configurations per project */
  configs: ResultFieldConfig[];
}
