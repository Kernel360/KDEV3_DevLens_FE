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
  APIResponse,
  APIResponseSuccessCode,
  UploadFileBody
} from '../../models'
import { adminAxios } from '../../../../../axiosClient';



export const getCompanyLogo = (
    companyId: number,
 signal?: AbortSignal
) => {
      
      
      return adminAxios<APIResponse>(
      {url: `/api/company/${companyId}/logo-image`, method: 'GET', signal
    },
      );
    }
  

export const getGetCompanyLogoQueryKey = (companyId: number,) => {
    return [`/api/company/${companyId}/logo-image`] as const;
    }

    
export const getGetCompanyLogoInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getCompanyLogo>>>, TError = unknown>(companyId: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getCompanyLogo>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetCompanyLogoQueryKey(companyId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getCompanyLogo>>> = ({ signal }) => getCompanyLogo(companyId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(companyId), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getCompanyLogo>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetCompanyLogoInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getCompanyLogo>>>
export type GetCompanyLogoInfiniteQueryError = unknown


export function useGetCompanyLogoInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getCompanyLogo>>>, TError = unknown>(
 companyId: number, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getCompanyLogo>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getCompanyLogo>>,
          TError,
          Awaited<ReturnType<typeof getCompanyLogo>>
        > , 'initialData'
      >, }

  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetCompanyLogoInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getCompanyLogo>>>, TError = unknown>(
 companyId: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getCompanyLogo>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getCompanyLogo>>,
          TError,
          Awaited<ReturnType<typeof getCompanyLogo>>
        > , 'initialData'
      >, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetCompanyLogoInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getCompanyLogo>>>, TError = unknown>(
 companyId: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getCompanyLogo>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useGetCompanyLogoInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getCompanyLogo>>>, TError = unknown>(
 companyId: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getCompanyLogo>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetCompanyLogoInfiniteQueryOptions(companyId,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetCompanyLogoQueryOptions = <TData = Awaited<ReturnType<typeof getCompanyLogo>>, TError = unknown>(companyId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCompanyLogo>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetCompanyLogoQueryKey(companyId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getCompanyLogo>>> = ({ signal }) => getCompanyLogo(companyId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(companyId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getCompanyLogo>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetCompanyLogoQueryResult = NonNullable<Awaited<ReturnType<typeof getCompanyLogo>>>
export type GetCompanyLogoQueryError = unknown


export function useGetCompanyLogo<TData = Awaited<ReturnType<typeof getCompanyLogo>>, TError = unknown>(
 companyId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCompanyLogo>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getCompanyLogo>>,
          TError,
          Awaited<ReturnType<typeof getCompanyLogo>>
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetCompanyLogo<TData = Awaited<ReturnType<typeof getCompanyLogo>>, TError = unknown>(
 companyId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCompanyLogo>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getCompanyLogo>>,
          TError,
          Awaited<ReturnType<typeof getCompanyLogo>>
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetCompanyLogo<TData = Awaited<ReturnType<typeof getCompanyLogo>>, TError = unknown>(
 companyId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCompanyLogo>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useGetCompanyLogo<TData = Awaited<ReturnType<typeof getCompanyLogo>>, TError = unknown>(
 companyId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCompanyLogo>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetCompanyLogoQueryOptions(companyId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const uploadFile = (
    companyId: number,
    uploadFileBody: UploadFileBody,
 signal?: AbortSignal
) => {
      
      const formData = new FormData();
formData.append('file', uploadFileBody.file)

      return adminAxios<APIResponse>(
      {url: `/api/company/${companyId}/logo-image`, method: 'POST',
      headers: {'Content-Type': 'multipart/form-data', },
       data: formData, signal
    },
      );
    }
  


export const getUploadFileMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof uploadFile>>, TError,{companyId: number;data: UploadFileBody}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof uploadFile>>, TError,{companyId: number;data: UploadFileBody}, TContext> => {
    
const mutationKey = ['uploadFile'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof uploadFile>>, {companyId: number;data: UploadFileBody}> = (props) => {
          const {companyId,data} = props ?? {};

          return  uploadFile(companyId,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UploadFileMutationResult = NonNullable<Awaited<ReturnType<typeof uploadFile>>>
    export type UploadFileMutationBody = UploadFileBody
    export type UploadFileMutationError = unknown

    export const useUploadFile = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof uploadFile>>, TError,{companyId: number;data: UploadFileBody}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof uploadFile>>,
        TError,
        {companyId: number;data: UploadFileBody},
        TContext
      > => {

      const mutationOptions = getUploadFileMutationOptions(options);

      return useMutation(mutationOptions);
    }
    export const deleteLogo = (
    companyId: number,
 ) => {
      
      
      return adminAxios<APIResponseSuccessCode>(
      {url: `/api/company/${companyId}/logo-image`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteLogoMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteLogo>>, TError,{companyId: number}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteLogo>>, TError,{companyId: number}, TContext> => {
    
const mutationKey = ['deleteLogo'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteLogo>>, {companyId: number}> = (props) => {
          const {companyId} = props ?? {};

          return  deleteLogo(companyId,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteLogoMutationResult = NonNullable<Awaited<ReturnType<typeof deleteLogo>>>
    
    export type DeleteLogoMutationError = unknown

    export const useDeleteLogo = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteLogo>>, TError,{companyId: number}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof deleteLogo>>,
        TError,
        {companyId: number},
        TContext
      > => {

      const mutationOptions = getDeleteLogoMutationOptions(options);

      return useMutation(mutationOptions);
    }
    