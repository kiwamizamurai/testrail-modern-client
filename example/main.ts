import {
  TestRailAPIError,
  TestRailClient,
  TestRailEnterpriseError,
  TestRailError,
  TestRailRateLimitError,
} from '../src';

// Check required environment variables
if (!process.env.TESTRAIL_HOST || !process.env.TESTRAIL_EMAIL || !process.env.TESTRAIL_API_KEY) {
  console.error('Required environment variables are not set');
  console.error('Please set: TESTRAIL_HOST, TESTRAIL_EMAIL, TESTRAIL_API_KEY');
  process.exit(1);
}

async function main() {
  const host = process.env.TESTRAIL_HOST;
  const email = process.env.TESTRAIL_EMAIL;
  const apiKey = process.env.TESTRAIL_API_KEY;

  if (!host || !email || !apiKey) {
    throw new Error('Required environment variables are not set');
  }

  const client = new TestRailClient({
    host,
    email,
    password: apiKey,
  });

  try {
    // Users
    console.log('\n=== Users ===');
    try {
      const currentUser = await client.users.getCurrentUser();
      console.log('Current user:', currentUser.name);
      const users = await client.users.list();
      console.log('Total users:', users.length);
    } catch (error) {
      if (error instanceof TestRailAPIError && error.status === 403) {
        console.log('Access denied: Requires admin permissions');
      } else {
        throw error;
      }
    }

    // Projects
    console.log('\n=== Projects ===');
    const projects = await client.projects.list();
    console.log('Total projects:', projects.length);

    if (projects.length === 0) {
      console.log('No projects available. Please ensure you have access to at least one project.');
      return;
    }

    // Using first project for subsequent tests
    const project = projects[0];
    console.log('Using project:', project.name);

    // Function to safely execute API calls
    async function safeApiCall<T>(
      name: string,
      apiCall: () => Promise<T>,
      processor?: (data: T) => void
    ) {
      try {
        console.log(`\n=== ${name} ===`);
        const result = await apiCall();
        if (processor) {
          processor(result);
        }
      } catch (error) {
        if (error instanceof TestRailAPIError) {
          if (error.status === 403) {
            console.log(`${name}: Access denied - Insufficient permissions`);
          } else {
            console.log(`${name}: API Error - ${error.message}`);
          }
        } else if (error instanceof TestRailEnterpriseError) {
          console.log(`${name}: Enterprise license required`);
        } else {
          throw error;
        }
      }
    }

    // Test all get/list methods
    await safeApiCall('Attachments', async () => {
      const suites = await client.suites.list(project.id);
      if (suites && suites.length > 0) {
        const cases = await client.cases.list(project.id, { suite_id: suites[0].id });
        if (cases && cases.length > 0) {
          const attachments = await client.attachments.getForCase(cases[0].id);
          console.log('Attachments for first case:', attachments?.length || 0);
        } else {
          console.log('No cases found in the first suite');
        }
      } else {
        console.log('No suites found in the project');
      }
    });

    await safeApiCall('BDD Features', async () => {
      const features = await client.bdd.get(project.id);
      console.log('Total BDD features:', features.length);
    });

    await safeApiCall('Case Fields', async () => {
      const fields = await client.caseFields.list();
      console.log('Total case fields:', fields.length);
    });

    await safeApiCall('Case Types', async () => {
      const types = await client.caseTypes.list();
      console.log('Total case types:', types.length);
    });

    await safeApiCall('Cases', async () => {
      const suites = await client.suites.list(project.id);
      if (suites && suites.length > 0) {
        const cases = await client.cases.list(project.id, { suite_id: suites[0].id });
        console.log('Total cases in first suite:', cases?.length || 0);
        if (cases && cases.length > 0) {
          const firstCase = await client.cases.get(cases[0].id);
          console.log('First case title:', firstCase.title);
        }
      } else {
        console.log('No suites found in the project');
      }
    });

    await safeApiCall('Configurations', async () => {
      const configs = await client.configurations.getConfigs(project.id);
      console.log('Total configurations:', configs.length);
    });

    await safeApiCall('Groups', async () => {
      const groups = await client.groups.list();
      console.log('Total groups:', groups.length);
    });

    await safeApiCall('Milestones', async () => {
      const milestones = await client.milestones.getMilestones(project.id);
      console.log('Total milestones:', milestones.length);
    });

    await safeApiCall('Plans', async () => {
      const plans = await client.plans.list(project.id);
      console.log('Total plans:', plans.length);
      if (plans && plans.length > 0) {
        const plan = await client.plans.get(plans[0].id);
        console.log('First plan name:', plan.name);
      }
    });

    await safeApiCall('Priorities', async () => {
      const priorities = await client.priorities.list();
      console.log('Total priorities:', priorities.length);
    });

    await safeApiCall('Reports', async () => {
      const reports = await client.reports.list(project.id);
      console.log('Total reports:', reports.length);
    });

    await safeApiCall('Result Fields', async () => {
      const fields = await client.resultFields.list();
      console.log('Total result fields:', fields.length);
    });

    await safeApiCall('Results & Runs', async () => {
      const runs = await client.runs.list(project.id);
      console.log('Total runs:', runs.length);
      if (runs && runs.length > 0) {
        const run = await client.runs.get(runs[0].id);
        console.log('First run name:', run.name);
        const tests = await client.tests.list(run.id);
        if (tests && tests.length > 0) {
          const results = await client.results.list(tests[0].id);
          console.log('Results for first test:', results.length);
        } else {
          console.log('No tests found in the first run');
        }
      }
    });

    await safeApiCall('Roles', async () => {
      const roles = await client.roles.list();
      console.log('Total roles:', roles.length);
    });

    await safeApiCall('Sections & Suites', async () => {
      const suites = await client.suites.list(project.id);
      console.log('Total suites:', suites.length);
      if (suites && suites.length > 0) {
        const suite = await client.suites.get(suites[0].id);
        console.log('First suite name:', suite.name);
        const sections = await client.sections.list(project.id, suite.id);
        console.log('Total sections:', sections?.length || 0);
        if (sections && sections.length > 0) {
          const section = await client.sections.get(sections[0].id);
          console.log('First section name:', section.name);
        }
      }
    });

    await safeApiCall('Shared Steps', async () => {
      const steps = await client.sharedSteps.list(project.id);
      console.log('Total shared steps:', steps?.length || 0);
      if (steps && steps.length > 0) {
        const step = await client.sharedSteps.get(steps[0].id);
        console.log('First shared step title:', step.title);
        const stepCases = await client.sharedSteps.getCases(steps[0].id);
        console.log('Cases using first shared step:', stepCases.length);
      }
    });

    await safeApiCall('Statuses', async () => {
      const statuses = await client.statuses.list();
      console.log('Total statuses:', statuses.length);
      const caseStatuses = await client.statuses.listForCase();
      console.log('Total case statuses:', caseStatuses.length);
    });

    await safeApiCall('Templates', async () => {
      const templates = await client.templates.list(project.id);
      console.log('Total templates:', templates.length);
    });

    await safeApiCall('Tests', async () => {
      const runs = await client.runs.list(project.id);
      if (runs && runs.length > 0) {
        const tests = await client.tests.list(runs[0].id);
        console.log('Tests in first run:', tests.length);
        if (tests && tests.length > 0) {
          const test = await client.tests.get(tests[0].id);
          console.log('First test title:', test.title);
        }
      }
    });

    await safeApiCall('Variables', async () => {
      const variables = await client.variables.list(project.id);
      console.log('Total variables:', variables.length);
    });

    await safeApiCall('Datasets (Enterprise)', async () => {
      const datasets = await client.datasets.list(project.id);
      console.log('Total datasets:', datasets.length);
    });
  } catch (error: unknown) {
    if (error instanceof TestRailRateLimitError) {
      console.log(`Rate limit exceeded. Retry after ${error.retryAfter} seconds`);
    } else if (error instanceof TestRailEnterpriseError) {
      console.log('Enterprise license required for this feature');
    } else if (error instanceof TestRailAPIError) {
      console.log(`API Error: ${error.message} (Status: ${error.status})`);
      if (error.data) {
        console.log('Error details:', error.data);
      }
    } else if (error instanceof TestRailError) {
      console.log('TestRail Error:', error.message);
    } else if (error instanceof Error) {
      console.log('Error:', error.message);
    } else {
      console.log('Unknown error:', error);
    }
  }
}

main().catch(console.error);
