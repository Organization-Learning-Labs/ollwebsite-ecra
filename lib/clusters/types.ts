export type Cluster = {
  id: string;
  name: string;
  description: string;
};

export type JobRoleClusters = {
  id: string;
  jobRole: string;
  industry: string;
  subIndustry: string;
  responsibility: string;
  careerGrade: string;
  description: string;
  clusters: Cluster[];
};

/** Everything the explorer needs to drive its three selectors and reveal a role. */
export type ExplorerData = {
  roles: JobRoleClusters[];
};
