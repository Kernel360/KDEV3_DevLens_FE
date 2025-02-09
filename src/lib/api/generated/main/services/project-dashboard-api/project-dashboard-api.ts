/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {
  useInfiniteQuery,
  useQuery
} from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseInfiniteQueryResult,
  DefinedUseQueryResult,
  InfiniteData,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type {
  APIResponseGetCompanyProjectResponse,
  GetProjectListResponse
} from '../../models'
import { mainAxios } from '../../../../../axiosClient';



/**
 * 사용자의 프로젝트 목록과 현재 회사의 프로젝트 목록을 반환합니다.
 * @summary 프로젝트 목록 조회
 */
export const getMyProject = (
    
 signal?: AbortSignal
) => {
      
      
      return mainAxios<GetProjectListResponse>(
      {url: `/api/projects`, method: 'GET', signal
    },
      );
    }
  

export const getGetMyProjectQueryKey = () => {
    return [`/api/projects`] as const;
    }

    
export const getGetMyProjectInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getMyProject>>>, TError = unknown>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMyProject>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetMyProjectQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getMyProject>>> = ({ signal }) => getMyProject(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMyProject>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetMyProjectInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getMyProject>>>
export type GetMyProjectInfiniteQueryError = unknown


export function useGetMyProjectInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getMyProject>>>, TError = unknown>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMyProject>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getMyProject>>,
          TError,
          Awaited<ReturnType<typeof getMyProject>>
        > , 'initialData'
      >, }

  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetMyProjectInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getMyProject>>>, TError = unknown>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMyProject>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getMyProject>>,
          TError,
          Awaited<ReturnType<typeof getMyProject>>
        > , 'initialData'
      >, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetMyProjectInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getMyProject>>>, TError = unknown>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMyProject>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 프로젝트 목록 조회
 */

export function useGetMyProjectInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getMyProject>>>, TError = unknown>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMyProject>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetMyProjectInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetMyProjectQueryOptions = <TData = Awaited<ReturnType<typeof getMyProject>>, TError = unknown>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMyProject>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetMyProjectQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getMyProject>>> = ({ signal }) => getMyProject(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getMyProject>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetMyProjectQueryResult = NonNullable<Awaited<ReturnType<typeof getMyProject>>>
export type GetMyProjectQueryError = unknown


export function useGetMyProject<TData = Awaited<ReturnType<typeof getMyProject>>, TError = unknown>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMyProject>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getMyProject>>,
          TError,
          Awaited<ReturnType<typeof getMyProject>>
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetMyProject<TData = Awaited<ReturnType<typeof getMyProject>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMyProject>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getMyProject>>,
          TError,
          Awaited<ReturnType<typeof getMyProject>>
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetMyProject<TData = Awaited<ReturnType<typeof getMyProject>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMyProject>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 프로젝트 목록 조회
 */

export function useGetMyProject<TData = Awaited<ReturnType<typeof getMyProject>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMyProject>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetMyProjectQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getMyCompanyProject = (
    companyId: number,
 signal?: AbortSignal
) => {
      
      
      return mainAxios<APIResponseGetCompanyProjectResponse>(
      {url: `/api/companies/${companyId}/projects`, method: 'GET', signal
    },
      );
    }
  

export const getGetMyCompanyProjectQueryKey = (companyId: number,) => {
    return [`/api/companies/${companyId}/projects`] as const;
    }

    
export const getGetMyCompanyProjectInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getMyCompanyProject>>>, TError = unknown>(companyId: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMyCompanyProject>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetMyCompanyProjectQueryKey(companyId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getMyCompanyProject>>> = ({ signal }) => getMyCompanyProject(companyId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(companyId), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMyCompanyProject>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetMyCompanyProjectInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getMyCompanyProject>>>
export type GetMyCompanyProjectInfiniteQueryError = unknown


export function useGetMyCompanyProjectInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getMyCompanyProject>>>, TError = unknown>(
 companyId: number, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMyCompanyProject>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getMyCompanyProject>>,
          TError,
          Awaited<ReturnType<typeof getMyCompanyProject>>
        > , 'initialData'
      >, }

  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetMyCompanyProjectInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getMyCompanyProject>>>, TError = unknown>(
 companyId: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMyCompanyProject>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getMyCompanyProject>>,
          TError,
          Awaited<ReturnType<typeof getMyCompanyProject>>
        > , 'initialData'
      >, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetMyCompanyProjectInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getMyCompanyProject>>>, TError = unknown>(
 companyId: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMyCompanyProject>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useGetMyCompanyProjectInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getMyCompanyProject>>>, TError = unknown>(
 companyId: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMyCompanyProject>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetMyCompanyProjectInfiniteQueryOptions(companyId,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetMyCompanyProjectQueryOptions = <TData = Awaited<ReturnType<typeof getMyCompanyProject>>, TError = unknown>(companyId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMyCompanyProject>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetMyCompanyProjectQueryKey(companyId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getMyCompanyProject>>> = ({ signal }) => getMyCompanyProject(companyId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(companyId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getMyCompanyProject>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetMyCompanyProjectQueryResult = NonNullable<Awaited<ReturnType<typeof getMyCompanyProject>>>
export type GetMyCompanyProjectQueryError = unknown


export function useGetMyCompanyProject<TData = Awaited<ReturnType<typeof getMyCompanyProject>>, TError = unknown>(
 companyId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMyCompanyProject>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getMyCompanyProject>>,
          TError,
          Awaited<ReturnType<typeof getMyCompanyProject>>
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetMyCompanyProject<TData = Awaited<ReturnType<typeof getMyCompanyProject>>, TError = unknown>(
 companyId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMyCompanyProject>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getMyCompanyProject>>,
          TError,
          Awaited<ReturnType<typeof getMyCompanyProject>>
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetMyCompanyProject<TData = Awaited<ReturnType<typeof getMyCompanyProject>>, TError = unknown>(
 companyId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMyCompanyProject>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useGetMyCompanyProject<TData = Awaited<ReturnType<typeof getMyCompanyProject>>, TError = unknown>(
 companyId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMyCompanyProject>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetMyCompanyProjectQueryOptions(companyId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



