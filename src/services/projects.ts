import { Project } from '../models/projects';
import { BaseService } from './base';

export class ProjectService extends BaseService {
  /**
   * Returns a list of available projects.
   */
  async list(offset = 0, limit = 250): Promise<Project[]> {
    const response = await this.client.get<{ projects: Project[] }>('/get_projects', {
      params: { offset, limit },
    });
    return response.data.projects;
  }

  /**
   * Returns an existing project.
   */
  async get(projectId: number): Promise<Project> {
    const response = await this.client.get(`/get_project/${projectId}`);
    return response.data;
  }

  /**
   * Creates a new project.
   */
  async add(project: Omit<Project, 'id'>): Promise<Project> {
    const response = await this.client.post('/add_project', project);
    return response.data;
  }

  /**
   * Updates an existing project.
   */
  async update(projectId: number, project: Partial<Project>): Promise<Project> {
    const response = await this.client.post(`/update_project/${projectId}`, project);
    return response.data;
  }

  /**
   * Deletes an existing project.
   */
  async delete(projectId: number): Promise<void> {
    await this.client.post(`/delete_project/${projectId}`);
  }
}
