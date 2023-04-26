import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnyObject } from '@infra/types';


export const keycloakEvent = createAsyncThunk(
  'auth/keycloakEvent',
  async (
    keycloakEvent: AnyObject,
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      if (!!keycloakEvent.error) {
        throw new Error(keycloakEvent.error as string ?? 'Error keycloak event');
      }
      if (keycloakEvent.event as string === 'onAuthRefreshSuccess' || keycloakEvent.event as string === 'onAuthSuccess') {
        return fulfillWithValue(keycloakEvent.event);
      }

      if (keycloakEvent.event === 'onInitError') {
        return rejectWithValue(keycloakEvent.event);
      }
      return fulfillWithValue(keycloakEvent.event);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const keycloakTokens = createAsyncThunk(
  'auth/keycloakTokens',
  async (
    tokens: AnyObject,
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      if (!tokens) {
        return rejectWithValue('Inválid token');
      }
      if (!tokens?.idToken) {
        return rejectWithValue('Inválid token');
      }
      return fulfillWithValue(tokens);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);