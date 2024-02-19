/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateActivity = /* GraphQL */ `subscription OnCreateActivity($filter: ModelSubscriptionActivityFilterInput) {
  onCreateActivity(filter: $filter) {
    id
    activityName
    startDate
    endDate
    description
    tag
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateActivitySubscriptionVariables,
  APITypes.OnCreateActivitySubscription
>;
export const onUpdateActivity = /* GraphQL */ `subscription OnUpdateActivity($filter: ModelSubscriptionActivityFilterInput) {
  onUpdateActivity(filter: $filter) {
    id
    activityName
    startDate
    endDate
    description
    tag
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateActivitySubscriptionVariables,
  APITypes.OnUpdateActivitySubscription
>;
export const onDeleteActivity = /* GraphQL */ `subscription OnDeleteActivity($filter: ModelSubscriptionActivityFilterInput) {
  onDeleteActivity(filter: $filter) {
    id
    activityName
    startDate
    endDate
    description
    tag
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteActivitySubscriptionVariables,
  APITypes.OnDeleteActivitySubscription
>;
