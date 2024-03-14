/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// @mui icon
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllPartners } from 'redux/partner/partnerSlice';
// section
import { PartnerTableRow, PartnerTableRowSkeleton } from 'sections/partner';
//
import { ListParams, OrderSort, OrderSortBy, PartnerTable } from 'common/@types';
import { Role } from 'common/enums';
import { CustomTableHead, CustomTableToolbar, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';

function ListPartnerPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { partnerHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { partners, isLoading, numberItems } = useAppSelector((state) => state.partner);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof PartnerTable>(OrderSortBy.NAME);
  const [filterName, setFilterName] = useState<string>('');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof PartnerTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - partners.length) : 0;

  const isNotFound = !partners.length && !!filterName;

  const debounceValue = useDebounce(filterName.trim(), 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        searchValue: debounceValue,
        currentPage: page + 1,
        itemsPerPage: rowsPerPage,
        sortBy: `${orderBy}_${order}`,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, orderBy, order]);

  useEffect(() => {
    dispatch(getAllPartners(params));
  }, [params]);

  const handleReloadData = () => {
    dispatch<any>(getAllPartners(params));
  };

  return (
    <>
      <Page
        pathname={pathname}
        title={translate('page.title.list', { model: translate('model.lowercase.partners') })}
        navigateDashboard={userAuth?.roleName === Role.BRAND_MANAGER ? PATH_BRAND_APP.root : PATH_ADMIN_APP.root}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CustomTableToolbar<PartnerTable>
                model={translate('model.lowercase.partner')}
                selected={selected}
                setSelected={setSelected}
                headCells={partnerHeadCells}
                filterName={filterName}
                onFilterName={handleFilterByName}
                handleReloadData={handleReloadData}
              />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CustomTableHead<PartnerTable>
                    showAction={userAuth?.roleName === Role.MBKC_ADMIN}
                    headCells={partnerHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    selectedCol={selected}
                  />
                  {isLoading ? (
                    <PartnerTableRowSkeleton length={partners.length} selected={selected} />
                  ) : (
                    <TableBody>
                      {partners.map((partner, index) => {
                        return (
                          <PartnerTableRow
                            showAction={userAuth?.roleName === Role.MBKC_ADMIN}
                            key={partner.partnerId}
                            index={index}
                            partner={partner}
                            lengthPartners={partners.length}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            setPage={setPage}
                            selected={selected}
                            filterName={filterName}
                            sortBy={`${orderBy}_${order}`}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (partners.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={partnerHeadCells.length + 2}
                            model={translate('model.lowercase.partner')}
                          />
                        ))}
                    </TableBody>
                  )}
                  {isNotFound && <SearchNotFound colNumber={partnerHeadCells.length + 2} searchQuery={filterName} />}
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
    </>
  );
}

export default ListPartnerPage;
