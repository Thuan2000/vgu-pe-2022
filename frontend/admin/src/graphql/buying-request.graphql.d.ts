/* 082121c139f03cbd662859d550030984c02ed884
 * This file is automatically generated by graphql-let. */

import * as Types from "graphql-let/__generated__/__types__";
import * as Apollo from '@apollo/client';
export declare type BuyingRequestsAndCountQueryVariables = Types.Exact<{
  companyId: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;
export declare type BuyingRequestsAndCountQuery = {
  __typename?: 'Query';
  buyingRequestsAndCount: {
    __typename?: 'BuyingRequestsResponse';
    totalDataCount?: Types.Maybe<number>;
    buyingRequests: Array<Types.Maybe<{
      __typename?: 'BuyingRequest';
      id: string;
      name: string;
      slug: string;
      endDate: any;
      categories?: Types.Maybe<Array<Types.Maybe<number>>>;
      minBudget: any;
      maxBudget: any;
      minOrder: number;
      unit: string;
      status: string;
      createdAt: any;
      updatedAt: any;
      location: string;
      commentsCount: number;
      bidsCount: number;
      projectsCount: number;
      gallery?: Types.Maybe<Array<Types.Maybe<{
        __typename?: 'File';
        location?: Types.Maybe<string>;
      }>>>;
    }>>;
  };
};
export declare type BuyingRequestQueryVariables = Types.Exact<{
  slug: Types.Scalars['String'];
}>;
export declare type BuyingRequestQuery = {
  __typename?: 'Query';
  buyingRequest: {
    __typename?: 'BuyingRequest';
    id: string;
    name: string;
    slug: string;
    endDate: any;
    categories?: Types.Maybe<Array<Types.Maybe<number>>>;
    minBudget: any;
    maxBudget: any;
    minOrder: number;
    unit: string;
    status: string;
    createdAt: any;
    updatedAt: any;
    location: string;
    commentsCount: number;
    bidsCount: number;
    projectsCount: number;
    description?: Types.Maybe<string>;
    gallery?: Types.Maybe<Array<Types.Maybe<{
      __typename?: 'File';
      location?: Types.Maybe<string>;
    }>>>;
    allowedCompany?: Types.Maybe<{
      __typename?: 'AllowedCompany';
      minSupplierExperience?: Types.Maybe<number>;
      minSupplierRating?: Types.Maybe<number>;
      minSuplierSells?: Types.Maybe<number>;
    }>;
  };
};
export declare type CreateBuyingRequestMutationVariables = Types.Exact<{
  input?: Types.Maybe<Types.BuyingRequestInput>;
}>;
export declare type CreateBuyingRequestMutation = {
  __typename?: 'Mutation';
  createBuyingRequest?: Types.Maybe<{
    __typename?: 'Response';
    success?: Types.Maybe<boolean>;
    message?: Types.Maybe<string>;
  }>;
};
export declare type DeleteBuyingRequestMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;
export declare type DeleteBuyingRequestMutation = {
  __typename?: 'Mutation';
  deleteBuyingRequest: {
    __typename?: 'Response';
    success?: Types.Maybe<boolean>;
    message?: Types.Maybe<string>;
  };
};
export declare const BuyingRequestsAndCountDocument: Apollo.DocumentNode;
/**
 * __useBuyingRequestsAndCountQuery__
 *
 * To run a query within a React component, call `useBuyingRequestsAndCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useBuyingRequestsAndCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuyingRequestsAndCountQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      offset: // value for 'offset'
 *   },
 * });
 */

export declare function useBuyingRequestsAndCountQuery(baseOptions: Apollo.QueryHookOptions<BuyingRequestsAndCountQuery, BuyingRequestsAndCountQueryVariables>): Apollo.QueryResult<BuyingRequestsAndCountQuery, Types.Exact<{
  companyId: number;
  offset: number;
}>>;
export declare function useBuyingRequestsAndCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BuyingRequestsAndCountQuery, BuyingRequestsAndCountQueryVariables>): Apollo.QueryTuple<BuyingRequestsAndCountQuery, Types.Exact<{
  companyId: number;
  offset: number;
}>>;
export declare type BuyingRequestsAndCountQueryHookResult = ReturnType<typeof useBuyingRequestsAndCountQuery>;
export declare type BuyingRequestsAndCountLazyQueryHookResult = ReturnType<typeof useBuyingRequestsAndCountLazyQuery>;
export declare type BuyingRequestsAndCountQueryResult = Apollo.QueryResult<BuyingRequestsAndCountQuery, BuyingRequestsAndCountQueryVariables>;
export declare const BuyingRequestDocument: Apollo.DocumentNode;
/**
 * __useBuyingRequestQuery__
 *
 * To run a query within a React component, call `useBuyingRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useBuyingRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuyingRequestQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */

export declare function useBuyingRequestQuery(baseOptions: Apollo.QueryHookOptions<BuyingRequestQuery, BuyingRequestQueryVariables>): Apollo.QueryResult<BuyingRequestQuery, Types.Exact<{
  slug: string;
}>>;
export declare function useBuyingRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BuyingRequestQuery, BuyingRequestQueryVariables>): Apollo.QueryTuple<BuyingRequestQuery, Types.Exact<{
  slug: string;
}>>;
export declare type BuyingRequestQueryHookResult = ReturnType<typeof useBuyingRequestQuery>;
export declare type BuyingRequestLazyQueryHookResult = ReturnType<typeof useBuyingRequestLazyQuery>;
export declare type BuyingRequestQueryResult = Apollo.QueryResult<BuyingRequestQuery, BuyingRequestQueryVariables>;
export declare const CreateBuyingRequestDocument: Apollo.DocumentNode;
export declare type CreateBuyingRequestMutationFn = Apollo.MutationFunction<CreateBuyingRequestMutation, CreateBuyingRequestMutationVariables>;
/**
 * __useCreateBuyingRequestMutation__
 *
 * To run a mutation, you first call `useCreateBuyingRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBuyingRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBuyingRequestMutation, { data, loading, error }] = useCreateBuyingRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */

export declare function useCreateBuyingRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateBuyingRequestMutation, CreateBuyingRequestMutationVariables>): Apollo.MutationTuple<CreateBuyingRequestMutation, Types.Exact<{
  input?: Types.Maybe<Types.BuyingRequestInput> | undefined;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateBuyingRequestMutationHookResult = ReturnType<typeof useCreateBuyingRequestMutation>;
export declare type CreateBuyingRequestMutationResult = Apollo.MutationResult<CreateBuyingRequestMutation>;
export declare type CreateBuyingRequestMutationOptions = Apollo.BaseMutationOptions<CreateBuyingRequestMutation, CreateBuyingRequestMutationVariables>;
export declare const DeleteBuyingRequestDocument: Apollo.DocumentNode;
export declare type DeleteBuyingRequestMutationFn = Apollo.MutationFunction<DeleteBuyingRequestMutation, DeleteBuyingRequestMutationVariables>;
/**
 * __useDeleteBuyingRequestMutation__
 *
 * To run a mutation, you first call `useDeleteBuyingRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBuyingRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBuyingRequestMutation, { data, loading, error }] = useDeleteBuyingRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */

export declare function useDeleteBuyingRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBuyingRequestMutation, DeleteBuyingRequestMutationVariables>): Apollo.MutationTuple<DeleteBuyingRequestMutation, Types.Exact<{
  id: number;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeleteBuyingRequestMutationHookResult = ReturnType<typeof useDeleteBuyingRequestMutation>;
export declare type DeleteBuyingRequestMutationResult = Apollo.MutationResult<DeleteBuyingRequestMutation>;
export declare type DeleteBuyingRequestMutationOptions = Apollo.BaseMutationOptions<DeleteBuyingRequestMutation, DeleteBuyingRequestMutationVariables>;