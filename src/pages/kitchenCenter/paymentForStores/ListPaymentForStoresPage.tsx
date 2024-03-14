import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
//redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllMoneyExchangeWithdraw } from 'redux/moneyExchange/moneyExchangeSlice';
// section
import { MoneyExchangeTableRow, MoneyExchangeTableRowSkeleton } from 'sections/moneyExchanges';
import { CreatePaymentForStoreModal } from 'sections/paymentForStores';
// interface
import { ListParams, MoneyExchangeTable, OptionSelect, OrderSort } from 'common/@types';
import { FILTER_STATUS_OPTIONS } from 'common/models';
//
import { CommonTableHead, CustomTableToolbar, EmptyTable, Page } from 'components';
import { useConfigHeadTable, useLocales, useModal, usePagination } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { fDate } from 'utils';

function ListOfPaymentForStoresPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const { handleOpen, isOpen } = useModal();
  const { MoneyExchangeHeadCells } = useConfigHeadTable();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { moneyExchangesWithdraw, numberItems, isLoading } = useAppSelector((state) => state.moneyExchange);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof MoneyExchangeTable>('amount');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const [searchDateFrom, setSearchDateFrom] = useState<Date | null>(null);
  const [searchDateTo, setSearchDateTo] = useState<Date | null>(null);
  const [exchangeStatus, setExchangeStatus] = useState<OptionSelect | null>({ value: '', label: '', id: '' });

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof MoneyExchangeTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeSearchDateFrom = (date: Date | null) => {
    setSearchDateFrom(date as Date);
  };

  const handleChangeSearchDateTo = (date: Date | null) => {
    setSearchDateTo(date as Date);
  };

  const handleChangeFilterStatus = (newStatus: OptionSelect | null) => {
    setExchangeStatus(newStatus);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        sortBy: `${orderBy}_${order}`,
        searchDateFrom: searchDateFrom === null ? '' : fDate(searchDateFrom as Date),
        searchDateTo: searchDateTo === null ? '' : fDate(searchDateTo as Date),
        status: exchangeStatus?.value,
      },
      navigate,
    };
  }, [rowsPerPage, page, orderBy, order, searchDateFrom, searchDateTo, exchangeStatus, navigate]);

  useEffect(() => {
    dispatch<any>(getAllMoneyExchangeWithdraw(params));
  }, [dispatch, params]);

  const handleReloadData = () => {
    dispatch<any>(getAllMoneyExchangeWithdraw(params));
  };

  return (
    <>
      <Page
        title={translate('page.title.list', { model: translate('model.lowercase.paymentForStores') })}
        pathname={pathname}
        navigateDashboard={PATH_KITCHEN_CENTER_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              handleOpen();
            }}
          >
            {translate('button.creation', { model: translate('model.lowercase.paymentForStore') })}
          </Button>,
        ]}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CustomTableToolbar
                showSetting={false}
                selected={selected}
                setSelected={setSelected}
                searchDateFrom={searchDateFrom}
                searchDateTo={searchDateTo}
                headCells={MoneyExchangeHeadCells}
                handleReloadData={handleReloadData}
                haveSelectSearchDateFrom
                haveSelectSearchDateTo
                haveFilterName={false}
                secondOptions={FILTER_STATUS_OPTIONS}
                haveSelectFilterStatus
                handleChangeFilterStatus={handleChangeFilterStatus}
                handleChangeSearchDateFrom={handleChangeSearchDateFrom}
                handleChangeSearchDateTo={handleChangeSearchDateTo}
                model={translate('model.lowercase.moneyExchanges')}
              />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<MoneyExchangeTable>
                    headCells={MoneyExchangeHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />

                  {isLoading ? (
                    <MoneyExchangeTableRowSkeleton />
                  ) : (
                    <TableBody>
                      {moneyExchangesWithdraw.map((moneyExchange, index) => {
                        return <MoneyExchangeTableRow key={index} index={index} moneyExchange={moneyExchange} />;
                      })}
                      {emptyRows > 0 ||
                        (moneyExchangesWithdraw.length === 0 && (
                          <EmptyTable
                            colNumber={MoneyExchangeHeadCells.length + 2}
                            model={translate('model.lowercase.paymentForStores')}
                          />
                        ))}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={numberItems}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={translate('table.rowsPerPage')}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Card>
      </Page>

      {isOpen && (
        <CreatePaymentForStoreModal
          isOpen={isOpen}
          handleOpen={handleOpen}
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={`${orderBy}_${order}`}
          searchDateFrom={searchDateFrom}
          searchDateTo={searchDateTo}
          status={exchangeStatus?.value ? exchangeStatus?.value : ''}
        />
      )}
    </>
  );
}

export default ListOfPaymentForStoresPage;
