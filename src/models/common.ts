export interface TestRailConfig {
  host: string;
  email: string;
  password: string;
}

export interface TestRailResponse<T> {
  offset?: number;
  limit?: number;
  size?: number;
  _links?: {
    next?: string;
    prev?: string;
  };
  data:
    | T[]
    | {
        cases?: T[];
        projects?: T[];
        suites?: T[];
        sections?: T[];
        runs?: T[];
        tests?: T[];
        results?: T[];
        milestones?: T[];
        attachments?: T[];
      };
}

export interface BaseFilter {
  offset?: number;
  limit?: number;
}

export interface PaginationFilter {
  limit?: number;
  offset?: number;
}
