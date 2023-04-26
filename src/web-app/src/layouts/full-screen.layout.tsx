import { FloatButton } from 'antd';
import { Layout } from 'antd';
import { FC, ReactNode } from 'react';
const { Content } = Layout;

export interface FullScreenLayoutProps {
  children: ReactNode;
  className?: string;
}

export const FullScreenLayout: FC<FullScreenLayoutProps> = ({
  children,
  className
 }) => {
  return (
    <Layout
      className={className}
      style={{ minHeight: '100vh', maxWidth: '100vw', overflowY: 'hidden' }}
    >
      <Layout className={`fullScreenLayout ${className}`}>
        <Layout className={`site-layout ${className}`}>
          <Content
            style={{
              margin: 10,
              paddingTop: 10,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            {/* <div className='site-layout-background'>{children}</div> */}
            {children}
          </Content>
          <FloatButton.BackTop />
        </Layout>
      </Layout>
    </Layout>
  );
};
