/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Box, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllProducts } from 'redux/product/productSlice';
// section
import ProductTableRow from './ProductTableRow';
import ProductTableRowSkeleton from './ProductTableRowSkeleton';
//
import { ListParams, OptionSelect, OrderSort, OrderSortBy, ProductTable } from 'common/@types';
import { CategoryType, PRODUCT_TYPE_OPTIONS } from 'common/models';
import { CustomTableHead, CustomTableToolbar, EmptyTable, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';

function ProductTableTab() {
  const { id: categoryId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { productHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { categoryType } = useAppSelector((state) => state.category);
  const { products, isLoading } = useAppSelector((state) => state.product);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof ProductTable>(OrderSortBy.NAME);
  const [filterName, setFilterName] = useState<string>('');
  const [productType, setProductType] = useState<OptionSelect | null>({ value: '', label: '', id: '' });
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ProductTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
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
        type: productType?.value,
        idCategory: categoryId,
        sortBy: `${orderBy}_${order}`,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, productType, categoryId, orderBy, order]);

  useEffect(() => {
    dispatch<any>(getAllProducts(params));
  }, [params]);

  const handleReloadData = () => {
    dispatch<any>(getAllProducts(params));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <CustomTableToolbar<ProductTable>
          model={translate('model.lowercase.product')}
          selected={selected}
          setSelected={setSelected}
          headCells={productHeadCells}
          filterName={filterName}
          onFilterName={handleFilterByName}
          handleReloadData={handleReloadData}
          options={PRODUCT_TYPE_OPTIONS.slice(0, 3)}
          productType={productType}
          setProductType={setProductType}
          haveSelectProductType={categoryType === CategoryType.NORMAL}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
            <CustomTableHead<ProductTable>
              headCells={productHeadCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              selectedCol={selected}
            />
            {isLoading ? (
              <ProductTableRowSkeleton inTab length={products?.length} selected={selected} />
            ) : (
              <TableBody>
                {products?.map((product, index) => {
                  return (
                    <ProductTableRow
                      key={product.productId}
                      length={products?.length}
                      inTab
                      index={index}
                      product={product}
                      setPage={setPage}
                      selected={selected}
                      filterName={filterName}
                      productType={productType?.value ? productType.value : ''}
                    />
                  );
                })}
                {emptyRows > 0 ||
                  (products.length === 0 && !filterName && (
                    <EmptyTable colNumber={productHeadCells.length} model={translate('model.lowercase.product')} />
                  ))}
              </TableBody>
            )}
            {isNotFound && <SearchNotFound colNumber={productHeadCells.length} searchQuery={filterName} />}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default ProductTableTab;
