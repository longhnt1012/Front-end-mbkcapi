/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// redux
import { getAllBankingAccounts, setAddBankingAccount } from 'redux/bankingAccount/bankingAccountSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
// section
import { BankingAccountTableRow, BankingAccountTableRowSkeleton } from 'sections/bankingAccount';
//
import { BankingAccountTable, ListParams, OrderSort, OrderSortBy } from 'common/@types';
import { CustomTableHead, CustomTableToolbar, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, useModal, usePagination } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { CreateBankingAccountModal } from 'sections/bankingAccount';
import { BankingAccount } from 'common/models';

function ListBankingAccountPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { bankingAccountHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { bankingAccounts, isLoading, numberItems } = useAppSelector((state) => state.bankingAccount);
  const { handleOpen, isOpen } = useModal();

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof BankingAccount>(OrderSortBy.NAME);
  const [filterName, setFilterName] = useState<string>('');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof BankingAccount) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const isNotFound = !bankingAccounts.length && !!filterName;

  const debounceValue = useDebounce(filterName.trim(), 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        searchValue: debounceValue,
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        sortBy: `${orderBy}_${order}`,
      },
      navigate,
    };
  }, [page, rowsPerPage, orderBy, order, debounceValue]);

  useEffect(() => {
    dispatch<any>(getAllBankingAccounts(params));
  }, [params]);

  const handleReloadData = () => {
    dispatch<any>(getAllBankingAccounts(params));
  };

  return (
    <>
      <Page
        title={translate('page.title.list', { model: translate('model.lowercase.bankingAccounts') })}
        pathname={pathname}
        navigateDashboard={PATH_KITCHEN_CENTER_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              handleOpen();
              dispatch(setAddBankingAccount());
            }}
          >
            {translate('button.add', { model: translate('model.lowercase.bankingAccount') })}
          </Button>,
        ]}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CustomTableToolbar<BankingAccountTable>
                model={translate('model.lowercase.bankingAccount')}
                selected={selected}
                setSelected={setSelected}
                headCells={bankingAccountHeadCells}
                filterName={filterName}
                onFilterName={handleFilterByName}
                handleReloadData={handleReloadData}
              />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CustomTableHead<BankingAccountTable>
                    showAction
                    headCells={bankingAccountHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    selectedCol={selected}
                  />
                  {isLoading ? (
                    <BankingAccountTableRowSkeleton length={bankingAccounts.length} selected={selected} />
                  ) : (
                    <TableBody>
                      {bankingAccounts.map((bankingAccount, index) => {
                        return (
                          <BankingAccountTableRow
                            key={bankingAccount.bankingAccountId}
                            index={index}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            setPage={setPage}
                            bankingAccount={bankingAccount}
                            selected={selected}
                            filterName={filterName}
                            sortBy={`${orderBy}_${order}`}
                            length={bankingAccounts.length}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (bankingAccounts.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={bankingAccountHeadCells.length + 2}
                            model={translate('model.lowercase.bankingAccount')}
                          />
                        ))}
                    </TableBody>
                  )}
                  {isNotFound && (
                    <SearchNotFound colNumber={bankingAccountHeadCells.length + 2} searchQuery={filterName} />
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
        <CreateBankingAccountModal
          isOpen={isOpen}
          handleOpen={handleOpen}
          page={page + 1}
          rowsPerPage={rowsPerPage}
          filterName={filterName}
          sortBy={`${orderBy}_${order}`}
        />
      )}
    </>
  );
}

export default ListBankingAccountPage;
