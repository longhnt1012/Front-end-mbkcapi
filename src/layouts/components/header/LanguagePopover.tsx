// @mui
import { Box, IconButton, MenuItem, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
//
import { MenuPopover } from 'components';
import useLocales from 'hooks/useLocales';
import usePopover from 'hooks/usePopover';

// ----------------------------------------------------------------------

function LanguagePopover() {
  const { allLang, currentLang, onChangeLang } = useLocales();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const bgColorStyle = open
    ? {
        bgcolor: (theme: any) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
      }
    : {};

  return (
    <>
      <IconButton
        onClick={handleOpenMenu}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...bgColorStyle,
        }}
      >
        <img src={currentLang.flag} alt={currentLang.label} width="28px" height="20px" />
      </IconButton>

      <MenuPopover open={open} handleCloseMenu={handleCloseMenu}>
        <Stack spacing={0.75}>
          {allLang.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLang.value}
              onClick={() => {
                onChangeLang(option.value);
                handleCloseMenu();
              }}
            >
              <Box component="img" alt={option.label} src={option.flag} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}

export default LanguagePopover;
