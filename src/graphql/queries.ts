/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getActivity = /* GraphQL */ `query GetActivity($id: ID!) {
  getActivity(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetActivityQueryVariables,
  APITypes.GetActivityQuery
>;
export const listActivities = /* GraphQL */ `query ListActivities(
  $filter: ModelActivityFilterInput
  $limit: Int
  $nextToken: String
) {
  listActivities(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListActivitiesQueryVariables,
  APITypes.ListActivitiesQuery
>;
