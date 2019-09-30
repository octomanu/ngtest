import { actions } from './preview.actions';
import { previewActionTypes } from './preview.actions';
export interface PreviewState {
  loading: boolean;
  idConsorcio: string;
  html: string;
  error: any;
}

export const initState: PreviewState = {
  loading: false,
  idConsorcio: null,
  html: null,
  error: null,
};

export function reducer(state: PreviewState = initState, action: actions) {
  switch (action.type) {
    case previewActionTypes.previewRequest:
      return {
        ...state,
        idConsorcio: action.payload.idConsorcio,
        loading: true,
      };
    case previewActionTypes.previewRequestSuccess:
      return { ...state, html: action.payload.html, loading: false };
    case previewActionTypes.previewRequestError:
      return { ...state, html: action.payload.error, loading: false };
    default:
      return state;
  }
}
