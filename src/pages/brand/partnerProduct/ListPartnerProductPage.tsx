/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// @mui icon
import LinkIcon from '@mui/icons-material/Link';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllPartnerProducts, setAddPartnerProduct } from 'redux/partnerProduct/partnerProductSlice';
// section
import {
  CreatePartnerProductModal,
  PartnerProductTableRow,
  PartnerProductTableRowSkeleton,
} from 'sections/partnerProduct';
//
import { ListParams, OrderSort, OrderSortBy, PartnerProductTable } from 'common/@types';
import { CustomTableHead, CustomTableToolbar, EmptyTable, LoadingScreen, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, useModal, usePagination } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';

function ListPartnerProductPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { handleOpen, isOpen } = useModal();
  const { partnerProductHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { isLoading: isLoadingStore } = useAppSelector((state) => state.store);
  const { isLoading: isLoadingPartner } = useAppSelector((state) => state.partner);
  const { isLoading: isLoadingProduct } = useAppSelector((state) => state.product);
  const { partnerProducts, isLoading, numberItems } = useAppSelector((state) => state.partnerProduct);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof PartnerProductTable>(OrderSortBy.PRODUCT_NAME);
  const [filterName, setFilterName] = useState<string>('');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof PartnerProductTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - partnerProducts.length) : 0;

  const isNotFound = !partnerProducts.length && !!filterName;

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
    dispatch<any>(getAllPartnerProducts(params));
  }, [params]);

  const handleReloadData = () => {
    dispatch<any>(getAllPartnerProducts(params));
  };

  return (
    <>
      {(isLoadingStore || isLoadingPartner || isLoadingProduct) && (
        <Box sx={{ position: 'fixed', zIndex: 1300, top: 0, bottom: 0, left: 0, right: 0 }}>
          <LoadingScreen />
        </Box>
      )}

      <Page
        containerWidth="xl"
        title={translate('page.title.list', { model: translate('model.lowercase.partnerProduct') })}
        pathname={pathname}
        navigateDashboard={PATH_BRAND_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<LinkIcon />}
            onClick={() => {
              handleOpen();
              dispatch(setAddPartnerProduct());
            }}
          >
            {translate('button.createProductLink')}
          </Button>,
        ]}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CustomTableToolbar<PartnerProductTable>
                model={translate('model.lowercase.partnerProduct')}
                selected={selected}
                setSelected={setSelected}
                headCells={partnerProductHeadCells}
                filterName={filterName}
                onFilterName={handleFilterByName}
                handleReloadData={handleReloadData}
              />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CustomTableHead<PartnerProductTable>
                    showAction
                    headCells={partnerProductHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    selectedCol={selected}
                  />
                  {isLoading ? (
                    <PartnerProductTableRowSkeleton length={partnerProducts.length} selected={selected} />
                  ) : (
                    <TableBody>
                      {partnerProducts?.map((partnerProduct, index) => {
                        return (
                          <PartnerProductTableRow
                            key={partnerProduct.productId}
                            setPage={setPage}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            length={partnerProducts.length}
                            index={index}
                            partnerProduct={partnerProduct}
                            selected={selected}
                            filterName={filterName}
                            sortBy={`${orderBy}_${order}`}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (partnerProducts.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={partnerProductHeadCells.length + 2}
                            model={translate('model.lowercase.partnerProduct')}
                          />
                        ))}
                    </TableBody>
                  )}
                  {isNotFound && (
                    <SearchNotFound colNumber={partnerProductHeadCells.length + 2} searchQuery={filterName} />
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
        <CreatePartnerProductModal
          isOpen={isOpen}
          handleOpen={handleOpen}
          filterName={filterName}
          sortBy={`${orderBy}_${order}`}
        />
      )}
    </>
  );
}

export default ListPartnerProductPage;
