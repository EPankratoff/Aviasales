// eslint-disable-next-line import/no-extraneous-dependencies
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';

import type { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
