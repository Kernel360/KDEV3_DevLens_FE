/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Devlens Admin API 문서
 * Devlens Admin API 문서
 * OpenAPI spec version: 1.0
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
  APIResponseSseEmitter
} from '../../models'
import { mainAxios } from '../../../../../axiosClient';



export const subscribe = (
    
 signal?: AbortSignal
) => {
      
      
      return mainAxios<APIResponseSseEmitter>(
      {url: `/api/notification/subscribe`, method: 'GET', signal
    },
      );
    }
  

export const getSubscribeQueryKey = () => {
    return [`/api/notification/subscribe`] as const;
    }

    
export const getSubscribeInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof subscribe>>>, TError = unknown>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof subscribe>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getSubscribeQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof subscribe>>> = ({ signal }) => subscribe(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof subscribe>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type SubscribeInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof subscribe>>>
export type SubscribeInfiniteQueryError = unknown


export function useSubscribeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof subscribe>>>, TError = unknown>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof subscribe>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof subscribe>>,
          TError,
          Awaited<ReturnType<typeof subscribe>>
        > , 'initialData'
      >, }

  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useSubscribeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof subscribe>>>, TError = unknown>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof subscribe>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof subscribe>>,
          TError,
          Awaited<ReturnType<typeof subscribe>>
        > , 'initialData'
      >, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useSubscribeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof subscribe>>>, TError = unknown>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof subscribe>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useSubscribeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof subscribe>>>, TError = unknown>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof subscribe>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getSubscribeInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getSubscribeQueryOptions = <TData = Awaited<ReturnType<typeof subscribe>>, TError = unknown>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof subscribe>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getSubscribeQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof subscribe>>> = ({ signal }) => subscribe(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof subscribe>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type SubscribeQueryResult = NonNullable<Awaited<ReturnType<typeof subscribe>>>
export type SubscribeQueryError = unknown


export function useSubscribe<TData = Awaited<ReturnType<typeof subscribe>>, TError = unknown>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof subscribe>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof subscribe>>,
          TError,
          Awaited<ReturnType<typeof subscribe>>
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useSubscribe<TData = Awaited<ReturnType<typeof subscribe>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof subscribe>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof subscribe>>,
          TError,
          Awaited<ReturnType<typeof subscribe>>
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useSubscribe<TData = Awaited<ReturnType<typeof subscribe>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof subscribe>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useSubscribe<TData = Awaited<ReturnType<typeof subscribe>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof subscribe>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getSubscribeQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



