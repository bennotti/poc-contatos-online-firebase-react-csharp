import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FullScreenLayout } from '@layouts/full-screen.layout';
import { AnyObject } from '@infra/types';
import { LoginApiService } from '@infra/external-services/login-api.service';

const { Title } = Typography;

const _loginApiService = new LoginApiService;

export const LoginScreen: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: AnyObject) => {
    console.log(values);
    const response = await _loginApiService.autenticar(values);

    localStorage.setItem('access_token', response?.data?.accessToken);

    console.log(response);
    navigate('/');
  };

  return (
    <FullScreenLayout className='site-layout-background'>
      <Row gutter={8}  justify='center' align='top' style={{ marginBottom: 10 }}>
        <Col xs={24} sm={24} md={24} lg={8} className='site-layout-background' style={{ paddingBottom: 20, textAlign: 'center' }}>
          <Title data-testid="titulo-bem-vindo">Bem vindo!</Title>
        </Col>
      </Row>
      <Row gutter={8} justify='center' align='top' style={{ marginBottom: 10 }}>
        <Col xs={24} sm={24} md={24} lg={8} className='site-layout-background' style={{ paddingBottom: 20}}>
        <Form
          layout={'vertical'}
          form={form}
          initialValues={{ }}
          onFinish={onFinish}
        >
          <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
            <Input placeholder="Nome" />
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">Entrar</Button>
          </Form.Item>
        </Form>
        </Col>
      </Row>
    </FullScreenLayout>
  );
};
