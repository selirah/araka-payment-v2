import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { ApplicationState } from '../../store';

export const homeSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
