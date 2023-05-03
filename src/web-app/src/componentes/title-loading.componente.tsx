import { Avatar, Button, Card, Col, List, Row, Skeleton, Typography } from 'antd';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

export interface AuthenticatedScreenLayoutProps {
    children: ReactNode;
    loading?: boolean;
  }

export const TitleLoading: FC<AuthenticatedScreenLayoutProps> = ({ 
    children,
    loading = false
  }) => {
    return loading ? (
        <>
            <Skeleton.Input active={true} size='small' block={true} />
        </>
    ) : (
      <>
        <Title data-testid="titulo-bem-vindo" style={{ marginTop: 0 }}>{children}</Title>
      </>
    );
  };
  