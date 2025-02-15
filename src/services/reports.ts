import { Report, ReportRun } from '../models/reports';
import { BaseService } from './base';

/**
 * Service for managing TestRail reports.
 * @since TestRail 5.7
 */
export class ReportService extends BaseService {
  /**
   * Returns a list of API available reports by project.
   * @param projectId - The ID of the project for which you want a list of API accessible reports
   * @param offset - The offset of the first record to return (used for pagination)
   * @param limit - The maximum number of records to return (used for pagination)
   * @returns A list of available reports
   * @throws {Error} 400 - Invalid or unknown project
   * @throws {Error} 403 - No access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async list(projectId: number, offset = 0, limit = 250): Promise<Report[]> {
    const response = await this.client.get<Report[]>(`/get_reports/${projectId}`, {
      params: { offset, limit },
    });
    return response.data;
  }

  /**
   * Executes an existing report and returns URLs for accessing the report.
   * @param reportId - The ID of the report template to run
   * @returns The report run details including URLs for HTML and PDF formats
   * @throws {Error} 400 - Invalid report template ID
   * @throws {Error} 403 - No access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async run(reportId: number): Promise<ReportRun> {
    const response = await this.client.post(`/reports/${reportId}/run`);
    return response.data;
  }
}
