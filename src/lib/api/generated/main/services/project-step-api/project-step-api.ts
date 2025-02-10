/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {
  useInfiniteQuery,
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseInfiniteQueryResult,
  DefinedUseQueryResult,
  InfiniteData,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type {
  DeleteProjectStepResponse,
  GetProjectStepResponse,
  PostProjectStepRequest,
  PostProjectStepResponse,
  PutProjectStepRequest,
  PutProjectStepResponse
} from '../../models'
import { mainAxios } from '../../../../../axiosClient';



/**
 * 특정 프로젝트의 단계를 수정합니다.
 * @summary 프로젝트 단계 수정
 */
export const putProjectStep = (
    stepId: number,
    putProjectStepRequest: PutProjectStepRequest,
 ) => {
      
      
      return mainAxios<PutProjectStepResponse>(
      {url: `/api/projects/steps/${stepId}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: putProjectStepRequest
    },
      );
    }
  


export const getPutProjectStepMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putProjectStep>>, TError,{stepId: number;data: PutProjectStepRequest}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putProjectStep>>, TError,{stepId: number;data: PutProjectStepRequest}, TContext> => {
    
const mutationKey = ['putProjectStep'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putProjectStep>>, {stepId: number;data: PutProjectStepRequest}> = (props) => {
          const {stepId,data} = props ?? {};

          return  putProjectStep(stepId,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutProjectStepMutationResult = NonNullable<Awaited<ReturnType<typeof putProjectStep>>>
    export type PutProjectStepMutationBody = PutProjectStepRequest
    export type PutProjectStepMutationError = unknown

    /**
 * @summary 프로젝트 단계 수정
 */
export const usePutProjectStep = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putProjectStep>>, TError,{stepId: number;data: PutProjectStepRequest}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof putProjectStep>>,
        TError,
        {stepId: number;data: PutProjectStepRequest},
        TContext
      > => {

      const mutationOptions = getPutProjectStepMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * 해당 프로젝트의 모든 단계와 체크리스트를 조회합니다.
 * @summary 프로젝트 내 모든 단계 및 체크리스트 조회
 */
export const getProjectStepAndChecklist = (
    projectId: number,
 signal?: AbortSignal
) => {
      
      
      return mainAxios<GetProjectStepResponse>(
      {url: `/api/projects/${projectId}/steps`, method: 'GET', signal
    },
      );
    }
  

export const getGetProjectStepAndChecklistQueryKey = (projectId: number,) => {
    return [`/api/projects/${projectId}/steps`] as const;
    }

    
export const getGetProjectStepAndChecklistInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getProjectStepAndChecklist>>>, TError = unknown>(projectId: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProjectStepAndChecklistQueryKey(projectId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProjectStepAndChecklist>>> = ({ signal }) => getProjectStepAndChecklist(projectId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(projectId), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetProjectStepAndChecklistInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getProjectStepAndChecklist>>>
export type GetProjectStepAndChecklistInfiniteQueryError = unknown


export function useGetProjectStepAndChecklistInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getProjectStepAndChecklist>>>, TError = unknown>(
 projectId: number, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getProjectStepAndChecklist>>,
          TError,
          Awaited<ReturnType<typeof getProjectStepAndChecklist>>
        > , 'initialData'
      >, }

  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetProjectStepAndChecklistInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getProjectStepAndChecklist>>>, TError = unknown>(
 projectId: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getProjectStepAndChecklist>>,
          TError,
          Awaited<ReturnType<typeof getProjectStepAndChecklist>>
        > , 'initialData'
      >, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetProjectStepAndChecklistInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getProjectStepAndChecklist>>>, TError = unknown>(
 projectId: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 프로젝트 내 모든 단계 및 체크리스트 조회
 */

export function useGetProjectStepAndChecklistInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getProjectStepAndChecklist>>>, TError = unknown>(
 projectId: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetProjectStepAndChecklistInfiniteQueryOptions(projectId,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetProjectStepAndChecklistQueryOptions = <TData = Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError = unknown>(projectId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProjectStepAndChecklistQueryKey(projectId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProjectStepAndChecklist>>> = ({ signal }) => getProjectStepAndChecklist(projectId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(projectId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetProjectStepAndChecklistQueryResult = NonNullable<Awaited<ReturnType<typeof getProjectStepAndChecklist>>>
export type GetProjectStepAndChecklistQueryError = unknown


export function useGetProjectStepAndChecklist<TData = Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError = unknown>(
 projectId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getProjectStepAndChecklist>>,
          TError,
          Awaited<ReturnType<typeof getProjectStepAndChecklist>>
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetProjectStepAndChecklist<TData = Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError = unknown>(
 projectId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getProjectStepAndChecklist>>,
          TError,
          Awaited<ReturnType<typeof getProjectStepAndChecklist>>
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetProjectStepAndChecklist<TData = Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError = unknown>(
 projectId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 프로젝트 내 모든 단계 및 체크리스트 조회
 */

export function useGetProjectStepAndChecklist<TData = Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError = unknown>(
 projectId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getProjectStepAndChecklist>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetProjectStepAndChecklistQueryOptions(projectId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * 특정 프로젝트의 단계를 추가합니다.
 * @summary 프로젝트 단계 추가
 */
export const postProjectStep = (
    projectId: number,
    postProjectStepRequest: PostProjectStepRequest,
 signal?: AbortSignal
) => {
      
      
      return mainAxios<PostProjectStepResponse>(
      {url: `/api/projects/${projectId}/steps`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postProjectStepRequest, signal
    },
      );
    }
  


export const getPostProjectStepMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postProjectStep>>, TError,{projectId: number;data: PostProjectStepRequest}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postProjectStep>>, TError,{projectId: number;data: PostProjectStepRequest}, TContext> => {
    
const mutationKey = ['postProjectStep'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postProjectStep>>, {projectId: number;data: PostProjectStepRequest}> = (props) => {
          const {projectId,data} = props ?? {};

          return  postProjectStep(projectId,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostProjectStepMutationResult = NonNullable<Awaited<ReturnType<typeof postProjectStep>>>
    export type PostProjectStepMutationBody = PostProjectStepRequest
    export type PostProjectStepMutationError = unknown

    /**
 * @summary 프로젝트 단계 추가
 */
export const usePostProjectStep = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postProjectStep>>, TError,{projectId: number;data: PostProjectStepRequest}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof postProjectStep>>,
        TError,
        {projectId: number;data: PostProjectStepRequest},
        TContext
      > => {

      const mutationOptions = getPostProjectStepMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * 특정 프로젝트 단계를 삭제합니다.
 * @summary 프로젝트 단계 삭제
 */
export const deleteProjectStep = (
    projectId: number,
    stepId: number,
 ) => {
      
      
      return mainAxios<DeleteProjectStepResponse>(
      {url: `/api/projects/${projectId}/steps/${stepId}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteProjectStepMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteProjectStep>>, TError,{projectId: number;stepId: number}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteProjectStep>>, TError,{projectId: number;stepId: number}, TContext> => {
    
const mutationKey = ['deleteProjectStep'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteProjectStep>>, {projectId: number;stepId: number}> = (props) => {
          const {projectId,stepId} = props ?? {};

          return  deleteProjectStep(projectId,stepId,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteProjectStepMutationResult = NonNullable<Awaited<ReturnType<typeof deleteProjectStep>>>
    
    export type DeleteProjectStepMutationError = unknown

    /**
 * @summary 프로젝트 단계 삭제
 */
export const useDeleteProjectStep = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteProjectStep>>, TError,{projectId: number;stepId: number}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof deleteProjectStep>>,
        TError,
        {projectId: number;stepId: number},
        TContext
      > => {

      const mutationOptions = getDeleteProjectStepMutationOptions(options);

      return useMutation(mutationOptions);
    }
    