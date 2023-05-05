import { Col, Form, FormInstance, Input, Row } from 'antd';
import { FC, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { LoginApiService } from '@infra/external-services/login-api.service';
import { AnyObject, ValidateStatus } from '@infra/types';

export interface UsuarioNomeComponenteProps {
    loading?: boolean,
    form?: FormInstance<AnyObject>,
    servidorSlugname?: string
};

const _loginApiService = new LoginApiService;

export const UsuarioNomeComponente: FC<UsuarioNomeComponenteProps> = ({
    servidorSlugname,
    loading = false,
    form
}) => {
    const [nomeApenasLeitura, setNomeApenasLeitura] = useState<boolean>(true);
    const [statusValidacao, setStatusValidacao] = useState<ValidateStatus>('');

    const onBlurEvent = async (e: React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;

        if (!value || value?.trim() === '' || !servidorSlugname || servidorSlugname?.trim() === '') {
            setStatusValidacao('');
            return;
        }
        setStatusValidacao('validating');
        
        const servidorResponse = await _loginApiService.validarUsername({
            servidor: servidorSlugname,
            username: value
        });
        console.log(servidorResponse);
        if (servidorResponse?.result) {
            form && form.setFieldValue('username', servidorResponse?.data?.slugname);
            form && form.setFieldValue('nome', servidorResponse?.data?.nome);
            setNomeApenasLeitura(servidorResponse?.data?.existe)
            setStatusValidacao('success');
            return;
        }
        setStatusValidacao('warning');
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
                        disabled={loading || !servidorSlugname || servidorSlugname?.trim() === ''}
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
                        readOnly={nomeApenasLeitura}
                        placeholder="Nome"
                        disabled={!statusValidacao || loading}
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};
