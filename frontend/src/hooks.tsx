import { createTypedHooks } from 'easy-peasy';
import { storeModel } from './model';

const typedHooks = createTypedHooks<storeModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;