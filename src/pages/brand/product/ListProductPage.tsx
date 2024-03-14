/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllProducts, getProductEmpty, setAddProduct } from 'redux/product/productSlice';
import { setRoutesToBack } from 'redux/routes/routesSlice';
// section
import { ProductTableRow, ProductTableRowSkeleton } from 'sections/product';
// interface
import { ListParams, OrderSort, OrderSortBy, ProductTable } from 'common/@types';
import { PRODUCT_TYPE_TABS, ProductTypeEnum } from 'common/models';
//
import { CustomTableHead, CustomTableToolbar, CustomTabs, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';

function ListProductPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { productHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { products, isLoading, numberItems } = useAppSelector((state) => state.product);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof ProductTable>(OrderSortBy.DISPLAY_ORDER);
  const [filterName, setFilterName] = useState<string>('');
  const [productType, setProductType] = useState<string>('');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setProductType(newValue);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ProductTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const isNotFound = !products.length && !!filterName;

  const debounceValue = useDebounce(filterName.trim(), 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        searchValue: debounceValue,
        currentPage: page + 1,
        itemsPerPage: rowsPerPage,
        type: productType,
        sortBy: `${orderBy}_${order}`,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, productType, orderBy, order]);

  useEffect(() => {
    dispatch<any>(getAllProducts(params));
  }, [params]);

  const handleReloadData = () => {
    dispatch<any>(getAllProducts(params));
  };

  return (
    <>
      <Page
        containerWidth="xl"
        title={translate('page.title.list', { model: translate('model.lowercase.product') })}
        pathname={pathname}
        navigateDashboard={PATH_BRAND_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              navigate(PATH_BRAND_APP.product.newProduct);
              dispatch(setRoutesToBack(pathname));
              dispatch(setAddProduct());
              dispatch(getProductEmpty());
            }}
          >
            {translate('button.add', { model: translate('model.lowercase.product') })}
          </Button>,
        ]}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CustomTabs<ProductTypeEnum>
                length={numberItems}
                isLoading={isLoading}
                value={productType}
                handleChange={handleChange}
                options={PRODUCT_TYPE_TABS}
              />
              <CustomTableToolbar<ProductTable>
                model={translate('model.lowercase.product')}
                selected={selected}
                setSelected={setSelected}
                headCells={productHeadCells}
                filterName={filterName}
                onFilterName={handleFilterByName}
                handleReloadData={handleReloadData}
              />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CustomTableHead<ProductTable>
                    showAction
                    headCells={productHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    selectedCol={selected}
                  />
                  {isLoading ? (
                    <ProductTableRowSkeleton length={products.length} selected={selected} />
                  ) : (
                    <TableBody>
                      {products.map((product, index) => {
                        return (
                          <ProductTableRow
                            key={product.productId}
                            setPage={setPage}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            length={products.length}
                            index={index}
                            product={product}
                            selected={selected}
                            filterName={filterName}
                            productType={productType}
                            sortBy={`${orderBy}_${order}`}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (products.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={productHeadCells.length + 2}
                            model={translate('model.lowercase.product')}
                          />
                        ))}
                    </TableBody>
                  )}
                  {isNotFound && <SearchNotFound colNumber={productHeadCells.length + 2} searchQuery={filterName} />}
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

export default ListProductPage;
