import { Col, Form, Input, Row } from 'antd';
import { FC } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

export interface ServidorSituacaoComponenteProps {
    loading?: boolean
};

export const ServidorSituacaoComponente: FC<ServidorSituacaoComponenteProps> = ({
    loading = false
}) => {
  return (
    <Row gutter={8} justify='center' align='top'>
        <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
            name="servidor"
            label="Servidor"
            required 
            tooltip={{
                title: 'Informe o nome do servidor',
                icon: <InfoCircleOutlined />
            }}
            hasFeedback
            validateStatus="warning"
            >
            <Input
                status="warning"
                placeholder="Servidor"
                disabled={loading}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                const { value } = e.target;
                console.log('Slugname servidor', value);
                }}
            />
            </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
            label="Situação"
            required 
            hasFeedback
            validateStatus="warning"
            >
            <Input readOnly placeholder="Situação" disabled={loading}/>
            </Form.Item>
        </Col>
    </Row>
  );
};
