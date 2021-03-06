import {isEmpty, values} from 'lodash';
import immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';
import types from '../actions/types';

export const INITIAL_STATE = immutable({
  loginSubmitting: false,
  loginErrorCode: null,
  loginErrorMessage: null,
  loginProblem: null,
  fbLoginSubmitting: false,
  fbLoginErrorCode: null,
  fbLoginErrorMessage: null,
  fbLoginProblem: null,
  googleLoginSubmitting: false,
  googleLoginErrorCode: null,
  googleLoginErrorMessage: null,
  googleLoginProblem: null,
  googleLoginSetupReady: false,
  googleLoginSetupProcessing: false,
  googleLoginSetupErrorCode: null,
  googleLoginSetupErrorMessage: null,
  tokenFetching: false,
  tokenErrorCode: null,
  tokenProblem: null,
  authToken: null
});

const loginRequest = (state, action) =>
  state.merge({
    loginSubmitting: true,
    loginErrorCode: null,
    loginErrorMessage: null
  });

const loginSuccess = (state, action) =>
  state.merge({
    loginSubmitting: false,
    loginErrorCode: null,
    loginErrorMessage: null,
    loginProblem: null
  });

const loginFailure = (state, action) =>
  state.merge({
    loginSubmitting: false,
    loginErrorCode: action.data.errorCode,
    loginErrorMessage: !isEmpty(action.data.errors) ? `${values(action.data.errors).join('. ')}.` : action.data.message,
    loginProblem: action.data.problem,
    authToken: null
  });

const fbLoginRequest = (state, action) =>
  state.merge({
    fbLoginSubmitting: true,
    fbLoginErrorCode: null,
    fbLoginErrorMessage: null
  });

const fbLoginSuccess = (state, action) =>
  state.merge({
    fbLoginSubmitting: false,
    fbLoginErrorCode: null,
    fbLoginErrorMessage: null,
    fbLoginProblem: null
  });

const fbLoginFailure = (state, action) =>
  state.merge({
    fbLoginSubmitting: false,
    fbLoginErrorCode: action.data.errorCode,
    fbLoginErrorMessage: !isEmpty(action.data.errors) ? `${values(action.data.errors).join('. ')}.` : action.data.message,
    fbLoginProblem: action.data.problem,
    authToken: null
  });

const googleLoginRequest = (state, action) =>
  state.merge({
    googleLoginSubmitting: true,
    googleLoginErrorCode: null,
    googleLoginErrorMessage: null
  });

const googleLoginSuccess = (state, action) =>
  state.merge({
    googleLoginSubmitting: false,
    googleLoginErrorCode: null,
    googleLoginErrorMessage: null,
    googleLoginProblem: null
  });

const googleLoginFailure = (state, action) =>
  state.merge({
    googleLoginSubmitting: false,
    googleLoginErrorCode: action.data.errorCode,
    googleLoginErrorMessage: !isEmpty(action.data.errors) ? `${values(action.data.errors).join('. ')}.` : action.data.message,
    googleLoginProblem: action.data.problem,
    authToken: null
  });

const googleLoginCancel = (state, action) =>
  state.merge({
    googleLoginSubmitting: false,
    googleLoginErrorCode: null,
    googleLoginErrorMessage: null,
    googleLoginProblem: null
  });

const googleLoginSetupRequest = (state, action) =>
  state.merge({
    googleLoginSetupReady: false,
    googleLoginSetupProcessing: true,
    googleLoginSetupErrorCode: null,
    googleLoginSetupErrorMessage: null
  });

const googleLoginSetupSuccess = (state, action) =>
  state.merge({
    googleLoginSetupReady: true,
    googleLoginSetupProcessing: false,
    googleLoginSetupErrorCode: null,
    googleLoginSetupErrorMessage: null
  });

const googleLoginSetupFailure = (state, action) =>
  state.merge({
    googleLoginSetupReady: false,
    googleLoginSetupProcessing: false,
    googleLoginSetupErrorCode: action.data.errorCode,
    googleLoginSetupErrorMessage: action.data.message,
  });

const getTokenRequest = (state, action) =>
  state.merge({
    tokenFetching: true,
    tokenErrorCode: null
  });

const getTokenSuccess = (state, action) =>
  state.merge({
    tokenFetching: false,
    tokenErrorCode: null,
    tokenProblem: null,
    authToken: action.authToken
  });

const getTokenFailure = (state, action) =>
  state.merge({
    tokenFetching: false,
    tokenErrorCode: action.errorCode,
    tokenProblem: action.problem,
    authToken: null
  });

const logout = (state, action) =>
  INITIAL_STATE.merge({
    googleLoginSetupReady: state.googleLoginSetupReady
  });

const ACTION_HANDLERS = {
  [types.LOGIN]: loginRequest,
  [types.LOGIN_SUCCESS]: loginSuccess,
  [types.LOGIN_FAILURE]: loginFailure,
  [types.FB_LOGIN]: fbLoginRequest,
  [types.FB_LOGIN_SUCCESS]: fbLoginSuccess,
  [types.FB_LOGIN_FAILURE]: fbLoginFailure,
  [types.GOOGLE_LOGIN]: googleLoginRequest,
  [types.GOOGLE_LOGIN_SUCCESS]: googleLoginSuccess,
  [types.GOOGLE_LOGIN_FAILURE]: googleLoginFailure,
  [types.GOOGLE_LOGIN_CANCEL]: googleLoginCancel,
  [types.GOOGLE_LOGIN_SETUP]: googleLoginSetupRequest,
  [types.GOOGLE_LOGIN_SETUP_SUCCESS]: googleLoginSetupSuccess,
  [types.GOOGLE_LOGIN_SETUP_FAILURE]: googleLoginSetupFailure,
  [types.GET_TOKEN]: getTokenRequest,
  [types.GET_TOKEN_SUCCESS]: getTokenSuccess,
  [types.GET_TOKEN_FAILURE]: getTokenFailure,
  [types.LOGOUT]: logout
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
