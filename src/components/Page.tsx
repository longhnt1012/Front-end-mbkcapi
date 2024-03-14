import { forwardRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
// material
import { Box, Breakpoint, Container, Stack, Typography } from '@mui/material';
import Breadcrumbs from './breadcrumbs/Breadcrumbs';

// ----------------------------------------------------------------------

interface PageProps {
  children: ReactNode;
  containerWidth?: false | Breakpoint;
  title: string;
  pathname: string;
  navigateDashboard: string;
  content?: ReactNode;
  actions?: () => ReactNode[];
}

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ containerWidth = 'lg', children, title = '', pathname, navigateDashboard, content, actions, ...other }, ref) => {
    return (
      <Box ref={ref} {...other}>
        <Helmet>
          <title>{title} | MBKC</title>
        </Helmet>

        <Container maxWidth={containerWidth}>
          <Box pb={6}>
            <Stack direction="row" alignItems="start" justifyContent="space-between">
              <Stack>
                <Typography variant="h4" textTransform="uppercase">
                  {title}
                </Typography>
                <Breadcrumbs pathname={pathname} navigateDashboard={navigateDashboard} />
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                {actions && actions().map((action, index) => <div key={index}>{action}</div>)}
              </Stack>
            </Stack>
            {content}
          </Box>
          {children}
        </Container>
      </Box>
    );
  }
);

export default Page;
