import axios, { AxiosInstance } from 'axios';
import { TestRailConfig } from './models/common';
import { AttachmentService } from './services/attachments';
import { BDDService } from './services/bdd';
import { CaseFieldService } from './services/case-fields';
import { CaseTypeService } from './services/case-types';
import { CaseService } from './services/cases';
import { ConfigurationService } from './services/configurations';
import { DatasetService } from './services/datasets';
import { GroupService } from './services/groups';
import { MilestoneService } from './services/milestones';
import { PlanService } from './services/plans';
import { PrioritiesService } from './services/priorities';
import { ProjectService } from './services/projects';
import { ReportService } from './services/reports';
import { ResultFieldService } from './services/result-fields';
import { ResultService } from './services/results';
import { RoleService } from './services/roles';
import { RunService } from './services/runs';
import { SectionService } from './services/sections';
import { SharedStepService } from './services/shared-steps';
import { StatusService } from './services/statuses';
import { SuiteService } from './services/suites';
import { TemplateService } from './services/templates';
import { TestService } from './services/tests';
import { UserService } from './services/users';
import { VariableService } from './services/variables';

export class TestRailError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TestRailError';
  }
}

export class TestRailAPIError extends TestRailError {
  status: number;
  data?: Record<string, unknown>;

  constructor(message: string, status: number, data?: Record<string, unknown>) {
    super(message);
    this.name = 'TestRailAPIError';
    this.status = status;
    this.data = data;
  }
}

export class TestRailRateLimitError extends TestRailError {
  retryAfter: number;

  constructor(retryAfter: number) {
    super('API rate limit exceeded');
    this.name = 'TestRailRateLimitError';
    this.retryAfter = retryAfter;
  }
}

export class TestRailEnterpriseError extends TestRailError {
  constructor() {
    super('Enterprise license/subscription required');
    this.name = 'TestRailEnterpriseError';
  }
}

// https://www.techmatrix.co.jp/secure/quality/testrail/cloud_maintenance.html
export class TestRailMaintenanceError extends TestRailError {
  constructor() {
    super('TestRail is currently under maintenance');
    this.name = 'TestRailMaintenanceError';
  }
}

export class TestRailClient {
  private client: AxiosInstance;

  // Services
  readonly projects: ProjectService;
  readonly cases: CaseService;
  readonly suites: SuiteService;
  readonly sections: SectionService;
  readonly runs: RunService;
  readonly results: ResultService;
  readonly resultFields: ResultFieldService;
  readonly roles: RoleService;
  readonly milestones: MilestoneService;
  readonly attachments: AttachmentService;
  readonly bdd: BDDService;
  readonly configurations: ConfigurationService;
  readonly datasets: DatasetService;
  readonly groups: GroupService;
  readonly priorities: PrioritiesService;
  readonly reports: ReportService;
  readonly sharedSteps: SharedStepService;
  readonly statuses: StatusService;
  readonly templates: TemplateService;
  readonly tests: TestService;
  readonly users: UserService;
  readonly variables: VariableService;
  readonly plans: PlanService;
  readonly caseFields: CaseFieldService;
  readonly caseTypes: CaseTypeService;

  constructor(config: TestRailConfig) {
    this.client = axios.create({
      baseURL: `${config.host}/index.php?/api/v2`,
      auth: {
        username: config.email,
        password: config.password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Initialize services
    this.projects = new ProjectService(this.client);
    this.cases = new CaseService(this.client);
    this.suites = new SuiteService(this.client);
    this.sections = new SectionService(this.client);
    this.runs = new RunService(this.client);
    this.results = new ResultService(this.client);
    this.resultFields = new ResultFieldService(this.client);
    this.roles = new RoleService(this.client);
    this.milestones = new MilestoneService(this.client);
    this.attachments = new AttachmentService(this.client);
    this.bdd = new BDDService(this.client);
    this.configurations = new ConfigurationService(this.client);
    this.datasets = new DatasetService(this.client);
    this.groups = new GroupService(this.client);
    this.priorities = new PrioritiesService(this.client);
    this.reports = new ReportService(this.client);
    this.sharedSteps = new SharedStepService(this.client);
    this.statuses = new StatusService(this.client);
    this.templates = new TemplateService(this.client);
    this.tests = new TestService(this.client);
    this.users = new UserService(this.client);
    this.variables = new VariableService(this.client);
    this.plans = new PlanService(this.client);
    this.caseFields = new CaseFieldService(this.client);
    this.caseTypes = new CaseTypeService(this.client);

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!error.response) {
          throw new TestRailError('Network error or no response from TestRail');
        }

        const { status, data } = error.response;

        if (status === 429) {
          const retryAfter = parseInt(error.response.headers['retry-after'] || '60', 10);
          throw new TestRailRateLimitError(retryAfter);
        }

        if (status === 503) {
          throw new TestRailMaintenanceError();
        }

        if (status === 403 && data?.error?.includes('Enterprise')) {
          throw new TestRailEnterpriseError();
        }

        const errorMessage = data?.error || error.message || 'Unknown TestRail API error';
        throw new TestRailAPIError(errorMessage, status, data);
      }
    );
  }
}
