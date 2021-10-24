/* 75feffb36f1ad923ca539c09fe30ca023d1cdde8
 * This file is automatically generated by graphql-let. */

import * as Types from "graphql-let/__generated__/__types__";
import * as Apollo from '@apollo/client';
export declare type CompanySignupMutationVariables = Types.Exact<{
  input: Types.CompanyRegisterInput;
}>;
export declare type CompanySignupMutation = {
  __typename?: 'Mutation';
  companySignup: {
    __typename?: 'AuthResponse';
    message: string;
    success: boolean;
    token?: Types.Maybe<string>;
    role?: Types.Maybe<Types.Role>;
  };
};
export declare const CompanySignupDocument: Apollo.DocumentNode;
export declare type CompanySignupMutationFn = Apollo.MutationFunction<CompanySignupMutation, CompanySignupMutationVariables>;
/**
 * __useCompanySignupMutation__
 *
 * To run a mutation, you first call `useCompanySignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompanySignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [companySignupMutation, { data, loading, error }] = useCompanySignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */

export declare function useCompanySignupMutation(baseOptions?: Apollo.MutationHookOptions<CompanySignupMutation, CompanySignupMutationVariables>): Apollo.MutationTuple<CompanySignupMutation, Types.Exact<{
  input: Types.CompanyRegisterInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CompanySignupMutationHookResult = ReturnType<typeof useCompanySignupMutation>;
export declare type CompanySignupMutationResult = Apollo.MutationResult<CompanySignupMutation>;
export declare type CompanySignupMutationOptions = Apollo.BaseMutationOptions<CompanySignupMutation, CompanySignupMutationVariables>;