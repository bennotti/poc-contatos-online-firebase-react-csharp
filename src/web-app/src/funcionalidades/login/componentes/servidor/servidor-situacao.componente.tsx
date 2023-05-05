import { Col, Form, FormInstance, Input, Row } from 'antd';
import { FC, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { LoginApiService } from '@infra/external-services/login-api.service';
import { AnyObject, ValidateStatus } from '@infra/types';

export interface ServidorSituacaoComponenteProps {
    loading?: boolean,
    form?: FormInstance<AnyObject>,
    onSlugnameChange?: (slugname: string) => void
};

const _loginApiService = new LoginApiService;

export const ServidorSituacaoComponente: FC<ServidorSituacaoComponenteProps> = ({
    loading = false,
    form,
    onSlugnameChange
}) => {
    const [situacaoServidor, setSituacaoServidor] = useState<'Novo servidor' | 'Servidor já existe' | ''>('');
    const [statusValidacao, setStatusValidacao] = useState<ValidateStatus>('');

    const onBlurEvent = async (e: React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;

        if (!value || value?.trim() === '') {
            onSlugnameChange?.('');
            setStatusValidacao('');
            return;
        }

        setStatusValidacao('validating');
        const servidorResponse = await _loginApiService.validarServidor(value);

        if (servidorResponse?.result) {
            onSlugnameChange?.(servidorResponse?.data?.slugname ?? '');
            setStatusValidacao('success');
            setSituacaoServidor(servidorResponse?.data?.existe ? 'Servidor já existe' : 'Novo servidor');
            return;
        }
        onSlugnameChange?.('');
        setStatusValidacao('warning');
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
                        value={situacaoServidor}
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};
