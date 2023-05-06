import { Avatar } from 'antd';
import { FC } from 'react';

import { AnyObject } from '@infra/types';
import { UserOutlined } from '@ant-design/icons';



interface AvatarStatusContatoComponente {
  item?: AnyObject;
}

export const AvatarStatusContatoComponente: FC<AvatarStatusContatoComponente> = ({
  item,
}) => {
  return (
    <>
      <Avatar style={{ backgroundColor: item?.online ? '#87d068' : '#fde3cf' }} icon={<UserOutlined />} />
    </>
  );
};
