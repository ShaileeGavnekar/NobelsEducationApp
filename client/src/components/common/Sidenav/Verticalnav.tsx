import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSettings from '../../../hooks/useSettings';
import { Span, Paragraph } from '../typography';
import { styled, Box } from '@mui/system';
import { Icon, ButtonBase } from '@mui/material';
import VerticalnavPanel from './VerticalnavPanel';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Person } from '@mui/icons-material';
import ListIcon from '@mui/icons-material/List';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';

const ListLabel = styled(Paragraph)(({ theme, mode }) => ({
  fontSize: '12px',
  marginTop: '20px',
  marginLeft: '15px',
  marginBottom: '10px',
  textTransform: 'uppercase',
  display: mode === 'compact' ? 'none' : 'block',
  color: theme.palette.text.secondary,
}));

const LinkStyles = {
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '4px',
  height: 44,
  whiteSpace: 'pre',
  marginBottom: '8px',
  textDecoration: 'none',
  justifyContent: 'space-between',
  transition: 'all 150ms ease-in',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.08)',
  },
  '&.compactNavItem': {
    overflow: 'hidden',
    justifyContent: 'center !important',
  },
  '& .icon': {
    fontSize: '18px',
    paddingLeft: '16px',
    paddingRight: '16px',
    verticalAlign: 'middle',
  },
};

const StyledLink = styled(Box)(({ theme }) => ({
  '& a': {
    ...LinkStyles,
    color: theme.palette.text.primary,
  },
  '& .navItemActive': {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
}));

const StyledText = styled(Span)(({ mode }) => ({
  fontSize: '0.875rem',
  paddingLeft: '0.8rem',
  display: mode === 'compact' ? 'none' : 'block',
}));

const BulletIcon = styled('div')(({ theme }) => ({
  padding: '2px',
  marginLeft: '24px',
  marginRight: '8px',
  overflow: 'hidden',
  borderRadius: '300px',
  background: theme.palette.text.primary,
}));

const BadgeValue = styled('div')(() => ({
  padding: '1px 8px',
  overflow: 'hidden',
  borderRadius: '300px',
}));

export const getIcon = (icon: string) => {
  switch (icon) {
    case 'Dashboard':
      return <DashboardIcon />;
      break;
    case 'Payment':
      return <PaymentsIcon />;
      break;
    case 'Person':
      return <Person />;
      break;
    case 'Student':
      return <ListIcon />;
      break;
    case 'Teacher':
      return <AlignHorizontalLeftIcon />;
      break;
    case 'Course':
      return <AutoStoriesIcon />;
      break;
    case 'Class':
      return <AnalyticsIcon />;
      break;
    default:
      return <Person />;
  }
};

export interface VerticalnavProps {
  items: any[];
}

const Verticalnav: React.FC<VerticalnavProps> = ({ items }) => {
  const router = useRouter();
  const { settings } = useSettings();
  const { mode } = settings.leftSidebar;

  const renderLevels = (data: any[]) => {
    return data.map((item, index) => {
      if (item.type === 'label')
        return (
          <ListLabel key={index} mode={mode} className='sidenavHoverShow'>
            {item.label}
          </ListLabel>
        );
      if (item.children) {
        return (
          <VerticalnavPanel mode={mode} item={item} key={index}>
            {renderLevels(item.children)}
          </VerticalnavPanel>
        );
      } else {
        return (
          <StyledLink key={index}>
            <Link href={item.path} passHref>
              <a
                className={
                  router.pathname == item.path
                    ? `navItemActive ${mode === 'compact' && 'compactNavItem'}`
                    : `${mode === 'compact' && 'compactNavItem'}`
                }
              >
                <ButtonBase key={item.name} name='child' sx={{ width: '100%' }}>
                  {item?.icon ? (
                    <Icon className='icon' sx={{ width: 36 }}>
                      {getIcon(item.icon)}
                    </Icon>
                  ) : (
                    <>
                      <BulletIcon
                        className={`nav-bullet`}
                        sx={{
                          display: mode === 'compact' ? 'none' : 'block',
                        }}
                      />
                      <Box
                        className='nav-bullet-text'
                        sx={{
                          ml: '20px',
                          fontSize: '11px',
                          display: mode === 'compact' ? 'block' : 'none',
                        }}
                      >
                        {item.iconText}
                      </Box>
                    </>
                  )}
                  <StyledText mode={mode} className='sidenavHoverShow'>
                    {item.name}
                  </StyledText>
                  <Box mx='auto'></Box>
                  {item.badge && (
                    <BadgeValue className='sidenavHoverShow'>
                      {item.badge.value}
                    </BadgeValue>
                  )}
                </ButtonBase>
              </a>
            </Link>
          </StyledLink>
        );
      }
    });
  };

  return <div className='navigation'>{renderLevels(items)}</div>;
};

export default React.memo(Verticalnav);
