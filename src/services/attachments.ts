import * as fs from 'fs';
import FormData from 'form-data';
import { AddAttachmentResponse, Attachment, AttachmentResponse } from '../models/attachments';
import { BaseService } from './base';

/**
 * Service class for managing TestRail attachments.
 * @since TestRail 6.3
 */
export class AttachmentService extends BaseService {
  /**
   * Creates form data with file for attachment upload
   */
  private createFormData(filePath: string): FormData {
    console.log('Creating FormData for file:', filePath);
    const form = new FormData();
    const fileStream = fs.createReadStream(filePath);
    console.log('File stream created');

    // Log file stats
    const stats = fs.statSync(filePath);
    console.log('File stats:', {
      size: stats.size,
      isFile: stats.isFile(),
      path: filePath,
    });

    // TestRail expects the file in a field named 'attachment'
    form.append('attachment', fileStream, {
      filename: filePath.split('/').pop(),
      contentType: 'application/octet-stream',
    });

    // Log form headers
    const headers = form.getHeaders();
    console.log('Form headers:', headers);

    return form;
  }

  /**
   * Adds an attachment to a test case.
   * @param caseId - The ID of the test case
   * @param filePath - The path to the file to attach
   * @returns The created attachment ID
   * @throws {Error} 400 - Invalid or unknown test case
   * @throws {Error} 403 - No permissions to add attachments or no access to the project
   * @throws {Error} 413 - File too large (TestRail Cloud only)
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async addToCase(caseId: number, filePath: string): Promise<AddAttachmentResponse> {
    console.log(`Adding attachment to case ${caseId}:`, filePath);
    const form = this.createFormData(filePath);

    try {
      // Override the default content-type with form-data boundary
      const headers = {
        ...form.getHeaders(),
        'Content-Type': form.getHeaders()['content-type'],
      };
      console.log('Request headers:', headers);

      const response = await this.client.post(`/add_attachment_to_case/${caseId}`, form, {
        headers,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });
      console.log('Upload response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Upload error:', error);
      console.error('Request details:', {
        url: `/add_attachment_to_case/${caseId}`,
        headers: form.getHeaders(),
        fileExists: fs.existsSync(filePath),
      });
      throw error;
    }
  }

  /**
   * Adds an attachment to a test plan.
   * @param planId - The ID of the test plan
   * @param filePath - The path to the file to attach
   * @returns The created attachment ID
   * @throws {Error} 400 - Invalid or unknown test plan
   * @throws {Error} 403 - No permissions to add attachments or no access to the project
   * @throws {Error} 413 - File too large (TestRail Cloud only)
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async addToPlan(planId: number, filePath: string): Promise<AddAttachmentResponse> {
    const form = this.createFormData(filePath);
    const response = await this.client.post(`/add_attachment_to_plan/${planId}`, form, {
      headers: { ...form.getHeaders() },
    });
    return response.data;
  }

  /**
   * Adds an attachment to a test plan entry.
   * @param planId - The ID of the test plan
   * @param entryId - The ID of the test plan entry
   * @param filePath - The path to the file to attach
   * @returns The created attachment ID
   * @throws {Error} 400 - Invalid or unknown test plan/entry
   * @throws {Error} 403 - No permissions to add attachments or no access to the project
   * @throws {Error} 413 - File too large (TestRail Cloud only)
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async addToPlanEntry(
    planId: number,
    entryId: number,
    filePath: string
  ): Promise<AddAttachmentResponse> {
    const form = this.createFormData(filePath);
    const response = await this.client.post(
      `/add_attachment_to_plan_entry/${planId}/${entryId}`,
      form,
      {
        headers: { ...form.getHeaders() },
      }
    );
    return response.data;
  }

  /**
   * Adds an attachment to a test run.
   * @param runId - The ID of the test run
   * @param filePath - The path to the file to attach
   * @returns The created attachment ID
   * @throws {Error} 400 - Invalid or unknown test run
   * @throws {Error} 403 - No permissions to add attachments or no access to the project
   * @throws {Error} 413 - File too large (TestRail Cloud only)
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async addToRun(runId: number, filePath: string): Promise<AddAttachmentResponse> {
    const form = this.createFormData(filePath);
    const response = await this.client.post(`/add_attachment_to_run/${runId}`, form, {
      headers: { ...form.getHeaders() },
    });
    return response.data;
  }

  /**
   * Adds an attachment to a test result.
   * @param resultId - The ID of the test result
   * @param filePath - The path to the file to attach
   * @returns The created attachment ID
   * @throws {Error} 400 - Invalid or unknown test result
   * @throws {Error} 403 - No permissions to add attachments or no access to the project
   * @throws {Error} 413 - File too large (TestRail Cloud only)
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async addToResult(resultId: number, filePath: string): Promise<AddAttachmentResponse> {
    const form = this.createFormData(filePath);
    const response = await this.client.post(`/add_attachment_to_result/${resultId}`, form, {
      headers: { ...form.getHeaders() },
    });
    return response.data;
  }

  /**
   * Gets an attachment by ID.
   * @param attachmentId - The ID of the attachment
   * @returns The attachment file content
   */
  async get(attachmentId: number | string): Promise<Buffer> {
    const response = await this.client.get(`/get_attachment/${attachmentId}`, {
      responseType: 'arraybuffer',
    });
    return response.data;
  }

  /**
   * Deletes an attachment.
   * @param attachmentId - The ID of the attachment to delete
   * @throws {Error} 400 - Invalid or unknown attachment
   * @throws {Error} 403 - No permissions to delete attachments or no access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async delete(attachmentId: number): Promise<void> {
    await this.client.post(`/delete_attachment/${attachmentId}`);
  }

  async getForCase(caseId: number): Promise<Attachment[]> {
    const response = await this.client.get<AttachmentResponse>(
      `/get_attachments_for_case/${caseId}`
    );
    return response.data.attachments;
  }

  async getForPlan(planId: number): Promise<Attachment[]> {
    const response = await this.client.get<AttachmentResponse>(
      `/get_attachments_for_plan/${planId}`
    );
    return response.data.attachments;
  }

  async getForPlanEntry(planId: number, entryId: string): Promise<Attachment[]> {
    const response = await this.client.get<AttachmentResponse>(
      `/get_attachments_for_plan_entry/${planId}/${entryId}`
    );
    return response.data.attachments;
  }

  async getForRun(runId: number): Promise<Attachment[]> {
    const response = await this.client.get<AttachmentResponse>(`/get_attachments_for_run/${runId}`);
    return response.data.attachments;
  }

  async getForTest(testId: number): Promise<Attachment[]> {
    const response = await this.client.get<AttachmentResponse>(
      `/get_attachments_for_test/${testId}`
    );
    return response.data.attachments;
  }
}
