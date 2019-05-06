import { Action } from 'redux';
import annotation, {
  initialState as annotationInitialState,
} from './annotation';
import { AppState } from 'src/types';
import { AppActions } from 'src/actions';

const defaultState = {
  annotation: annotationInitialState,
};

const rootReducer = (state: AppState = defaultState, action: Action) => ({
  annotation: annotation(state.annotation, action as AppActions),
});

export default rootReducer;
