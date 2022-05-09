import React, { useMemo, useState, useEffect } from 'react';
import { isNil, isEmpty } from 'lodash';
import {
  Box,
  ImageLoader,
  Title,
  COLORS,
  Menu,
  IconButton,
  TextClamp,
  Badge,
} from '@bubbles-ui/components';
import { SettingMenuVerticalIcon, BookmarksIcon, DeleteBinIcon } from '@bubbles-ui/icons/solid/';
import { LibraryCardDeadline } from '../LibraryCardDeadline';
import { LibraryCardCoverStyles } from './LibraryCardCover.styles';
import {
  LIBRARY_CARD_COVER_DEFAULT_PROPS,
  LIBRARY_CARD_COVER_PROP_TYPES,
} from './LibraryCardCover.constants';

const LibraryCardCover = ({
  name,
  height,
  cover,
  color,
  blur,
  direction,
  fileIcon,
  deadlineProps,
  parentHovered,
  menuItems,
  dashboard,
  isNew,
  role,
  badge,
  ...props
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const { classes, cx } = LibraryCardCoverStyles(
    { color, height, blur, direction, parentHovered },
    { name: 'LibraryCardCover' }
  );
  const isVertical = direction === 'vertical';

  const icon = useMemo(
    () =>
      !isNil(fileIcon)
        ? React.cloneElement(fileIcon, { iconStyle: { backgroundColor: COLORS.interactive03h } })
        : null,
    [fileIcon]
  );

  useEffect(() => {
    if (!parentHovered && showMenu) {
      setShowMenu(false);
    }
  }, [parentHovered, showMenu]);

  const renderDeadline = () => {
    if (!deadlineProps) return;
    return (
      <Box className={classes.deadline}>
        <LibraryCardDeadline
          {...deadlineProps}
          locale={deadlineProps.locale}
          direction={direction}
          parentHovered={parentHovered}
          isNew={isNew}
          role={role}
        />
      </Box>
    );
  };

  const preventPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const iconRow = (
    <Box className={classes.iconRow}>
      {!isEmpty(menuItems) && (
        <Box style={{ flex: 1 }}>
          <Menu
            opened={showMenu && parentHovered}
            onOpen={() => setShowMenu(true)}
            onClose={() => setShowMenu(false)}
            items={menuItems.map((item) => ({
              ...item,
              className: cx(classes.menuItem, item.className),
            }))}
            control={
              <IconButton
                icon={
                  <SettingMenuVerticalIcon width={16} height={16} className={classes.menuIcon} />
                }
                variant={!isVertical ? 'transparent' : null}
                size="xs"
                onClick={preventPropagation}
              />
            }
          />
        </Box>
      )}
      {dashboard && (
        <>
          {!isVertical && (
            <IconButton
              icon={<DeleteBinIcon width={16} height={16} className={classes.menuIcon} />}
              variant={!isVertical ? 'transparent' : null}
              size="xs"
            />
          )}
          <IconButton
            icon={<BookmarksIcon width={16} height={16} className={classes.menuIcon} />}
            variant={!isVertical ? 'transparent' : null}
            size="xs"
          />
        </>
      )}
    </Box>
  );

  return (
    <Box className={classes.root}>
      <Box className={classes.blurryBox}>
        {isVertical && iconRow}
        {isVertical && renderDeadline()}
        <Box>
          <Box className={classes.color} />
          {!isVertical && iconRow}
        </Box>
        <Box className={classes.titleWrapper}>
          {!isVertical && badge && (
            <Box className={classes.badge}>
              <Badge label={badge} color="stroke" radius="default" closable={false} />
            </Box>
          )}
          <TextClamp lines={2}>
            <Title order={5} className={classes.title}>
              {name}
            </Title>
          </TextClamp>
        </Box>
      </Box>
      {!isVertical && renderDeadline()}
      {cover ? (
        <ImageLoader src={cover} height={height} forceImage />
      ) : (
        <Box className={classes.fileIcon}>{icon}</Box>
      )}
    </Box>
  );
};

LibraryCardCover.defaultProps = LIBRARY_CARD_COVER_DEFAULT_PROPS;
LibraryCardCover.propTypes = LIBRARY_CARD_COVER_PROP_TYPES;

export { LibraryCardCover };
