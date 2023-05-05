import { Col, Form, FormInstance, Input, Row } from 'antd';
import { FC, useEffect, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { LoginApiService } from '@infra/external-services/login-api.service';
import { AnyObject, ValidateStatus } from '@infra/types';

export interface UsuarioNomeComponenteProps {
    loading?: boolean,
    form?: FormInstance<AnyObject>,
    servidorSlugname?: string,
    onChange?: () => void,
};

const _loginApiService = new LoginApiService;

export const UsuarioNomeComponente: FC<UsuarioNomeComponenteProps> = ({
    servidorSlugname,
    loading = false,
    form,
    onChange
}) => {
    const [nomeApenasLeitura, setNomeApenasLeitura] = useState<boolean>(true);
    const [statusValidacao, setStatusValidacao] = useState<ValidateStatus>('');
    const [servidorNome, setServidorNome] = useState<string>('');

    useEffect(() => {
        carregarDados().catch(console.error);
    }, []);

    useEffect(() => {
        if (servidorNome !== undefined && servidorNome.length === 0) {
            const timeOut = setTimeout(() => {
                setValorVazio();
            }, 1500);
            return () => clearTimeout(timeOut);
        }
    
        if (servidorNome && servidorNome.length >= 3) {
            const timeOut = setTimeout(() => {
                setValor(servidorNome);
            }, 1500);
            return () => clearTimeout(timeOut);
        }
    }, [servidorNome]);

    const carregarDados = async () => {
        const values = await form?.validateFields();
        setValor(values?.username);
    };

    const setValorVazio = () => {
        onChange?.();
        setStatusValidacao('');
    };

    const setValor = async (value: string) => {
        if (!value || value?.trim() === '' || !servidorSlugname || servidorSlugname?.trim() === '') {
            setValorVazio();
            return;
        }

        setStatusValidacao('validating');
        const servidorResponse = await _loginApiService.validarServidor(value);

        if (servidorResponse?.result) {
            form && form.setFieldValue('username', servidorResponse?.data?.slugname);
            form && form.setFieldValue('nome', servidorResponse?.data?.nome);
            setNomeApenasLeitura(servidorResponse?.data?.existe)
            setStatusValidacao('success');
            onChange?.();
            return;
        }
        setStatusValidacao('warning');
        onChange?.();
    };

    const onBlurEvent = async (e: React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setValor(value);
    };

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setServidorNome(value);
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
                        onChange={onUsernameChange}
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
