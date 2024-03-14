import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, Checkbox, IconButton, Switch, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
// redux
import { setCategoryType, setEditCategory } from 'redux/category/categorySlice';
import { useAppDispatch } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
// interface
import { OrderSortBy } from 'common/@types';
import { Color, Status } from 'common/enums';
import { Category, CategoryType } from 'common/models';
//
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';

interface ExtraToCategoryRowProps {
  handleClick: (event: React.MouseEvent<unknown>, categoryId: number) => void;
  categoryType: CategoryType;
  category: Category;
  index: number;
  showAction?: boolean;
  checkbox?: boolean;
  isItemSelected?: boolean;
  selected: readonly string[];
}

function ExtraToCategoryRow({
  index,
  category,
  categoryType,
  showAction = false,
  checkbox = false,
  isItemSelected = false,
  handleClick,
  selected,
}: ExtraToCategoryRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const { handleOpen, isOpen } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleEdit = () => {
    navigate(PATH_BRAND_APP.category.root + `/updation/${category.categoryId}`);
    dispatch(setCategoryType(categoryType));
    dispatch(setEditCategory(category));
    dispatch(setRoutesToBack(pathname));
  };

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role={checkbox ? 'checkbox' : ''}
        selected={isItemSelected}
        aria-checked={isItemSelected}
        sx={showAction ? { cursor: 'pointer', height: '72.89px' } : { cursor: 'pointer' }}
        onClick={(event) => handleClick(event, category.categoryId)}
      >
        {checkbox ? (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={isItemSelected}
              inputProps={{
                'aria-labelledby': `enhanced-table-checkbox-${index}`,
              }}
              onClick={(event) => handleClick(event, category.categoryId)}
            />
          </TableCell>
        ) : (
          <TableCell width={80} align="center">
            {index + 1}
          </TableCell>
        )}
        {selected.includes(OrderSortBy.IMAGE_URL) && (
          <TableCell scope="row" component="th" padding="none" width={80}>
            <Avatar alt={category.name} src={category.imageUrl} />
          </TableCell>
        )}
        <TableCell component="th" scope="row">
          <Typography variant="subtitle2" sx={{ width: 150 }} noWrap>
            {category.name}
          </Typography>
        </TableCell>
        {selected.includes(OrderSortBy.CODE) && <TableCell align="left">{category.code}</TableCell>}
        {selected.includes(OrderSortBy.DISPLAY_ORDER) && (
          <TableCell align="left">
            <Typography variant="body2" pl={2}>
              {category.displayOrder}
            </Typography>
          </TableCell>
        )}

        <TableCell align="left">
          <Label
            color={
              category?.status === Status.ACTIVE
                ? Color.SUCCESS
                : category?.status === Status.INACTIVE
                ? Color.WARNING
                : Color.ERROR
            }
          >
            {category?.status === Status.INACTIVE
              ? translate('status.inactive')
              : category?.status === Status.ACTIVE
              ? translate('status.active')
              : translate('status.deActive')}
          </Label>
        </TableCell>
        {!showAction && (
          <TableCell align="right">
            <Switch
              size="small"
              inputProps={{ 'aria-label': 'controlled' }}
              disabled={category.status === Status.DEACTIVE}
              checked={category.status === Status.INACTIVE || category.status === Status.DEACTIVE ? false : true}
              color={category?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
            />
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          onClose={handleOpen}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.extraCategory') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.extraCategory') })}
        />
      )}
    </>
  );
}

export default ExtraToCategoryRow;
