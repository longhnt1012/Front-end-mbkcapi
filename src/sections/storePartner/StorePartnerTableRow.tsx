import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, AvatarGroup, Collapse, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
// section
import OnlyPartnerRow from './OnlyPartnerRow';
import OnlyPartnerRowSkeleton from './OnlyPartnerRowSkeleton';
//
import { Store, StorePartnerDetail, StorePartnerToList } from 'common/models';
import { useLocales } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';

interface StorePartnerTableRowProps {
  store: Store;
  index: number;
}

function StorePartnerTableRow({ index, store }: StorePartnerTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const { listStorePartners, isLoading } = useAppSelector((state) => state.storePartner);

  const [openList, setOpenList] = useState(-1);
  const [transformedData, setTransformedData] = useState<StorePartnerToList[]>([]);

  const handleNavigateDetail = (storeId: number) => {
    navigate(PATH_BRAND_APP.store.root + `/${storeId}`);
    dispatch(setRoutesToBack(pathname));
  };

  useEffect(() => {
    const transformData = (data: StorePartnerDetail[]) => {
      const transformedData: StorePartnerToList[] = [];

      data?.forEach((partner) => {
        const { storeId, ...rest } = partner;
        const existingStore = transformedData.find((item) => item.storeId === storeId);

        if (existingStore) {
          existingStore.storePartners.push({ ...rest });
        } else {
          transformedData.push({
            storeId,
            storePartners: [{ ...rest }],
          });
        }
      });

      return transformedData;
    };

    const updatedData = transformData(listStorePartners);
    setTransformedData(updatedData);
  }, [listStorePartners]);

  const listPartners = transformedData.filter((item) => item.storeId === store.storeId);

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer', height: '72.89px' }}>
        <TableCell width={120} align="center" onClick={() => handleNavigateDetail(store.storeId)}>
          {index + 1}
        </TableCell>

        <TableCell align="left" padding="none" onClick={() => handleNavigateDetail(store.storeId)}>
          {store.name}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(store.storeId)}>
          {store.kitchenCenter.name}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(store.storeId)}>
          {listPartners.length === 0 ? (
            <Typography variant="body2">{translate('page.content.noHavePartner')}</Typography>
          ) : (
            <AvatarGroup max={4} sx={{ justifyContent: 'left' }}>
              {listPartners[0]?.storePartners.map((partner) => (
                <Avatar key={partner.partnerName} alt={partner.partnerName} src={partner.partnerLogo} />
              ))}
            </AvatarGroup>
          )}
        </TableCell>

        <TableCell align="right">
          <IconButton disabled={listPartners.length === 0} onClick={() => setOpenList(openList === index ? -1 : index)}>
            {openList === index ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TableCell colSpan={7} sx={{ py: 0, pl: 7 }}>
          <Collapse in={openList === index} timeout="auto" unmountOnExit>
            {isLoading ? (
              <Stack direction="column">
                <OnlyPartnerRowSkeleton length={listPartners[0]?.storePartners.length} />
              </Stack>
            ) : (
              <Stack direction="column">
                {listPartners[0]?.storePartners?.map((partner) => (
                  <OnlyPartnerRow key={partner.partnerName} partner={partner} storeId={store.storeId} />
                ))}
              </Stack>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default StorePartnerTableRow;
