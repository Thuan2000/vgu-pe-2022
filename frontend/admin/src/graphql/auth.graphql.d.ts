/* 1f59a853659c3c58121807745148ae7f92cbc070
 * This file is automatically generated by graphql-let. */

import * as Types from "graphql-let/__generated__/__types__";
import * as Apollo from '@apollo/client';
export declare type LoginMutationVariables = Types.Exact<{
  input: Types.LoginInput;
}>;
export declare type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'AuthResponse';
    token?: Types.Maybe<string>;
    message: string;
    success: boolean;
    role?: Types.Maybe<Types.Role>;
  };
};
export declare type MeInfoMutationVariables = Types.Exact<{
  [key: string]: never;
}>;
export declare type MeInfoMutation = {
  __typename?: 'Mutation';
  meInfo?: Types.Maybe<{
    __typename?: 'MeInfoResponse';
    user: {
      __typename?: 'User';
      id?: Types.Maybe<number>;
      email?: Types.Maybe<string>;
      firstName?: Types.Maybe<string>;
      lastName?: Types.Maybe<string>;
      password?: Types.Maybe<string>;
      role?: Types.Maybe<Types.Role>;
    };
    company: {
      __typename?: 'Company';
      id?: Types.Maybe<number>;
      name?: Types.Maybe<string>;
      slug?: Types.Maybe<string>;
      licenseNumber?: Types.Maybe<string>;
      description?: Types.Maybe<string>;
      approved?: Types.Maybe<boolean>;
      ownerId?: Types.Maybe<number>;
      licenseFiles?: Types.Maybe<Array<Types.Maybe<{
        __typename?: 'File';
        path?: Types.Maybe<string>;
        location?: Types.Maybe<string>;
      }>>>;
    };
  }>;
};
export declare const LoginDocument: Apollo.DocumentNode;
export declare type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */

export declare function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>): Apollo.MutationTuple<LoginMutation, Types.Exact<{
  input: Types.LoginInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export declare type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export declare type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export declare const MeInfoDocument: Apollo.DocumentNode;
export declare type MeInfoMutationFn = Apollo.MutationFunction<MeInfoMutation, MeInfoMutationVariables>;
/**
 * __useMeInfoMutation__
 *
 * To run a mutation, you first call `useMeInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMeInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [meInfoMutation, { data, loading, error }] = useMeInfoMutation({
 *   variables: {
 *   },
 * });
 */

export declare function useMeInfoMutation(baseOptions?: Apollo.MutationHookOptions<MeInfoMutation, MeInfoMutationVariables>): Apollo.MutationTuple<MeInfoMutation, Types.Exact<{
  [key: string]: never;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type MeInfoMutationHookResult = ReturnType<typeof useMeInfoMutation>;
export declare type MeInfoMutationResult = Apollo.MutationResult<MeInfoMutation>;
export declare type MeInfoMutationOptions = Apollo.BaseMutationOptions<MeInfoMutation, MeInfoMutationVariables>;