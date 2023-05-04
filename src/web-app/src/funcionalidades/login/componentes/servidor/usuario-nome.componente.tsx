import { Col, Form, Input, Row } from 'antd';
import { FC, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { LoginApiService } from '@infra/external-services/login-api.service';
import { ValidateStatus } from '@infra/types';

export interface UsuarioNomeComponenteProps {
    loading?: boolean
};

const _loginApiService = new LoginApiService;

export const UsuarioNomeComponente: FC<UsuarioNomeComponenteProps> = ({
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
        const servidorResponse = await _loginApiService.validarUsername(value);

        console.log('Slugname username', value);
        setStatusValidacao('success');
    };

    return (
        <Row gutter={8} justify='center' align='top'>
            <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                    name="username"
                    label="Username"
                    required 
                    tooltip={{
                        title: 'Informe username do usuário',
                        icon: <InfoCircleOutlined />
                    }}
                    hasFeedback
                    validateStatus={statusValidacao}
                >
                    <Input
                        placeholder="Username"
                        disabled={loading}
                        onBlur={onBlurEvent}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                    name="nome"
                    label="Nome"
                    required 
                    tooltip={{
                        title: 'Informe o nome para o usuário',
                        icon: <InfoCircleOutlined />
                    }}
                    hasFeedback
                    validateStatus={statusValidacao}
                >
                    <Input
                        readOnly
                        placeholder="Nome"
                        disabled={!statusValidacao || loading}
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};
