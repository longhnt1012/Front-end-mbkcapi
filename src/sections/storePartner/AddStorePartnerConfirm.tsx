/* eslint-disable react-hooks/exhaustive-deps */
// @mui
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, IconButton, Stack, Typography } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
//
import { useLocales } from 'hooks';

interface AddStorePartnerConfirmProps {
  isOpen: boolean;
  handleOpen: () => void;
  onSubmit: () => void;
  onSubmitToLink: () => void;
}

function AddStorePartnerConfirm({ isOpen, handleOpen, onSubmit, onSubmitToLink }: AddStorePartnerConfirmProps) {
  const { translate } = useLocales();

  const { isLoading } = useAppSelector((state) => state.storePartner);

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="xs" fullWidth open={isOpen} onClose={handleOpen}>
          <DialogContent>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h5">{translate('page.title.confirmLink')}</Typography>
              <IconButton onClick={handleOpen}>
                <CloseIcon />
              </IconButton>
            </Stack>

            <Stack mt={2}>
              <Typography color="gray">{translate('page.content.confirmLink')}</Typography>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              variant="contained"
              disabled={isLoading}
              color="inherit"
              onClick={() => {
                handleOpen();
                onSubmit();
              }}
            >
              {translate('button.no')}
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              onClick={() => {
                handleOpen();
                onSubmitToLink();
              }}
            >
              {translate('button.yes')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default AddStorePartnerConfirm;
