import { Grid2 } from '@mui/material';
import { FC, ReactNode } from 'react';
import FriendCard from './FriendCard';

type Props = {
  data: { avatar: ReactNode; name: string }[];
}

const InviteFriendList: FC<Props> = ({ data }: Props) => {
  return <Grid2
    container
    spacing={3}
    flex={1}
    maxHeight={270}
    sx={{
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      } as React.CSSProperties,
      msOverflowStyle: 'none' as React.CSSProperties,
      scrollbarWidth: 'none' as React.CSSProperties,
    }}
  >
    {data.map(({ avatar, name }) => <Grid2 key={name} size={4}>
      <FriendCard
        avatar={avatar}
        name={name}
        backgroundTransparent
        avatarSize={48}
        gap={1.5}
        active={Math.random() >= 0.5}
      />
    </Grid2>)}
  </Grid2>;
};

export default InviteFriendList;