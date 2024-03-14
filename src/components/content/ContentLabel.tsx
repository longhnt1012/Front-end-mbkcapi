import { Divider, Stack, Typography } from '@mui/material';
import { Color } from 'common/enums';
import Label from '../label/Label';

interface ContentLabelProps {
  divider?: boolean;
  title: string;
  color: Color;
  content: string | undefined;
}

function ContentLabel({ divider = true, title, color, content }: ContentLabelProps) {
  return (
    <>
      {divider && <Divider />}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">{title}</Typography>
        <Label color={color}>{content}</Label>
      </Stack>
    </>
  );
}

export default ContentLabel;
