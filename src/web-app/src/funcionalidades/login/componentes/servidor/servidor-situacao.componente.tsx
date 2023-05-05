import { Col, Form, Input, Row } from 'antd';
import { FC, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { LoginApiService } from '@infra/external-services/login-api.service';
import { ValidateStatus } from '@infra/types';

export interface ServidorSituacaoComponenteProps {
    loading?: boolean
};

const _loginApiService = new LoginApiService;

export const ServidorSituacaoComponente: FC<ServidorSituacaoComponenteProps> = ({
    loading = false
}) => {
    const [statusValidacao, setStatusValidacao] = useState<ValidateStatus>('');

    const onBlurEvent = async (e: React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;

        if (!value || value?.trim() === '') {
            setStatusValidacao('');
            return;
        }

        setStatusValidacao('validating');
        const servidorResponse = await _loginApiService.validarServidor(value);
        console.log(servidorResponse);
        console.log('Slugname servidor', value);
        setStatusValidacao('success');
    };

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
                    validateStatus={statusValidacao}
                >
                    <Input
                        placeholder="Servidor"
                        disabled={loading}
                        onBlur={onBlurEvent}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                    label="Situação"
                    required 
                    hasFeedback
                    validateStatus={statusValidacao}
                >
                    <Input
                        readOnly
                        placeholder="Situação"
                        disabled={!statusValidacao || loading}
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};
