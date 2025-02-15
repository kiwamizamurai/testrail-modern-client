/**
 * Represents a custom field configuration for test cases
 */
export interface CaseField {
  /** The unique identifier of the field */
  id: number;
  /** The type ID of the field */
  type_id: number;
  /** The name of the field */
  name: string;
  /** The system name of the field */
  system_name: string;
  /** The label of the field */
  label: string;
  /** The description of the field */
  description: string;
  /** Whether to include all templates */
  include_all: boolean;
  /** The IDs of templates this field belongs to */
  template_ids: number[];
  /** The display order of the field */
  display_order: number;
  /** Whether the field is active */
  is_active: boolean;
  /** The IDs of statuses this field is available for */
  status_ids: number[];
  /** Whether this is a system field */
  is_system: boolean;
  /** Field configuration */
  configs: CaseFieldConfig[];
}

/**
 * Configuration for a case field
 */
export interface CaseFieldConfig {
  /** Context configuration */
  context: {
    /** Whether the field is global */
    is_global: boolean;
    /** The IDs of projects this field is available for */
    project_ids: number[] | null;
  };
  /** Field options */
  options: {
    /** Whether the field is required */
    is_required: boolean;
    /** The default value of the field */
    default_value?: string;
    /** The format of the field (plain or markdown) */
    format?: string;
    /** The number of rows for text fields */
    rows?: string;
    /** The items for dropdown/multiselect fields */
    items?: string;
  };
}

/**
 * Parameters for creating a new case field
 */
export interface AddCaseField {
  /** The type of the field */
  type: string;
  /** The name of the field */
  name: string;
  /** The label of the field */
  label: string;
  /** The description of the field */
  description?: string;
  /** Whether to include all templates */
  include_all?: boolean;
  /** The IDs of templates this field belongs to */
  template_ids?: number[];
  /** Field configurations */
  configs: CaseFieldConfig[];
}

/**
 * Available case field types
 */
export enum CaseFieldType {
  String = 1,
  Integer = 2,
  Text = 3,
  URL = 4,
  Checkbox = 5,
  Dropdown = 6,
  User = 7,
  Date = 8,
  Milestone = 9,
  Steps = 10,
  MultiSelect = 12,
}
