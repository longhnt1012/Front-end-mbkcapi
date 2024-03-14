import { TableBody, TableCell, TableRow } from '@mui/material';
import { Paper, PaperProps, Typography } from '@mui/material';
import { useLocales } from 'hooks';

// ----------------------------------------------------------------------

interface SearchNotFoundProps extends PaperProps {
  searchQuery?: string;
  colNumber: number;
}

function SearchNotFound({ searchQuery = '', colNumber, ...other }: SearchNotFoundProps) {
  const { translate } = useLocales();

  return (
    <TableBody>
      <TableRow>
        <TableCell align="center" colSpan={colNumber} height={365}>
          <Paper
            sx={{
              textAlign: 'center',
            }}
            {...other}
          >
            <Typography variant="h6" paragraph>
              {translate('page.content.notFound')}
            </Typography>

            <Typography variant="body2">
              {translate('page.content.noResult')} &nbsp;
              <strong>&quot;{searchQuery}&quot;</strong>.
              <br /> {translate('page.content.tryAgain')}
            </Typography>
          </Paper>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default SearchNotFound;
