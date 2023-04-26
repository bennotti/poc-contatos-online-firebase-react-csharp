import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type situacaoLoginType = 'restaurando' | 'autenticado' | 'nao-autenticadao';

export interface LoginState {
  situacao: situacaoLoginType;
}

const loginSlice = createSlice({
  initialState: {
    situacao: 'restaurando',
  } as LoginState,
  name: 'layout',
  reducers: {
    updateSituacao(state, action: PayloadAction<situacaoLoginType>) {
      state.situacao = action.payload;
    },
  },
  extraReducers(builder) {
    // builder.addCase(keycloakEvent.fulfilled, state => {
    //   state.layout = 'application';
    // });

    // builder.addCase(keycloakTokens.fulfilled, state => {
    //   // console.log('okk');
    //   state.layout = 'application';
    // });

    // builder.addCase(keycloakEvent.rejected, state => {
    //   // console.log('error keycloak');
    //   state.layout = 'auth';
    // });

    // builder.addCase(keycloakTokens.rejected, state => {
    //   // console.log('error');
    //   state.layout = 'auth';
    // });
  },
});

export const loginReducer = loginSlice.reducer;

export const { updateSituacao } = loginSlice.actions;
