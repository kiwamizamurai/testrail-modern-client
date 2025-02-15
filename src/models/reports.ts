/**
 * Represents a TestRail report configuration.
 * @since TestRail 5.7
 */
export interface Report {
  /** The unique ID for the report */
  id: number;
  /** Name of the report */
  name: string;
  /** Description of the report */
  description: string;
  /** Indicates whether the author should be notified once the report has been executed */
  notify_user: boolean;
  /** Indicates whether emails with links to the report should be sent */
  notify_link: boolean;
  /** List of users to whom the report should be sent */
  notify_link_recipients: string;
  /** Indicates whether the report should be emailed as an attachment */
  notify_attachment: boolean;
  /** List of email recipients for attachments */
  notify_attachment_recipients: string;
  /** Indicates whether the report should be emailed in HTML format */
  notify_attachment_html_format: boolean;
  /** Indicates whether the report should be emailed in PDF format */
  notify_attachment_pdf_format: boolean;
  /** How cases are grouped in the report */
  cases_groupby: string;
  /** Columns to include for cases */
  cases_columns: string[];
  /** Filters applied to cases */
  cases_filters: string[];
  /** Maximum number of cases to include */
  cases_limit: number;
  /** How defects are grouped in the report */
  defects_groupby: string;
  /** Columns to include for defects */
  defects_columns: string[];
  /** Filters applied to defects */
  defects_filters: string[];
  /** Maximum number of defects to include */
  defects_limit: number;
  /** How results are grouped in the report */
  results_groupby: string;
  /** Columns to include for results */
  results_columns: string[];
  /** Filters applied to results */
  results_filters: string[];
  /** Maximum number of results to include */
  results_limit: number;
  /** ID of the user who created the report */
  created_by: number;
  /** Timestamp when the report was created */
  created_on: number;
  /** System identifier for the report */
  system_name: string;
  /** Whether this is a system report */
  is_system: boolean;
}
/**
 * Represents a report execution instance.
 */
export interface ReportRun {
  /** Unique identifier for this report run */
  id: number;
  /** ID of the report template used */
  report_id: number;
  /** ID of the report template */
  report_template_id: number;
  /** Name of the report */
  name: string;
  /** Status ID of the report run */
  status_id: number;
  /** Text description of the status */
  status_text: string;
  /** Description of this report run */
  description: string;
  /** ID of the user who created this run */
  created_by: number;
  /** Timestamp when the run was created */
  created_on: number;
  /** Error message if the run failed, null otherwise */
  error: string | null;
  /** URL to access the report */
  url: string;
}
