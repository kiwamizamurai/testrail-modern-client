import { Dataset, DatasetItem, DatasetItemFilter } from '../models/datasets';
import { BaseService } from './base';

/**
 * Service class for managing TestRail datasets.
 * Datasets are used to store and manage test data variables and their values.
 */
export class DatasetService extends BaseService {
  /**
   * Returns a list of available datasets for a project.
   *
   * API Path: GET index.php?/api/v2/get_datasets/:project_id
   *
   * @param projectId The ID of the project from which to retrieve datasets
   * @returns Array of datasets in the project
   * @throws {Error} 400 - Invalid or missing project_id
   * @throws {Error} 401 - Authentication failure
   * @throws {Error} 403 - Insufficient permissions or not an Enterprise license
   */
  async list(projectId: number): Promise<Dataset[]> {
    const response = await this.client.get<Dataset[]>(`/get_datasets/${projectId}`);
    return response.data;
  }

  /**
   * Retrieves a specific dataset by ID.
   *
   * API Path: GET index.php?/api/v2/get_dataset/:dataset_id
   *
   * @param datasetId The ID of the dataset to retrieve
   * @returns The requested dataset with its variables
   * @throws {Error} 400 - Invalid or missing dataset_id
   * @throws {Error} 401 - Authentication failure
   * @throws {Error} 403 - Insufficient permissions or not an Enterprise license
   */
  async get(datasetId: number): Promise<Dataset> {
    const response = await this.client.get(`/get_dataset/${datasetId}`);
    return response.data;
  }

  /**
   * Creates a new dataset in a project.
   *
   * API Path: POST index.php?/api/v2/add_dataset/:project_id
   *
   * @param projectId The ID of the project to which the dataset should be added
   * @param dataset The dataset to create (without ID)
   * @returns The created dataset
   * @throws {Error} 400 - Invalid project_id, invalid dataset name, duplicate name, invalid variables, or exceeded limit
   * @throws {Error} 401 - Authentication failure
   * @throws {Error} 403 - Insufficient permissions or not an Enterprise license
   */
  async add(projectId: number, dataset: Omit<Dataset, 'id'>): Promise<Dataset> {
    const response = await this.client.post(`/add_dataset/${projectId}`, dataset);
    return response.data;
  }

  /**
   * Updates an existing dataset.
   *
   * API Path: POST index.php?/api/v2/update_dataset/:dataset_id
   *
   * @param datasetId The ID of the dataset to update
   * @param dataset The dataset updates
   * @returns The updated dataset
   * @throws {Error} 400 - Invalid dataset_id, invalid name, duplicate name, invalid variables, or exceeded limit
   * @throws {Error} 401 - Authentication failure
   * @throws {Error} 403 - Insufficient permissions or not an Enterprise license
   */
  async update(datasetId: number, dataset: Partial<Dataset>): Promise<Dataset> {
    const response = await this.client.post(`/update_dataset/${datasetId}`, dataset);
    return response.data;
  }

  /**
   * Deletes an existing dataset.
   * Warning: This operation cannot be undone and will remove all dataset values.
   * Note: The Default dataset cannot be deleted.
   *
   * API Path: POST index.php?/api/v2/delete_dataset/:dataset_id
   *
   * @param datasetId The ID of the dataset to delete
   * @throws {Error} 400 - Invalid dataset_id or attempt to delete Default dataset
   * @throws {Error} 401 - Authentication failure
   * @throws {Error} 403 - Insufficient permissions or not an Enterprise license
   */
  async delete(datasetId: number): Promise<void> {
    await this.client.post(`/delete_dataset/${datasetId}`);
  }

  /**
   * Retrieves dataset items based on filters.
   *
   * @param filters Optional filters for dataset items
   * @returns Array of dataset items matching the filters
   */
  async getDatasetItems(filters?: DatasetItemFilter): Promise<DatasetItem[]> {
    const response = await this.client.get<DatasetItem[]>('/get_dataset_items', {
      params: filters,
    });
    return response.data;
  }

  /**
   * Creates a new dataset item.
   *
   * @param item The dataset item to create (without ID)
   * @returns The created dataset item
   */
  async addDatasetItem(item: Omit<DatasetItem, 'id'>): Promise<DatasetItem> {
    const response = await this.client.post('/add_dataset_item', item);
    return response.data;
  }

  /**
   * Updates an existing dataset item.
   *
   * @param itemId The ID of the dataset item to update
   * @param item The dataset item updates
   * @returns The updated dataset item
   */
  async updateDatasetItem(itemId: number, item: Partial<DatasetItem>): Promise<DatasetItem> {
    const response = await this.client.post(`/update_dataset_item/${itemId}`, item);
    return response.data;
  }

  /**
   * Deletes an existing dataset item.
   *
   * @param itemId The ID of the dataset item to delete
   */
  async deleteDatasetItem(itemId: number): Promise<void> {
    await this.client.post(`/delete_dataset_item/${itemId}`);
  }
}
