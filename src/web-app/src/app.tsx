import '@assets/css/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@assets/css/scrollbar.css';
import '@assets/css/app.css';

import { AppRoutes } from './app-routes';
import store from '@infra/store';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import reportWebVitals from './report-web-vitals';
import { BrowserRouter } from 'react-router-dom';
import { env } from '@infra/env';

async function checkAndStartMock() {
  if (!env.IS_MOCK) return;
  console.log('Rodando Mock: ', env.IS_WEB ? 'WEB' : 'DESKTOP');
  const { createWorker } = await import('@infra/mock/browser');
  const { mockEndpointsHandlers } = await import('@infra/mock/endpoints.handlers');
  const { mswHandlers } = await import('@modulos/msw.handlers');
  const worker = createWorker(
    [
      ...mockEndpointsHandlers,
      ...mswHandlers
    ]
  );
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
};

async function start() {
  await checkAndStartMock();
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
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
}

start();

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
