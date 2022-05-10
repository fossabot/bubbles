import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useClickOutside } from '@mantine/hooks';
import { find, isArray, isFunction } from 'lodash';
import { useLocation } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import { ComputerKeyboardNextIcon } from '@bubbles-ui/icons/outline';
import { MainNavStyles } from './MainNav.styles';
import { MainNavItem } from './MainNavItem/MainNavItem';
import { Avatar } from '../../informative';
import { SubNav } from '../SubNav';
import { Logo } from '../../misc';
import { Box } from '../../layout';
import { ActionButton } from '../../form';
import { getActiveItem } from './helpers/getActiveItem';
import { getUserFullName } from './helpers/getUserFullName';

export const MAIN_NAV_WIDTH = 52;
export const MAIN_NAV_DEFAULT_PROPS = {
  hideSubNavOnClose: true,
  useRouter: false,
  pinned: false,
  lightMode: false,
};
export const MAIN_NAV_PROP_TYPES = {
  lightMode: PropTypes.bool,
};

const MainNav = ({
  onClose,
  onOpen,
  onPin,
  menuData,
  sessionMenu,
  isLoading,
  subNavWidth,
  pinned,
  hideSubNavOnClose,
  useRouter,
  session,
  lightMode,
  ...props
}) => {
  const [activeItem, setActiveItem] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [showSubNav, setShowSubNav] = useState(false);
  const [showSubNavToggle, setShowSubNavToggle] = useState(false);
  const [subNavPinned, setSubNavPinned] = useState(pinned);

  const ref = useClickOutside(() => {
    if (!subNavPinned) closeSubNav(true);
  });
  // ······································································
  // HANDLERS

  const handleItemClick = (item) => {
    setActiveItem(item);
    const hasChildren = !item.children || (isArray(item.children) && item.children.length === 0);

    if (item.url && !hasChildren) {
      closeSubNav(false);
    }

    if (isArray(item.children) && item.children.length) {
      openSubNav(true);
    } else {
      closeSubNav(true);
    }
  };

  const handleRouteChange = () => {
    let menu = menuData;
    if (sessionMenu) {
      menu = [...menu, sessionMenu];
    }
    const items = getActiveItem(menu);

    if (
      (items && items.activeItem && !activeItem) ||
      (items && items.activeItem && activeItem && items.activeItem.id !== activeItem.id)
    ) {
      if (subNavPinned) {
        handleItemClick(items.activeItem);
      } else {
        setActiveItem(items.activeItem);
      }
    }

    if (
      (items && items.activeSubItem && !activeSubItem) ||
      (items && items.activeSubItem && activeSubItem && items.activeSubItem.id !== activeSubItem.id)
    ) {
      setActiveSubItem(items.activeSubItem);
      if (!subNavPinned) setShowSubNavToggle(true);
    }
  };

  const openSubNav = () => {
    setShowSubNav(true);
    setShowSubNavToggle(false);
    if (isFunction(onOpen)) onOpen();
  };

  const closeSubNav = () => {
    // if (hideSubNavOnClose) {
    setShowSubNav(false);
    setShowSubNavToggle(true);
    setSubNavPinned(false);
    // }
    if (isFunction(onClose)) onClose();
  };

  const handleOnPin = () => {
    setSubNavPinned(!subNavPinned);
    if (isFunction(onPin)) onPin(!subNavPinned);
  };

  const handleOnItemClick = (item) => {
    setActiveSubItem(item);
    if (!subNavPinned) {
      closeSubNav();
    }
  };

  function onAvatarClick() {
    if (sessionMenu) {
      handleItemClick(sessionMenu);
    }
  }

  // ······································································
  // WATCHERS

  useEffect(() => {
    if (isLoading || !menuData || (isArray(menuData) && !menuData.length)) {
      handleRouteChange();
    }
    if (menuData && activeItem) {
      setActiveItem(find(menuData, { id: activeItem.id }));
    }
  }, [menuData, isLoading]);

  try {
    const location = useLocation();

    useEffect(() => {
      if (!isLoading && isArray(menuData) && menuData.length) {
        handleRouteChange();
      }
    }, [location]);
  } catch (e) {
    console.info('No react-router-dom found');
  }

  useEffect(() => {
    if (subNavPinned !== pinned) setSubNavPinned(pinned);
  }, [pinned]);

  // ······································································
  // STYLES

  const { classes, cx } = MainNavStyles(
    { itemWidth: MAIN_NAV_WIDTH, subNavWidth, lightMode },
    { name: 'MainNav' }
  );

  return (
    <Box className={classes.root} ref={ref}>
      {/* MainNav */}
      <Box className={classes.navWrapper}>
        <Box className={classes.navContainer}>
          <Logo isotype className={classes.logo} />

          {/* Menu items */}
          <SimpleBar className={classes.navItems}>
            {isArray(menuData) &&
              menuData.map((item) => (
                <MainNavItem
                  key={item.id}
                  item={item}
                  itemWidth={MAIN_NAV_WIDTH}
                  active={activeItem?.id === item.id}
                  onClick={() => handleItemClick(item)}
                  useRouter={useRouter}
                  lightMode={lightMode}
                />
              ))}
          </SimpleBar>
          <Avatar
            mx="auto"
            mb={10}
            radius="xl"
            image={session?.avatar}
            fullName={session ? getUserFullName(session) : undefined}
            onClick={onAvatarClick}
          />
        </Box>
        <Box className={classes.navWrapperBorder} />
      </Box>

      {/* Sub Nav */}
      {activeItem && activeItem.children.length > 0 && (
        <SubNav
          open={showSubNav}
          width={subNavWidth}
          pinned={subNavPinned}
          item={activeItem}
          subItems={activeItem.children}
          customItems={activeItem.customChildren}
          activeItem={activeSubItem}
          onItemClick={handleOnItemClick}
          onClose={closeSubNav}
          onPin={handleOnPin}
          className={classes.subNav}
          useRouter={useRouter}
          lightMode={lightMode}
        />
      )}

      {/* Open Sub Nav handler */}
      {showSubNavToggle && activeItem && activeItem.children.length > 0 && (
        <Box className={classes.subNavHandler}>
          <ActionButton
            icon={<ComputerKeyboardNextIcon />}
            tooltip="Open"
            variant="solid"
            color={!lightMode && 'negative'}
            style={{ borderRadius: '0 3px 3px 0' }}
            onClick={openSubNav}
          />
        </Box>
      )}
    </Box>
  );
};

export { MainNav };

MainNav.defaultProps = MAIN_NAV_DEFAULT_PROPS;
MainNav.propTypes = MAIN_NAV_PROP_TYPES;
