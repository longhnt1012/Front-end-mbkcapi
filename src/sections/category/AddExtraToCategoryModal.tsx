/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
// redux
import { addExtraCategory, getAllCategories, getAllExtraCategoriesInCategory } from 'redux/category/categorySlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
// section
import ExtraToCategoryRow from './ExtraToCategoryRow';
import ExtraToCategoryRowSkeleton from './ExtraToCategoryRowSkeleton';
//
import { CategoryTable, ListParams, OrderSort, OrderSortBy, Params } from 'common/@types';
import { Language } from 'common/enums';
import { AddExtraCategory, CategoryType } from 'common/models';
import { CustomTableHead, CustomTableToolbar, EmptyTable, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';

interface AddExtraToCategoryModalProps {
  isOpen: boolean;
  handleOpen: (title: any) => void;
  filterName: string;
  sortBy: string;
}

function AddExtraToCategoryModal({
  isOpen,
  handleOpen,
  filterName: filterNameInTab,
  sortBy,
}: AddExtraToCategoryModalProps) {
  const { id: categoryId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate, currentLang } = useLocales();
  const { categoryHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { categories, categoriesExtra, isLoading, numberItems } = useAppSelector((state) => state.category);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof CategoryTable>(OrderSortBy.NAME);
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [selectedCol, setSelectedCol] = useState<readonly string[]>([]);
  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CategoryTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = categories.map((n) => n.categoryId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, categoryId: number) => {
    const selectedIndex = selected.indexOf(categoryId);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, categoryId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (categoryId: number) => selected.indexOf(categoryId) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

  const isNotFound = !categories.length && !!filterName;

  const debounceValue = useDebounce(filterName.trim(), 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        type: CategoryType.EXTRA,
        currentPage: page + 1,
        itemsPerPage: rowsPerPage,
        searchValue: debounceValue,
        sortBy: `${orderBy}_${order}`,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, orderBy, order]);

  const paramExtraOfCategory: ListParams = useMemo(() => {
    return {
      optionParams: {
        idCategory: categoryId,
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, categoryId, orderBy, order]);

  useEffect(() => {
    dispatch<any>(getAllCategories(params));
    dispatch<any>(getAllExtraCategoriesInCategory(paramExtraOfCategory));
  }, [params, paramExtraOfCategory]);

  useEffect(() => {
    const categoryIds = categoriesExtra.map((category) => category.categoryId);
    setSelected([...categoryIds]);
  }, [categoriesExtra]);

  const handleAddExtraCategory = () => {
    const params: Params<AddExtraCategory> = {
      data: { extraCategoryIds: [...selected] },
      idParams: { categoryId: Number(categoryId) },
      optionParams: { searchValue: filterNameInTab, sortBy: sortBy },
      navigate,
    };
    dispatch<any>(addExtraCategory(params));
  };

  const handleReloadData = () => {
    dispatch<any>(getAllCategories(params));
    dispatch<any>(getAllExtraCategoriesInCategory(paramExtraOfCategory));
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="md" fullWidth open={isOpen} onClose={handleOpen}>
          <DialogContent sx={{ pb: 0 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4">{translate('page.content.extraInCategory')}</Typography>

              <IconButton onClick={handleOpen}>
                <CloseIcon />
              </IconButton>
            </Stack>

            <Divider sx={{ mt: 1.5 }} />

            <Box sx={{ width: '100%' }}>
              <Paper sx={{ width: '100%', mb: 2 }}>
                <CustomTableToolbar<CategoryTable>
                  model={translate('model.lowercase.category')}
                  selected={selectedCol}
                  setSelected={setSelectedCol}
                  headCells={categoryHeadCells}
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                  handleReloadData={handleReloadData}
                />
                <TableContainer>
                  <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                    <CustomTableHead<CategoryTable>
                      checkbox
                      numSelected={selected.length}
                      rowCount={categories.length}
                      headCells={categoryHeadCells}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                      selectedCol={selectedCol}
                    />
                    {isLoading ? (
                      <ExtraToCategoryRowSkeleton length={categories.length} />
                    ) : (
                      <TableBody>
                        {categories.map((category, index) => {
                          const isItemSelected = isSelected(category.categoryId);

                          return (
                            <ExtraToCategoryRow
                              key={category.categoryId}
                              showAction
                              checkbox
                              index={index}
                              category={category}
                              handleClick={handleClick}
                              isItemSelected={isItemSelected}
                              categoryType={CategoryType.EXTRA}
                              selected={selectedCol}
                            />
                          );
                        })}
                        {emptyRows > 0 ||
                          (categories.length === 0 && !filterName && (
                            <EmptyTable
                              colNumber={categoryHeadCells.length}
                              model={translate('model.lowercase.extraCategory')}
                            />
                          ))}
                      </TableBody>
                    )}
                    {isNotFound && <SearchNotFound colNumber={categoryHeadCells.length} searchQuery={filterName} />}
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={numberItems}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Box>
          </DialogContent>
          <DialogActions>
            <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%" px={2}>
              {selected.length > 0 && (
                <Typography variant="subtitle1">
                  {currentLang.value === Language.ENGLISH
                    ? `${selected.length + ' ' + translate('page.content.selected')}`
                    : `${translate('page.content.selected') + ' ' + selected.length}`}
                </Typography>
              )}

              <Stack direction="row" gap={2} ml="auto">
                <Button onClick={handleOpen} variant="contained" color="inherit">
                  {translate('button.cancel')}
                </Button>
                <Button
                  autoFocus
                  variant="contained"
                  onClick={() => {
                    handleOpen('addExtra');
                    handleAddExtraCategory();
                  }}
                  disabled={selected.length === 0}
                >
                  {translate('button.addMore')}
                </Button>
              </Stack>
            </Stack>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default AddExtraToCategoryModal;
