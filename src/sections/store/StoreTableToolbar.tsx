/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import ReplayIcon from '@mui/icons-material/Replay';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Autocomplete, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material';
// redux
import { useAppDispatch } from 'redux/configStore';
import { getAllStores } from 'redux/store/storeSlice';
import { getAllStorePartners } from 'redux/storePartner/storePartnerSlice';
//
import { ListParams, OptionSelect } from 'common/@types';
import { Status } from 'common/enums';
import { STATUS_OPTIONS } from 'common/models';
import { useLocales, usePagination } from 'hooks';
import { StyledRoot, StyledSearch } from '../styles';

// ----------------------------------------------------------------------

interface StoreTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterName: string;
  haveSelectStatus?: boolean;
  status: OptionSelect | null;
  setStatus: Dispatch<SetStateAction<OptionSelect | null>>;
}

function StoreTableToolbar({ filterName, onFilterName, status, setStatus, haveSelectStatus }: StoreTableToolbarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { page, rowsPerPage } = usePagination();

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: filterName,
      },
      navigate,
    };
  }, [page, rowsPerPage, filterName]);

  const paramsStorePartner: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
      },
      navigate,
    };
  }, [page, rowsPerPage]);

  return (
    <StyledRoot>
      <Stack direction="row" gap={2}>
        {haveSelectStatus && (
          <Stack width={250}>
            <Autocomplete
              fullWidth
              size="small"
              options={STATUS_OPTIONS}
              getOptionLabel={(option) =>
                option.value === Status.ACTIVE
                  ? translate('status.active')
                  : option.value === Status.INACTIVE
                  ? translate('status.inactive')
                  : option.value === Status.BE_CONFIRMING
                  ? translate('status.beConfirming')
                  : option.value === Status.REJECTED
                  ? translate('status.reject')
                  : ''
              }
              renderInput={(params) => <TextField {...params} label={translate('table.status')} InputLabelProps={{}} />}
              value={status}
              onChange={(event: any, newValue: OptionSelect | null) => setStatus(newValue)}
            />
          </Stack>
        )}

        <StyledSearch
          size="small"
          value={filterName}
          onChange={onFilterName}
          placeholder={translate('page.title.search', { model: translate('model.lowercase.store') })}
          startAdornment={
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      </Stack>

      <Tooltip title={translate('button.reload')}>
        <IconButton
          onClick={() => {
            dispatch<any>(getAllStores(params));
            dispatch<any>(getAllStorePartners(paramsStorePartner));
          }}
        >
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  );
}

export default StoreTableToolbar;
