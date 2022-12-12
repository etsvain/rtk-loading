import { useSelector } from 'react-redux';
import { ILoadingState } from './types';

export function useLoading() {
  const loading = useSelector((store: any) => store.loading as ILoadingState);
  return loading;
}