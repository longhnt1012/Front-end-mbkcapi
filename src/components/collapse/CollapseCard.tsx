import { ReactNode, useState } from 'react';
// @mui
import ExpandMore from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Card, Collapse, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';

interface CollapseCardProps {
  icon: ReactNode;
  title: string;
  content: string;
  children: ReactNode;
}

function CollapseCard({ icon, title, content, children }: CollapseCardProps) {
  const [openList, setOpenList] = useState(0);

  return (
    <Card sx={{ p: 2, boxShadow: 'none', border: 1, borderColor: (theme) => theme.palette.grey[400] }}>
      <Paper>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" gap={2}>
            <Stack
              alignItems="center"
              justifyContent="center"
              borderRadius="10px"
              sx={{ p: 2, bgcolor: (theme) => theme.palette.grey[200] }}
            >
              {icon}
            </Stack>
            <Stack direction="column">
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2" sx={{ color: (theme) => theme.palette.text.secondary }}>
                {content}
              </Typography>
            </Stack>
          </Stack>
          <IconButton onClick={() => setOpenList(openList === 2 ? -1 : 2)}>
            {openList === 2 ? <ExpandMore /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </Stack>

        <Collapse in={openList === 2} orientation="vertical" timeout="auto" unmountOnExit sx={{ mt: 2 }}>
          <Divider sx={{ mb: 2 }} />
          {children}
        </Collapse>
      </Paper>
    </Card>
  );
}

export default CollapseCard;
