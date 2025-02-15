import { AddTemplate, Template } from '../models/templates';
import { BaseService } from './base';

/**
 * Service for interacting with TestRail templates (field layouts).
 * @since TestRail 5.2
 */
export class TemplateService extends BaseService {
  /**
   * Returns a list of available templates for a project.
   * @param projectId - The ID of the project
   * @param offset - Optional pagination offset
   * @param limit - Optional pagination limit
   * @returns List of templates
   * @throws {Error} - If the project is invalid or unknown (400)
   * @throws {Error} - If there is no access to the project (403)
   * @throws {Error} - If too many requests are made (429) - TestRail Cloud only
   */
  async list(projectId: number): Promise<Template[]> {
    const response = await this.client.get<Template[]>(`/get_templates/${projectId}`);
    return response.data;
  }

  /**
   * Returns an existing template.
   * @param templateId - The ID of the template
   * @returns The requested template
   */
  async get(templateId: number): Promise<Template> {
    const response = await this.client.get<Template>(`/templates/${templateId}`);
    return response.data;
  }

  /**
   * Creates a new template.
   */
  async add(projectId: number, template: AddTemplate): Promise<Template> {
    const response = await this.client.post(`/projects/${projectId}/templates`, template);
    return response.data;
  }

  /**
   * Updates an existing template.
   */
  async update(templateId: number, template: Partial<AddTemplate>): Promise<Template> {
    const response = await this.client.post(`/templates/${templateId}`, template);
    return response.data;
  }

  /**
   * Deletes an existing template.
   */
  async delete(templateId: number): Promise<void> {
    await this.client.post(`/templates/${templateId}`);
  }
}
