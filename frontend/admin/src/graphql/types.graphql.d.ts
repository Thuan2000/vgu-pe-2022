import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type IAllowedCompany = {
  minSuplierSells?: Maybe<Scalars['Float']>;
  minSupplierExperience?: Maybe<Scalars['Float']>;
  minSupplierRating?: Maybe<Scalars['Float']>;
};

export type IAllowedCompanyInput = {
  minSuplierSells?: Maybe<Scalars['Float']>;
  minSupplierExperience?: Maybe<Scalars['Float']>;
  minSupplierRating?: Maybe<Scalars['Float']>;
};

export type IAuthResponse = {
  message: Scalars['String'];
  role?: Maybe<IRole>;
  success: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type IBuyingRequest = {
  allowedCompany?: Maybe<IAllowedCompany>;
  bidsCount: Scalars['Int'];
  categories?: Maybe<Array<Maybe<Scalars['Int']>>>;
  commentsCount: Scalars['Int'];
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  endDate: Scalars['Date'];
  gallery?: Maybe<Array<Maybe<IFile>>>;
  id: Scalars['ID'];
  location: Scalars['String'];
  maxBudget: Scalars['Date'];
  minBudget: Scalars['Date'];
  minOrder: Scalars['Int'];
  name: Scalars['String'];
  productName: Scalars['String'];
  projectsCount: Scalars['Int'];
  status: Scalars['String'];
  unit: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type IBuyingRequestInput = {
  allowedCompany?: Maybe<IAllowedCompanyInput>;
  categories?: Maybe<Array<Maybe<Scalars['Int']>>>;
  companyId: Scalars['Int'];
  companyName: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  endDate: Scalars['Date'];
  gallery?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  location: Scalars['String'];
  maxBudget: Scalars['Date'];
  minBudget: Scalars['Date'];
  minOrder: Scalars['Int'];
  name: Scalars['String'];
  productName: Scalars['String'];
  unit: Scalars['String'];
};

export type IBuyingRequestsResponse = {
  buyingRequests: Array<Maybe<IBuyingRequest>>;
  totalDataCount?: Maybe<Scalars['Int']>;
};

export type ICategory = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type ICategoryInput = {
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type ICompany = {
  approved?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  licenseFiles?: Maybe<Array<Maybe<IFile>>>;
  licenseNumber?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
};

export type ICompanyRegisterInput = {
  agreement?: Maybe<Scalars['Boolean']>;
  companyName: Scalars['String'];
  email: Scalars['String'];
  emailSubscription?: Maybe<Scalars['Boolean']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  licenseFiles: Array<Maybe<Scalars['Upload']>>;
  licenseNumber: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type IFile = {
  filename: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type ILoginInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type IMeInfoResponse = {
  company: ICompany;
  user: IUser;
};

export type IMutation = {
  companySignup: IAuthResponse;
  createBuyingRequest?: Maybe<IResponse>;
  createCategory?: Maybe<IResponse>;
  login: IAuthResponse;
  meInfo?: Maybe<IMeInfoResponse>;
  uploadFile?: Maybe<IFile>;
};


export type IMutationCompanySignupArgs = {
  input: ICompanyRegisterInput;
};


export type IMutationCreateBuyingRequestArgs = {
  input?: Maybe<IBuyingRequestInput>;
};


export type IMutationCreateCategoryArgs = {
  input: ICategoryInput;
};


export type IMutationLoginArgs = {
  input: ILoginInput;
};


export type IMutationUploadFileArgs = {
  input: Scalars['Upload'];
};

export type IPost_Request_Status =
  | 'CLOSE'
  | 'OPEN';

export type IProductName = {
  name?: Maybe<Scalars['String']>;
  searchedCount?: Maybe<Scalars['Int']>;
};

export type IQuery = {
  buyingRequestsAndCount: IBuyingRequestsResponse;
  categories: Array<Maybe<ICategory>>;
  productNames?: Maybe<Array<Maybe<IProductName>>>;
  user?: Maybe<IUser>;
  users?: Maybe<Array<Maybe<IUser>>>;
};


export type IQueryBuyingRequestsAndCountArgs = {
  companyId: Scalars['Int'];
  offset: Scalars['Int'];
};


export type IQueryUserArgs = {
  id: Scalars['Int'];
};

export type IRole =
  | 'COMPANY_OWNER'
  | 'COMPANY_STAFF'
  | 'GUESS'
  | 'SUPER_ADMIN';

export type IResponse = {
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type IUser = {
  companyId?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role?: Maybe<IRole>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
  AllowedCompany: ResolverTypeWrapper<IAllowedCompany>;
  AllowedCompanyInput: IAllowedCompanyInput;
  AuthResponse: ResolverTypeWrapper<IAuthResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BuyingRequest: ResolverTypeWrapper<IBuyingRequest>;
  BuyingRequestInput: IBuyingRequestInput;
  BuyingRequestsResponse: ResolverTypeWrapper<IBuyingRequestsResponse>;
  Category: ResolverTypeWrapper<ICategory>;
  CategoryInput: ICategoryInput;
  Company: ResolverTypeWrapper<ICompany>;
  CompanyRegisterInput: ICompanyRegisterInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  File: ResolverTypeWrapper<IFile>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginInput: ILoginInput;
  MeInfoResponse: ResolverTypeWrapper<IMeInfoResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  POST_REQUEST_STATUS: IPost_Request_Status;
  ProductName: ResolverTypeWrapper<IProductName>;
  Query: ResolverTypeWrapper<{}>;
  ROLE: IRole;
  Response: ResolverTypeWrapper<IResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<IUser>;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  AllowedCompany: IAllowedCompany;
  AllowedCompanyInput: IAllowedCompanyInput;
  AuthResponse: IAuthResponse;
  Boolean: Scalars['Boolean'];
  BuyingRequest: IBuyingRequest;
  BuyingRequestInput: IBuyingRequestInput;
  BuyingRequestsResponse: IBuyingRequestsResponse;
  Category: ICategory;
  CategoryInput: ICategoryInput;
  Company: ICompany;
  CompanyRegisterInput: ICompanyRegisterInput;
  Date: Scalars['Date'];
  File: IFile;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LoginInput: ILoginInput;
  MeInfoResponse: IMeInfoResponse;
  Mutation: {};
  ProductName: IProductName;
  Query: {};
  Response: IResponse;
  String: Scalars['String'];
  Upload: Scalars['Upload'];
  User: IUser;
};

export type IAllowedCompanyResolvers<ContextType = any, ParentType extends IResolversParentTypes['AllowedCompany'] = IResolversParentTypes['AllowedCompany']> = {
  minSuplierSells?: Resolver<Maybe<IResolversTypes['Float']>, ParentType, ContextType>;
  minSupplierExperience?: Resolver<Maybe<IResolversTypes['Float']>, ParentType, ContextType>;
  minSupplierRating?: Resolver<Maybe<IResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IAuthResponseResolvers<ContextType = any, ParentType extends IResolversParentTypes['AuthResponse'] = IResolversParentTypes['AuthResponse']> = {
  message?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<Maybe<IResolversTypes['ROLE']>, ParentType, ContextType>;
  success?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IBuyingRequestResolvers<ContextType = any, ParentType extends IResolversParentTypes['BuyingRequest'] = IResolversParentTypes['BuyingRequest']> = {
  allowedCompany?: Resolver<Maybe<IResolversTypes['AllowedCompany']>, ParentType, ContextType>;
  bidsCount?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<Maybe<IResolversTypes['Int']>>>, ParentType, ContextType>;
  commentsCount?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  endDate?: Resolver<IResolversTypes['Date'], ParentType, ContextType>;
  gallery?: Resolver<Maybe<Array<Maybe<IResolversTypes['File']>>>, ParentType, ContextType>;
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  maxBudget?: Resolver<IResolversTypes['Date'], ParentType, ContextType>;
  minBudget?: Resolver<IResolversTypes['Date'], ParentType, ContextType>;
  minOrder?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  productName?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  projectsCount?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  unit?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<IResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IBuyingRequestsResponseResolvers<ContextType = any, ParentType extends IResolversParentTypes['BuyingRequestsResponse'] = IResolversParentTypes['BuyingRequestsResponse']> = {
  buyingRequests?: Resolver<Array<Maybe<IResolversTypes['BuyingRequest']>>, ParentType, ContextType>;
  totalDataCount?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ICategoryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Category'] = IResolversParentTypes['Category']> = {
  id?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ICompanyResolvers<ContextType = any, ParentType extends IResolversParentTypes['Company'] = IResolversParentTypes['Company']> = {
  approved?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>;
  description?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>;
  licenseFiles?: Resolver<Maybe<Array<Maybe<IResolversTypes['File']>>>, ParentType, ContextType>;
  licenseNumber?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  ownerId?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface IDateScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['Date'], any> {
  name: 'Date';
}

export type IFileResolvers<ContextType = any, ParentType extends IResolversParentTypes['File'] = IResolversParentTypes['File']> = {
  filename?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IMeInfoResponseResolvers<ContextType = any, ParentType extends IResolversParentTypes['MeInfoResponse'] = IResolversParentTypes['MeInfoResponse']> = {
  company?: Resolver<IResolversTypes['Company'], ParentType, ContextType>;
  user?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IMutationResolvers<ContextType = any, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = {
  companySignup?: Resolver<IResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<IMutationCompanySignupArgs, 'input'>>;
  createBuyingRequest?: Resolver<Maybe<IResolversTypes['Response']>, ParentType, ContextType, RequireFields<IMutationCreateBuyingRequestArgs, never>>;
  createCategory?: Resolver<Maybe<IResolversTypes['Response']>, ParentType, ContextType, RequireFields<IMutationCreateCategoryArgs, 'input'>>;
  login?: Resolver<IResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<IMutationLoginArgs, 'input'>>;
  meInfo?: Resolver<Maybe<IResolversTypes['MeInfoResponse']>, ParentType, ContextType>;
  uploadFile?: Resolver<Maybe<IResolversTypes['File']>, ParentType, ContextType, RequireFields<IMutationUploadFileArgs, 'input'>>;
};

export type IProductNameResolvers<ContextType = any, ParentType extends IResolversParentTypes['ProductName'] = IResolversParentTypes['ProductName']> = {
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  searchedCount?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  buyingRequestsAndCount?: Resolver<IResolversTypes['BuyingRequestsResponse'], ParentType, ContextType, RequireFields<IQueryBuyingRequestsAndCountArgs, 'companyId' | 'offset'>>;
  categories?: Resolver<Array<Maybe<IResolversTypes['Category']>>, ParentType, ContextType>;
  productNames?: Resolver<Maybe<Array<Maybe<IResolversTypes['ProductName']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<IResolversTypes['User']>, ParentType, ContextType, RequireFields<IQueryUserArgs, 'id'>>;
  users?: Resolver<Maybe<Array<Maybe<IResolversTypes['User']>>>, ParentType, ContextType>;
};

export type IResponseResolvers<ContextType = any, ParentType extends IResolversParentTypes['Response'] = IResolversParentTypes['Response']> = {
  message?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface IUploadScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type IUserResolvers<ContextType = any, ParentType extends IResolversParentTypes['User'] = IResolversParentTypes['User']> = {
  companyId?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>;
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<IResolversTypes['ROLE']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IResolvers<ContextType = any> = {
  AllowedCompany?: IAllowedCompanyResolvers<ContextType>;
  AuthResponse?: IAuthResponseResolvers<ContextType>;
  BuyingRequest?: IBuyingRequestResolvers<ContextType>;
  BuyingRequestsResponse?: IBuyingRequestsResponseResolvers<ContextType>;
  Category?: ICategoryResolvers<ContextType>;
  Company?: ICompanyResolvers<ContextType>;
  Date?: GraphQLScalarType;
  File?: IFileResolvers<ContextType>;
  MeInfoResponse?: IMeInfoResponseResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  ProductName?: IProductNameResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  Response?: IResponseResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: IUserResolvers<ContextType>;
};


