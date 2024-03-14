import { Divider, Stack, Typography } from '@mui/material';

interface ContentSpaceProps {
  divider?: boolean;
  title: string;
  content: string | number | undefined;
}

function ContentSpace({ divider = true, title, content }: ContentSpaceProps) {
  return (
    <>
      {divider && <Divider />}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="body1">{content}</Typography>
      </Stack>
    </>
  );
}

export default ContentSpace;
