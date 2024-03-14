import React from 'react';
import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { HeadCell, OrderSort } from 'common/@types';
import { useLocales } from 'hooks';

interface CustomTableHeadProps<T> {
  numSelected?: number;
  rowCount?: number;
  checkbox?: boolean;
  showAction?: boolean;
  showPartner?: boolean;
  hideKitchenCenter?: boolean;
  hideBrand?: boolean;
  hideEmail?: boolean;
  hideLogo?: boolean;
  hideStatus?: boolean;
  hideCategory?: boolean;
  hideDiscountPrice?: boolean;
  hideHistoricalPrice?: boolean;
  hideType?: boolean;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order?: OrderSort;
  orderBy?: string;
  headCells: HeadCell<T>[];
}

function CustomTableHead<T>(props: CustomTableHeadProps<T>) {
  const {
    numSelected = 0,
    rowCount = 0,
    checkbox = false,
    showAction = false,
    showPartner = false,
    hideKitchenCenter = false,
    hideBrand = false,
    hideEmail = false,
    hideLogo = false,
    hideStatus = false,
    hideCategory = false,
    hideType = false,
    hideHistoricalPrice = false,
    hideDiscountPrice = false,
    onSelectAllClick,
    headCells,
    order,
    orderBy,
    onRequestSort,
  } = props;

  const { translate } = useLocales();

  const filterHeadCells = hideKitchenCenter
    ? headCells.filter((col) => col.id !== 'kitchenCenter')
    : hideBrand && hideEmail && hideLogo && hideStatus
    ? headCells.filter(
        (col) => col.id !== 'brand' && col.id !== 'storeManagerEmail' && col.id !== 'logo' && col.id !== 'status'
      )
    : hideBrand
    ? headCells.filter((col) => col.id !== 'brand')
    : hideEmail
    ? headCells.filter((col) => col.id !== 'storeManagerEmail')
    : hideType && hideCategory
    ? headCells.filter((col) => col.id !== 'category' && col.id !== 'type')
    : hideDiscountPrice && hideHistoricalPrice
    ? headCells.filter((col) => col.id !== 'discountPrice' && col.id !== 'historicalPrice')
    : headCells;

  const createSortHandler = (property: keyof T) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {checkbox ? (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        ) : (
          <TableCell align="center">
            <TableSortLabel hideSortIcon>{translate('table.no')}</TableSortLabel>
          </TableCell>
        )}

        {filterHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id as string}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {!headCell.hideSortIcon ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                hideSortIcon={headCell.hideSortIcon ? true : false}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
            )}
          </TableCell>
        ))}
        {showPartner && <TableCell>{translate('table.partners')}</TableCell>}
        {showAction && <TableCell></TableCell>}
      </TableRow>
    </TableHead>
  );
}

export default CustomTableHead;
