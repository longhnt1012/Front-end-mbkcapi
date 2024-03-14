/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllProductsSold, getProductDetail_local, setIsProduct, setProductType } from 'redux/product/productSlice';
import { setRoutesToBack } from 'redux/routes/routesSlice';
// section
import { ProductTableRowDashboardSkeleton } from 'sections/product';
// interface
import { ListParams, OptionSelect, OrderSort, OrderSortBy, ProductDashboardTable } from 'common/@types';
import { Color, Status } from 'common/enums';
import { PRODUCT_TYPE_OPTIONS, ProductTypeEnum } from 'common/models';
//
import { CustomTableHead, CustomTableToolbar, EmptyTable, Label, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';
import { fCurrencyVN, fDate } from 'utils';

function ListProductStatistics() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { productDashboardHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { isLoading: isLoadingStore } = useAppSelector((state) => state.store);
  const { productsSold, numberItems, isLoading: isLoadingProduct } = useAppSelector((state) => state.product);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof ProductDashboardTable>(OrderSortBy.NAME);
  const [filterName, setFilterName] = useState<string>('');
  const [productTypeSelect, setProductTypeSelect] = useState<OptionSelect | null>({ value: '', label: '', id: '' });
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [searchDateFrom, setSearchDateFrom] = useState<Date | null>(null);
  const [searchDateTo, setSearchDateTo] = useState<Date | null>(null);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ProductDashboardTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  const handleChangeSearchDateFrom = (date: Date | null) => {
    setSearchDateFrom(date);
  };

  const handleChangeSearchDateTo = (date: Date | null) => {
    setSearchDateTo(date);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productsSold.length) : 0;

  const isNotFound = !productsSold.length && !!filterName;

  const debounceValue = useDebounce(filterName.trim(), 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        searchValue: debounceValue,
        currentPage: page + 1,
        itemsPerPage: rowsPerPage,
        type: productTypeSelect?.value,
        sortBy: `${orderBy}_${order}`,
        searchDateFrom: searchDateFrom === null ? '' : fDate(searchDateFrom as Date),
        searchDateTo: searchDateTo === null ? '' : fDate(searchDateTo as Date),
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, productTypeSelect, orderBy, order, searchDateFrom, searchDateTo]);

  const dateTo = moment(dayjs(searchDateTo).toDate()).format('yyyy-MM-DD');
  const dateForm = moment(dayjs(searchDateFrom).toDate()).format('yyyy-MM-DD');

  useEffect(() => {
    if (searchDateTo === null || searchDateFrom === null) {
      dispatch<any>(getAllProductsSold(params));
    } else if (searchDateFrom !== null && searchDateTo !== null) {
      if (moment(dateForm).isSameOrBefore(dateTo)) {
        setShowWarning(false);
        setSearchDateTo(searchDateTo);
        dispatch<any>(getAllProductsSold(params));
      } else {
        setShowWarning(true);
        setSearchDateTo(null);
      }
    }
  }, [params, searchDateTo, searchDateFrom]);

  useEffect(() => {
    if (isLoadingStore) {
      dispatch<any>(getAllProductsSold(params));
    }
  }, [isLoadingStore]);

  const handleReloadData = () => {
    dispatch<any>(getAllProductsSold(params));
  };

  return (
    <Card>
      <CardHeader
        title={translate('page.title.productStatistics')}
        sx={{
          p: 2,
          px: 3,
          borderBottom: 1,
          borderColor: (theme) => theme.palette.grey[400],
        }}
      />
      <CustomTableToolbar<ProductDashboardTable>
        model={translate('model.lowercase.product')}
        showWarning={showWarning}
        headCells={productDashboardHeadCells}
        searchDateFrom={searchDateFrom}
        searchDateTo={searchDateTo}
        selected={selected}
        setSelected={setSelected}
        handleChangeSearchDateFrom={handleChangeSearchDateFrom}
        handleChangeSearchDateTo={handleChangeSearchDateTo}
        handleReloadData={handleReloadData}
        onFilterName={handleFilterByName}
        haveSelectSearchDateFrom
        haveSelectSearchDateTo
        options={PRODUCT_TYPE_OPTIONS.filter(
          (option) => option.value !== ProductTypeEnum.PARENT && option.value !== ProductTypeEnum.EXTRA
        )}
        productType={productTypeSelect}
        setProductType={setProductTypeSelect}
        haveSelectProductType
      />
      <Box p={2}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <CustomTableHead<ProductDashboardTable>
              headCells={productDashboardHeadCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              selectedCol={selected}
            />
            {isLoadingProduct ? (
              <ProductTableRowDashboardSkeleton />
            ) : (
              <TableBody>
                {productsSold.map((product, index) => (
                  <TableRow
                    key={index}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate(PATH_BRAND_APP.product.root + `/${product.productId}`);
                      dispatch(getProductDetail_local(product));
                      dispatch(setProductType(product.type));
                      dispatch(setRoutesToBack(pathname));
                      dispatch(setIsProduct());
                    }}
                  >
                    <TableCell width={60} align="center">
                      {index + 1}
                    </TableCell>
                    {selected?.includes(OrderSortBy.IMAGE) && (
                      <TableCell width={80} align="left">
                        <Avatar src={product.image} alt="logo" />
                      </TableCell>
                    )}

                    <TableCell align="left">{product.name}</TableCell>
                    {selected?.includes(OrderSortBy.CODE) && <TableCell align="left">{product.code}</TableCell>}
                    <TableCell align="left" padding="none">
                      {product.numberOfProductsSold}
                    </TableCell>
                    {selected?.includes(OrderSortBy.SELLING_PRICE) && (
                      <TableCell align="left">{fCurrencyVN(product?.sellingPrice)} đ</TableCell>
                    )}
                    {selected?.includes(OrderSortBy.CATEGORY) && (
                      <TableCell align="left">{product.categoryName}</TableCell>
                    )}
                    {selected?.includes(OrderSortBy.TYPE) && <TableCell align="left">{product.type}</TableCell>}

                    <TableCell align="left">
                      <Label
                        color={
                          product?.status === Status.ACTIVE
                            ? Color.SUCCESS
                            : product?.status === Status.INACTIVE
                            ? Color.WARNING
                            : Color.ERROR
                        }
                      >
                        {product?.status === Status.INACTIVE
                          ? translate('status.inactive')
                          : product?.status === Status.ACTIVE
                          ? translate('status.active')
                          : translate('status.deActive')}
                      </Label>
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 ||
                  (productsSold.length === 0 && !filterName && (
                    <EmptyTable
                      colNumber={productDashboardHeadCells.length + 1}
                      model={translate('model.lowercase.product')}
                    />
                  ))}
              </TableBody>
            )}
            {isNotFound && <SearchNotFound colNumber={productDashboardHeadCells.length + 1} searchQuery={filterName} />}
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
      </Box>
    </Card>
  );
}

export default ListProductStatistics;
