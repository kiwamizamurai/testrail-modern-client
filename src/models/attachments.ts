import { PaginationFilter } from './common';

/**
 * Represents an attachment in TestRail
 * @since TestRail 5.7
 */
export interface Attachment {
  /** The unique ID for the attachment (string after TestRail 7.1, number before) */
  id: string | number;
  /** Name of the attachment */
  name: string;
  /** Original filename of the attachment */
  filename?: string;
  /** Size of the attachment in bytes */
  size: number;
  /** The time/date the attachment was uploaded */
  created_on: number;
  /** The ID of the project the attachment was uploaded against */
  project_id: number;
  /** The ID of the case the attachment belongs to */
  case_id?: number;
  /** The ID of the user who uploaded the attachment */
  user_id: number;
  /** The test result ID to which the attachment belongs */
  result_id?: number;
  /** The ID of the attachment record (not the ID of the attachment itself) */
  entity_attachments_id?: number;
  /** The name of the icon used within the TestRail UI */
  icon_name?: string;
  // Fields added after TestRail 7.1
  /** The client ID (TestRail 7.1+) */
  client_id?: number;
  /** The type of entity this attachment belongs to (TestRail 7.1+) */
  entity_type?: string;
  /** The data ID of the attachment (TestRail 7.1+) */
  data_id?: string;
  /** The ID of the entity this attachment belongs to (TestRail 7.1+) */
  entity_id?: string;
  /** The file type of the attachment (TestRail 7.1+) */
  filetype?: string;
  /** The legacy ID if applicable (TestRail 7.1+) */
  legacy_id?: number;
  /** Whether the attachment is an image (TestRail 7.1+) */
  is_image?: boolean;
  /** The icon type of the attachment (TestRail 7.1+) */
  icon?: string;
}

/**
 * Response structure for attachment list endpoints
 * @since TestRail 6.7
 */
export interface AttachmentResponse {
  /** Starting position of the returned attachments */
  offset: number;
  /** Maximum number of attachments to return (default: 250) */
  limit: number;
  /** Total number of attachments */
  size: number;
  /** Pagination links */
  _links: {
    /** URL for the next page of results */
    next: string | null;
    /** URL for the previous page of results */
    prev: string | null;
  };
  /** List of attachments */
  attachments: Attachment[];
}

/**
 * Response when adding a new attachment
 */
export interface AddAttachmentResponse {
  /** The ID of the attachment uploaded to TestRail */
  attachment_id: number | string;
}

/**
 * Filter options for attachment list endpoints
 * @since TestRail 6.7
 */
export interface AttachmentFilter extends PaginationFilter {
  /** Filter by case ID */
  case_id?: number;
  /** Filter by test ID */
  test_id?: number;
  /** Filter by run ID */
  run_id?: number;
  /** Filter by plan ID */
  plan_id?: number;
  /** Filter by entry ID */
  entry_id?: number;
  /** Filter by result ID */
  result_id?: number;
}
