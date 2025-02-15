import {
  AddSection,
  MoveSection,
  Section,
  SectionResponse,
  UpdateSection,
} from '../models/sections';
import { BaseService } from './base';

/**
 * Service for managing TestRail sections.
 */
export class SectionService extends BaseService {
  /**
   * Returns a list of sections for a project and test suite.
   * @param projectId - The ID of the project
   * @param suiteId - The ID of the test suite (optional if the project is operating in single suite mode)
   * @param offset - Where to start counting the sections from (the offset)
   * @param limit - The number of sections the response should return (max 250)
   * @returns A list of sections
   * @throws {Error} 400 - Invalid or unknown project or test suite
   * @throws {Error} 403 - No access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async list(projectId: number, suiteId?: number, offset = 0, limit = 250): Promise<Section[]> {
    const response = await this.client.get<SectionResponse>(`/get_sections/${projectId}`, {
      params: {
        suite_id: suiteId,
        offset,
        limit,
      },
    });
    return response.data.sections;
  }

  /**
   * Returns an existing section.
   * @param sectionId - The ID of the section
   * @returns The section
   * @throws {Error} 400 - Invalid or unknown section
   * @throws {Error} 403 - No access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async get(sectionId: number): Promise<Section> {
    const response = await this.client.get<Section>(`/get_section/${sectionId}`);
    return response.data;
  }

  /**
   * Creates a new section.
   * @param projectId - The ID of the project
   * @param section - The section data to add
   * @returns The created section
   * @throws {Error} 400 - Invalid or unknown project or test suite
   * @throws {Error} 403 - No permissions to add sections or no access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async add(projectId: number, section: AddSection): Promise<Section> {
    const response = await this.client.post<Section>(`/add_section/${projectId}`, section);
    return response.data;
  }

  /**
   * Updates an existing section (partial updates are supported).
   * @param sectionId - The ID of the section
   * @param section - The section data to update
   * @returns The updated section
   * @throws {Error} 400 - Invalid or unknown section
   * @throws {Error} 403 - No permissions to modify sections or no access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async update(sectionId: number, section: UpdateSection): Promise<Section> {
    const response = await this.client.post<Section>(`/update_section/${sectionId}`, section);
    return response.data;
  }

  /**
   * Moves a section to another suite or section.
   * @param sectionId - The ID of the section
   * @param moveData - The move operation data
   * @returns The moved section
   * @throws {Error} 400 - Invalid or unknown section_id, parent_id, or after_id
   * @throws {Error} 403 - No permissions to add sections or no access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   * @since TestRail 6.5.2
   */
  async move(sectionId: number, moveData: MoveSection): Promise<Section> {
    const response = await this.client.post<Section>(`/move_section/${sectionId}`, moveData);
    return response.data;
  }

  /**
   * Deletes an existing section.
   * Note: Deleting a section cannot be undone and also deletes all related test cases as well as active tests & results.
   * @param sectionId - The ID of the section
   * @param soft - If true, only returns data about affected items without actually deleting
   * @throws {Error} 400 - Invalid or unknown section
   * @throws {Error} 403 - No permissions to delete sections or test cases or no access to the project
   * @throws {Error} 429 - Too many requests (TestRail Cloud only)
   */
  async delete(sectionId: number, soft?: boolean): Promise<void> {
    await this.client.post(`/delete_section/${sectionId}`, { soft: soft ? 1 : 0 });
  }
}
