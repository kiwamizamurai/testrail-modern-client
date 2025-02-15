import { BaseFilter } from './common';

/**
 * Represents a milestone in TestRail.
 */
export interface Milestone {
  /** The unique ID of the milestone */
  id: number;
  /** The name of the milestone */
  name: string;
  /** The description of the milestone */
  description: string | null;
  /** The scheduled start date/time of the milestone (as UNIX timestamp) - requires TestRail 5.3 or later */
  start_on: number | null;
  /** The date/time when the milestone was started (as UNIX timestamp) - requires TestRail 5.3 or later */
  started_on: number | null;
  /** The due date/time of the milestone (as UNIX timestamp) */
  due_on: number | null;
  /** The date/time when the milestone was marked as completed (as UNIX timestamp) */
  completed_on: number | null;
  /** The ID of the parent milestone the milestone belongs to (if any) - requires TestRail 5.3 or later */
  parent_id: number | null;
  /** The ID of the project the milestone belongs to */
  project_id: number;
  /** A comma-separated list of references/requirements - requires TestRail 6.4 or later */
  refs: string | null;
  /** The address/URL of the milestone in the user interface */
  url: string;
  /** True if the milestone is marked as completed and false otherwise */
  is_completed: boolean;
  /** True if the milestone is marked as started and false otherwise - requires TestRail 5.3 or later */
  is_started: boolean;
  /** The sub milestones that belong to the milestone (if any) - requires TestRail 5.3 or later */
  milestones: Milestone[];
}

/**
 * Parameters for updating a milestone.
 * Partial updates are supported, i.e. you can submit and update specific fields only.
 */
export interface UpdateMilestone {
  /** The name of the milestone */
  name?: string;
  /** The description of the milestone */
  description?: string;
  /** The due date of the milestone (as UNIX timestamp) */
  due_on?: number;
  /** The scheduled start date of the milestone (as UNIX timestamp) - requires TestRail 5.3 or later */
  start_on?: number;
  /** The ID of the parent milestone, if any (for sub-milestones) - requires TestRail 5.3 or later */
  parent_id?: number;
  /** A comma-separated list of references/requirements - requires TestRail 6.4 or later */
  refs?: string;
  /** True if a milestone is considered completed and false otherwise */
  is_completed?: boolean;
  /** True if a milestone is considered started and false otherwise */
  is_started?: boolean;
}

/**
 * Filter parameters for milestone requests.
 */
export interface MilestoneFilters extends BaseFilter {
  /** 1 to return completed milestones only. 0 to return open (active/upcoming) milestones only */
  is_completed?: boolean;
  /** 1 to return started milestones only. 0 to return upcoming milestones only - requires TestRail 5.3 or later */
  is_started?: boolean;
  /** The ID of the parent milestone to filter by */
  parent_id?: number;
}
