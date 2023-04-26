// Imports
// To Test
import { render } from '@testing-library/react';
import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import store from '@infra/store';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '../app-routes';

// Tests
test('Renders main page correctly', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Setup
  render(
    <Provider store={store}>
      <ConfigProvider locale={ptBR}>
      <div className='App'>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </div>
      </ConfigProvider>
    </Provider>
  );

  // Pre Expecations

  // Init

  // Post Expectations
  expect(true).toBeTruthy();
});
