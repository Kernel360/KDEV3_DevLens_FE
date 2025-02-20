/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Devlens Admin API 문서
 * Devlens Admin API 문서
 * OpenAPI spec version: 1.0
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
  GetProjectDetailResponse,
  PatchProjectCurrentStepResponse
} from '../../models'
import { mainAxios } from '../../../../../axiosClient';



/**
 * 특정 프로젝트의 현재 단계를 지정한 단계로 수정합니다.
 * @summary 프로젝트 현재 단계 수정
 */
export const patchProjectCurrentStep = (
    projectId: number,
    stepId: number,
 ) => {
      
      
      return mainAxios<PatchProjectCurrentStepResponse>(
      {url: `/api/projects/projects/${projectId}/current-steps/${stepId}`, method: 'PATCH'
    },
      );
    }
  


export const getPatchProjectCurrentStepMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchProjectCurrentStep>>, TError,{projectId: number;stepId: number}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof patchProjectCurrentStep>>, TError,{projectId: number;stepId: number}, TContext> => {
    
const mutationKey = ['patchProjectCurrentStep'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof patchProjectCurrentStep>>, {projectId: number;stepId: number}> = (props) => {
          const {projectId,stepId} = props ?? {};

          return  patchProjectCurrentStep(projectId,stepId,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PatchProjectCurrentStepMutationResult = NonNullable<Awaited<ReturnType<typeof patchProjectCurrentStep>>>
    
    export type PatchProjectCurrentStepMutationError = unknown

    /**
 * @summary 프로젝트 현재 단계 수정
 */
export const usePatchProjectCurrentStep = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchProjectCurrentStep>>, TError,{projectId: number;stepId: number}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof patchProjectCurrentStep>>,
        TError,
        {projectId: number;stepId: number},
        TContext
      > => {

      const mutationOptions = getPatchProjectCurrentStepMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * 특정 프로젝트의 상세 정보를 반환합니다.
 * @summary 프로젝트 상세 조회
 */
export const getProjectDetail = (
    projectId: number,
 signal?: AbortSignal
) => {
      
      
      return mainAxios<GetProjectDetailResponse>(
      {url: `/api/projects/${projectId}/detail`, method: 'GET', signal
    },
      );
    }
  

export const getGetProjectDetailQueryKey = (projectId: number,) => {
    return [`/api/projects/${projectId}/detail`] as const;
    }

    
export const getGetProjectDetailInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getProjectDetail>>>, TError = unknown>(projectId: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProjectDetail>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProjectDetailQueryKey(projectId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProjectDetail>>> = ({ signal }) => getProjectDetail(projectId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(projectId), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProjectDetail>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetProjectDetailInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getProjectDetail>>>
export type GetProjectDetailInfiniteQueryError = unknown


export function useGetProjectDetailInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getProjectDetail>>>, TError = unknown>(
 projectId: number, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProjectDetail>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getProjectDetail>>,
          TError,
          Awaited<ReturnType<typeof getProjectDetail>>
        > , 'initialData'
      >, }

  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetProjectDetailInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getProjectDetail>>>, TError = unknown>(
 projectId: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProjectDetail>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getProjectDetail>>,
          TError,
          Awaited<ReturnType<typeof getProjectDetail>>
        > , 'initialData'
      >, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetProjectDetailInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getProjectDetail>>>, TError = unknown>(
 projectId: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProjectDetail>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 프로젝트 상세 조회
 */

export function useGetProjectDetailInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getProjectDetail>>>, TError = unknown>(
 projectId: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProjectDetail>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetProjectDetailInfiniteQueryOptions(projectId,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetProjectDetailQueryOptions = <TData = Awaited<ReturnType<typeof getProjectDetail>>, TError = unknown>(projectId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getProjectDetail>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProjectDetailQueryKey(projectId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProjectDetail>>> = ({ signal }) => getProjectDetail(projectId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(projectId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getProjectDetail>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetProjectDetailQueryResult = NonNullable<Awaited<ReturnType<typeof getProjectDetail>>>
export type GetProjectDetailQueryError = unknown


export function useGetProjectDetail<TData = Awaited<ReturnType<typeof getProjectDetail>>, TError = unknown>(
 projectId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getProjectDetail>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getProjectDetail>>,
          TError,
          Awaited<ReturnType<typeof getProjectDetail>>
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetProjectDetail<TData = Awaited<ReturnType<typeof getProjectDetail>>, TError = unknown>(
 projectId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getProjectDetail>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getProjectDetail>>,
          TError,
          Awaited<ReturnType<typeof getProjectDetail>>
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetProjectDetail<TData = Awaited<ReturnType<typeof getProjectDetail>>, TError = unknown>(
 projectId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getProjectDetail>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 프로젝트 상세 조회
 */

export function useGetProjectDetail<TData = Awaited<ReturnType<typeof getProjectDetail>>, TError = unknown>(
 projectId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getProjectDetail>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetProjectDetailQueryOptions(projectId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



