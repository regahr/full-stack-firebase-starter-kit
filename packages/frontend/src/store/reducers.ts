// store/reducers.ts
import { User } from '../../../shared/user';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_TOKEN,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  REFRESH,
  PURGE_USER,
} from "./action";

// Define the initial state
export interface UserState {
  submitting: boolean;
  user: User | undefined;
  error: string | null | undefined;
  token: string | null | undefined;
}

const initialState: UserState = {
  submitting: false,
  user: undefined,
  error: null,
  token: null,
};

type UserAction = {
  type:
    | typeof REFRESH
    | typeof PURGE_USER
    | typeof CREATE_USER_REQUEST
    | typeof CREATE_USER_SUCCESS
    | typeof CREATE_USER_FAILURE
    | typeof FETCH_USER_REQUEST
    | typeof FETCH_USER_SUCCESS
    | typeof FETCH_USER_FAILURE
    | typeof UPDATE_USER_REQUEST
    | typeof UPDATE_USER_SUCCESS
    | typeof UPDATE_USER_FAILURE
    | typeof UPDATE_USER_TOKEN;
  payload?: User;
  error?: string;
  token?: string;
};

// Reducer function
const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case REFRESH:
      return { ...state, submitting: false, error: null };

    case PURGE_USER:
      return { ...state, user: undefined, token: 'invalidated' };

    case CREATE_USER_REQUEST:
      return { ...state, submitting: true, error: null };

    case CREATE_USER_SUCCESS:
      return { ...state, submitting: false, user: action.payload };

    case CREATE_USER_FAILURE:
      return { ...state, submitting: false, error: action.error };

    case FETCH_USER_REQUEST:
      return { ...state, submitting: true, error: null };

    case FETCH_USER_SUCCESS:
      return { ...state, submitting: false, user: action.payload };

    case FETCH_USER_FAILURE:
      return { ...state, submitting: false, error: action.error };

    // Handling UPDATE_USER actions
    case UPDATE_USER_REQUEST:
      return { ...state, submitting: true, error: null };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        submitting: false,
        user: action.payload,
      };

    case UPDATE_USER_FAILURE:
      return { ...state, submitting: false, error: action.error };

    case UPDATE_USER_TOKEN:
      return { ...state, token: action.token };

    default:
      return state;
  }
};

export default userReducer;
