/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import DescriptionIcon from '@mui/icons-material/Description';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Button, Card, Grid, Stack, Tab, Typography } from '@mui/material';
//redux
import { deleteCategory, getCategoryDetail, setCategoryType, setEditCategory } from 'redux/category/categorySlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
// section
import { CategoryDetailSkeleton, CategoryTableTab } from 'sections/category';
import { ProductTableTab } from 'sections/product';
//
import { CategoryType } from 'common/models';
import images from 'assets';
import { Breadcrumb, Color, Language, PopoverType, Status } from 'common/enums';
import { ConfirmDialog, Label, Page, Popover } from 'components';
import { useLocales, useModal, usePopover, useResponsive } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';

function CategoryDetailPage() {
  const { id: categoryId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const mdUp = useResponsive('up', 'md', 'md');

  const { pathname } = useLocation();
  const { translate, currentLang } = useLocales();
  const { handleOpen: handleOpenModal, isOpen: isOpenModal } = useModal();
  const { open: openPopover, handleOpenMenu, handleCloseMenu } = usePopover();

  const { category, categoryType, isLoading } = useAppSelector((state) => state.category);

  const [activeTab, setActiveTab] = useState('1');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const params = useMemo(() => {
    return {
      categoryId,
      categoryType,
      navigate,
    };
  }, [categoryId, categoryType]);

  useEffect(() => {
    dispatch(getCategoryDetail(params));
  }, [dispatch, navigate, params, categoryId]);

  const handleDelete = () => {
    handleOpenModal();
    dispatch(
      deleteCategory({
        idParams: { categoryId: category?.categoryId },
        optionParams: {
          type: categoryType,
        },
        navigate,
      })
    );
  };

  return (
    <>
      <Page
        title={
          pathname
            .split('/')
            .slice(2)
            .filter((x) => x)[0] === Breadcrumb.CATEGORY
            ? translate('page.title.detail', {
                model:
                  currentLang.value === Language.ENGLISH
                    ? translate('model.capitalize.normalCategory')
                    : translate('model.lowercase.normalCategory'),
              })
            : translate('page.title.detail', {
                model:
                  currentLang.value === Language.ENGLISH
                    ? translate('model.capitalize.extraCategory')
                    : translate('model.lowercase.extraCategory'),
              })
        }
        pathname={pathname}
        navigateDashboard={PATH_BRAND_APP.root}
        actions={() => [
          <Button
            color="inherit"
            onClick={handleOpenMenu}
            endIcon={<KeyboardArrowDownIcon />}
            style={{
              backgroundColor: '#000',
              color: '#fff',
            }}
            sx={{
              '.css-1dat9h6-MuiButtonBase-root-MuiButton-root:hover': {
                backgroundColor: 'rgba(145, 158, 171, 0.08)',
              },
            }}
          >
            {translate('button.menuAction')}
          </Button>,
        ]}
      >
        <Stack direction="row" alignItems="center" spacing={5} mb={10}>
          {isLoading ? (
            <CategoryDetailSkeleton />
          ) : (
            <Card sx={{ minWidth: 800 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  px: 3,
                  py: 1.5,
                  borderBottom: 1,
                  borderColor: 'divider',
                }}
              >
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Typography variant="h6">{translate('page.content.generalInformation')}</Typography>
                  <DescriptionIcon fontSize="small" />
                </Stack>
              </Stack>
              <Stack sx={{ px: 3, py: 3 }}>
                <Grid container columnSpacing={2}>
                  <Grid item md={3} sm={12}>
                    <Stack width="100%" alignItems="center">
                      <Avatar src={category?.imageUrl} alt={category?.name} sx={{ width: 150, height: 150 }} />
                    </Stack>
                  </Grid>
                  <Grid item md={9} sm={12}>
                    <Stack gap={1}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" gap={0.5}>
                          <Typography variant="subtitle1">{translate('table.code')}:</Typography>
                          <Typography variant="body1">{category?.code}</Typography>
                        </Stack>
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
                      </Stack>

                      <Stack direction="row" alignItems="center" gap={0.5}>
                        <Typography variant="subtitle1">{translate('table.name')}:</Typography>
                        <Typography variant="body1">{category?.name}</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        <Typography variant="subtitle1">{translate('table.displayOrder')}:</Typography>
                        <Typography variant="body1">{category?.displayOrder}</Typography>
                      </Stack>
                      <Box>
                        <Typography variant="subtitle1">{translate('table.description')}:</Typography>
                        <Typography variant="body2" sx={{ textAlign: 'justify' }}>
                          {category?.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Card>
          )}
          {mdUp && (
            <Box width={700}>
              <Box component="img" src={images.illustrations.mbkc_cook} alt="cook" />
            </Box>
          )}
        </Stack>

        {pathname
          .split('/')
          .slice(2)
          .filter((x) => x)[0] === Breadcrumb.CATEGORY ? (
          <Stack spacing={1}>
            <Card>
              <TabContext value={activeTab}>
                <Box>
                  <TabList sx={{ height: 50, borderBottom: 1, borderColor: 'divider' }} onChange={handleChangeTab}>
                    <Tab label={translate('model.capitalizeOne.products')} value="1" sx={{ height: 50, px: 3 }} />
                    <Tab
                      label={translate('model.capitalizeOne.extraCategories')}
                      value="2"
                      sx={{ height: 50, px: 3 }}
                    />
                  </TabList>
                </Box>

                <Stack>
                  <TabPanel sx={{ p: 0 }} value="1">
                    <ProductTableTab />
                  </TabPanel>
                  <TabPanel sx={{ p: 0 }} value="2">
                    <CategoryTableTab categoryId={Number(categoryId)} />
                  </TabPanel>
                </Stack>
              </TabContext>
            </Card>
          </Stack>
        ) : (
          <Card>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                px: 3,
                py: 1.5,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="h6" textTransform="capitalize">
                {translate('page.content.productInCategory', {
                  model: translate('model.capitalizeOne.product'),
                  name: translate('model.lowercase.category'),
                })}
              </Typography>
            </Stack>
            <ProductTableTab />
          </Card>
        )}
      </Page>

      <Popover
        type={PopoverType.ALL}
        open={openPopover}
        handleCloseMenu={handleCloseMenu}
        onDelete={handleOpenModal}
        onEdit={() => {
          if (categoryType === CategoryType.NORMAL) {
            navigate(PATH_BRAND_APP.category.root + `/updation/${categoryId}`);
          } else {
            navigate(PATH_BRAND_APP.category.rootExtra + `/updation/${categoryId}`);
          }
          dispatch(setRoutesToBack(pathname));
          dispatch(setCategoryType(categoryType === CategoryType.NORMAL ? CategoryType.NORMAL : CategoryType.EXTRA));
          dispatch(setEditCategory(category));
        }}
      />

      {isOpenModal && (
        <ConfirmDialog
          open={isOpenModal}
          onClose={handleOpenModal}
          onAction={handleDelete}
          model={category?.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.category') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.category') })}
        />
      )}
    </>
  );
}

export default CategoryDetailPage;
