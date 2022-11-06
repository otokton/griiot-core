//TODO: this status are in order

export enum InfraStatusType {
  NEW = 'NEW',
  DATABASE_UP = 'DATABASE_UP',
  DATABASE_DOWN = 'DATABASE_DOWN',
  GITHUB_UP = 'GITHUB_UP',
  GITHUB_DOWN = 'GITHUB_DOWN',
  GCLOUD_KONG_UP = 'GCLOUD_KONG_UP',
  GCLOUD_KONG_DOWN = 'GCLOUD_KONG_DOWN',
  ENV_VARS_SET = 'ENV_VARS_SET',
  ENV_VARS_NOT_SET = 'ENV_VARS_NOT_SET',
  WORKFLOW_RERUN = 'WORKFLOW_RERUN',
  UP = 'UP',
  DELETED = 'DELETED'
}