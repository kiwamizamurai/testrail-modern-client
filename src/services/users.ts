import { AddUser, User } from '../models/users';
import { BaseService } from './base';

/**
 * Service for interacting with TestRail users.
 */
export class UserService extends BaseService {
  /**
   * Returns a list of users.
   * @param projectId - Optional project ID to filter users (Required for non-administrators)
   * @returns List of users
   * @throws {Error} - If the project is invalid (400)
   * @throws {Error} - If there are insufficient permissions (403)
   * @throws {Error} - If too many requests are made (429) - TestRail Cloud only
   * @note As of TestRail 6.6, only administrators can use this without a projectId parameter.
   * @note When projectId is provided, only returns users with explicit project access and their project-level roles.
   * @since TestRail 6.6
   */
  async list(projectId?: number): Promise<User[]> {
    const url = projectId ? `/get_users/${projectId}` : '/get_users';
    const response = await this.client.get<User[]>(url);
    return response.data;
  }

  /**
   * Returns an existing user.
   * @param userId - The ID of the user
   * @returns The requested user
   * @throws {Error} - If the user is invalid or unknown (400)
   * @throws {Error} - If too many requests are made (429) - TestRail Cloud only
   * @note Any user can retrieve their own account information. Retrieving other users requires administrator access.
   */
  async get(userId: number): Promise<User> {
    const response = await this.client.get(`/get_user/${userId}`);
    return response.data;
  }

  /**
   * Returns an existing user by email address.
   * @param email - The email address to get the user for
   * @returns The requested user
   * @throws {Error} - If the email address is invalid or unknown (400/404)
   * @throws {Error} - If too many requests are made (429) - TestRail Cloud only
   * @note Any user can retrieve their own account information. Retrieving other users requires administrator access.
   */
  async getByEmail(email: string): Promise<User> {
    const response = await this.client.get('/get_user_by_email', {
      params: { email },
    });
    return response.data;
  }

  /**
   * Creates a new user.
   * @param user - The user to create
   * @returns The created user
   * @throws {Error} - If the field value is invalid (400)
   * @throws {Error} - If there is no permission to create users (403)
   * @throws {Error} - If too many requests are made (429) - TestRail Cloud only
   * @since TestRail 7.3
   */
  async add(user: AddUser): Promise<User> {
    const response = await this.client.post('/add_user', user);
    return response.data;
  }

  /**
   * Updates an existing user.
   * @param userId - The ID of the user to update
   * @param user - The user fields to update
   * @returns The updated user
   * @throws {Error} - If the field value is invalid (400)
   * @throws {Error} - If there is no permission to update users (403)
   * @throws {Error} - If too many requests are made (429) - TestRail Cloud only
   */
  async update(userId: number, user: Partial<AddUser>): Promise<User> {
    const response = await this.client.post(`/update_user/${userId}`, user);
    return response.data;
  }

  /**
   * Returns the user for the current authentication credentials.
   * @returns The current user
   * @throws {Error} - If the user is invalid or unknown (400)
   * @throws {Error} - If too many requests are made (429) - TestRail Cloud only
   * @since TestRail 6.6
   */
  async getCurrentUser(): Promise<User> {
    const response = await this.client.get('/get_current_user');
    return response.data;
  }
}
