import { useCallback } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const useActionProducer = (action: Function) => {
    const dispatch = useDispatch();
    return useCallback(
        (...args) => dispatch(action(...args)),
        [dispatch, action],
    );
};
