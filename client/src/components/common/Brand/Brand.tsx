import React from 'react';
import { styled, Box } from '@mui/system';
import { Span } from '../typography';
import useSettings from '../../../hooks/useSettings';
import LogoDevIcon from '@mui/icons-material/LogoDev';

const BrandRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 18px 20px 29px',
}));

const StyledSpan = styled(Span)(({ theme, mode }) => ({
  fontSize: 18,
  marginLeft: '.5rem',
  display: mode === 'compact' ? 'none' : 'block',
}));

const Brand: React.FC = ({ children }) => {
  const { settings } = useSettings();
  const leftSidebar = settings.leftSidebar;
  const { mode } = leftSidebar;

  return (
    <BrandRoot>
      <Box display='flex' alignItems='center'>
        <LogoDevIcon />
        <StyledSpan mode={mode} className='sidenavHoverShow'>
          Edu App
        </StyledSpan>
      </Box>
      <Box
        className='sidenavHoverShow'
        sx={{ display: mode === 'compact' ? 'none' : 'block' }}
      >
        {children || null}
      </Box>
    </BrandRoot>
  );
};

export default Brand;
