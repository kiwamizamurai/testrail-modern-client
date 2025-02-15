export interface Project {
  id: number;
  name: string;
  announcement: string;
  show_announcement: boolean;
  is_completed: 0 | 1;
  completed_on: number;
  suite_mode: number;
  default_role_id: number;
  default_role_name: string;
  master_id: number;
  master_name: string;
  refs_pattern: string;
  refs_pattern_error: string;
  url: string;
  created_on: number;
  created_by: number;
  updated_on: number;
  updated_by: number;
}

export interface ProjectResponse {
  offset: number;
  limit: number;
  size: number;
  _links: {
    next: string | null;
    prev: string | null;
  };
  projects: Project[];
}

export interface ProjectFilters {
  is_completed?: 0 | 1;
  suite_mode?: number;
  created_after?: number;
  created_before?: number;
  created_by?: number[];
  updated_after?: number;
  updated_before?: number;
  updated_by?: number[];
}
