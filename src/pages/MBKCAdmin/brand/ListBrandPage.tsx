/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
//@mui Icons
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// redux
import { getAllBrands, setAddBrand } from 'redux/brand/brandSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { setStatus } from 'redux/auth/authSlice';
// section
import { BrandTableRow, BrandTableRowSkeleton } from 'sections/brand';
//
import { BrandTable, ListParams, OrderSort, OrderSortBy } from 'common/@types';
import { CustomTableHead, CustomTableToolbar, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';

function ListBrandPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { brandHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { brands, isLoading, numberItems } = useAppSelector((state) => state.brand);

  const [orderSort, setOrderSort] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof BrandTable>(OrderSortBy.NAME);
  const [filterName, setFilterName] = useState<string>('');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof BrandTable) => {
    const isAsc = orderBy === property && orderSort === 'asc';
    setOrderSort(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const isNotFound = !brands.length && !!filterName;

  const debounceValue = useDebounce(filterName.trim(), 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        searchValue: debounceValue,
        currentPage: page + 1,
        itemsPerPage: rowsPerPage,
        sortBy: `${orderBy}_${orderSort}`,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, orderBy, orderSort]);

  useEffect(() => {
    dispatch(getAllBrands(params));
  }, [params]);

  const handleReloadData = () => {
    dispatch<any>(getAllBrands(params));
  };

  return (
    <>
      <Page
        pathname={pathname}
        title={translate('page.title.list', { model: translate('model.lowercase.brands') })}
        navigateDashboard={PATH_ADMIN_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              navigate(PATH_ADMIN_APP.brand.newBrand);
              dispatch(setStatus());
              dispatch(setAddBrand());
              dispatch(setRoutesToBack(pathname));
            }}
          >
            {translate('button.add', { model: translate('model.lowercase.brand') })}
          </Button>,
        ]}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CustomTableToolbar<BrandTable>
                model={translate('model.lowercase.brand')}
                selected={selected}
                setSelected={setSelected}
                headCells={brandHeadCells}
                filterName={filterName}
                onFilterName={handleFilterByName}
                handleReloadData={handleReloadData}
              />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CustomTableHead<BrandTable>
                    showAction
                    order={orderSort}
                    orderBy={orderBy}
                    headCells={brandHeadCells}
                    onRequestSort={handleRequestSort}
                    selectedCol={selected}
                  />
                  {isLoading ? (
                    <BrandTableRowSkeleton length={brands.length} selected={selected} />
                  ) : (
                    <TableBody>
                      {brands.map((brand, index) => {
                        return (
                          <BrandTableRow
                            key={index}
                            index={index}
                            brand={brand}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            setPage={setPage}
                            selected={selected}
                            filterName={filterName}
                            sortBy={`${orderBy}_${orderSort}`}
                            length={brands.length}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (brands.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={brandHeadCells.length + 2}
                            model={translate('model.lowercase.brand')}
                          />
                        ))}
                    </TableBody>
                  )}
                  {isNotFound && <SearchNotFound colNumber={brands.length + 2} searchQuery={filterName} />}
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

export default ListBrandPage;
