/**
 * Represents a variable within a dataset.
 */
export interface DatasetVariable {
  /** The unique ID of the variable */
  id: number;
  /** The name of the variable */
  name: string;
  /** The value of the variable in the dataset */
  value: string;
}

/**
 * Represents a dataset in TestRail.
 */
export interface Dataset {
  /** The unique ID of the dataset */
  id?: number;
  /** The name of the dataset */
  name: string;
  /** Array of variables and their values in this dataset */
  variables: DatasetVariable[];
  /** Optional description of the dataset */
  description?: string;
  /** The ID of the project this dataset belongs to */
  project_id: number;
  /** Timestamp when the dataset was created */
  created_on?: number;
  /** ID of the user who created the dataset */
  created_by?: number;
  /** Timestamp when the dataset was last updated */
  updated_on?: number;
  /** ID of the user who last updated the dataset */
  updated_by?: number;
}

/**
 * Filter parameters for dataset requests.
 */
export interface DatasetFilter {
  /** Filter by project ID */
  project_id?: number;
  /** Filter by dataset name */
  name?: string;
  /** Filter by creator user ID */
  created_by?: number;
}

/**
 * Represents a dataset item (variable value) in TestRail.
 */
export interface DatasetItem {
  /** The unique ID of the dataset item */
  id?: number;
  /** The ID of the dataset this item belongs to */
  dataset_id: number;
  /** The name of the variable */
  name: string;
  /** The value of the variable */
  value: string;
  /** Timestamp when the item was created */
  created_on?: number;
  /** ID of the user who created the item */
  created_by?: number;
  /** Timestamp when the item was last updated */
  updated_on?: number;
  /** ID of the user who last updated the item */
  updated_by?: number;
}

/**
 * Filter parameters for dataset item requests.
 */
export interface DatasetItemFilter {
  /** Filter by dataset ID */
  dataset_id?: number;
  /** Filter by variable name */
  name?: string;
}
