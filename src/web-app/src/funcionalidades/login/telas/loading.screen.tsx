import { Layout, Spin } from 'antd';
import { FC } from 'react';

export const LoadingScreen: FC = () => {
  return (
    <Layout
      style={{ minHeight: '100vh', maxWidth: '100vw', overflowY: 'hidden' }}
    >
      <Spin size='large' style={{minHeight: '100vh'}}>
        <div style={{minHeight: '100vh', maxWidth: '100vw'}}></div>
      </Spin>
    </Layout>
  );
};
