import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination as MantinePagination } from '@mantine/core';
import { Box, Stack } from '../../layout';
import { Select } from '../../form';
import { PagerStyles } from './Pager.styles';

export const PAGER_DIRECTIONS = ['column', 'row'];
export const PAGER_VARIANTS = ['paged', 'infinity'];
export const PAGER_DEFAULT_PROPS = {
  totalCount: 10,
  size: 10,
  boundaries: 1,
  siblings: 1,
  direction: 'row',
  withGoTo: false,
  withSize: false,
  withControls: true,
  withEdges: false,
  disabled: false,
  labels: {
    show: 'Show',
    goTo: 'Go to',
  },
  variant: PAGER_VARIANTS[0],
  page: 0,
};
export const PAGER_PROP_TYPES = {
  totalCount: PropTypes.number,
  page: PropTypes.number,
  size: PropTypes.number,
  boundaries: PropTypes.number,
  siblings: PropTypes.number,
  withGoTo: PropTypes.bool,
  withSize: PropTypes.bool,
  direction: PropTypes.oneOf(PAGER_DIRECTIONS),
  variant: PropTypes.oneOf(PAGER_VARIANTS),
  withControls: PropTypes.bool,
  withEdges: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

const Pager = forwardRef(
  (
    {
      totalCount,
      size: sizeProp,
      page: pageProp,
      boundaries,
      siblings,
      direction,
      withGoTo,
      withSize,
      withControls,
      withEdges,
      disabled,
      onChange,
      onSizeChange,
      labels,
      variant,
      ...props
    },
    ref
  ) => {
    const [goToPage, setGoToPage] = useState(Math.max(pageProp, 1));
    const [page, setPage] = useState(pageProp);
    const [size, setSize] = useState(sizeProp);

    const inputMaxLength = totalCount.toString().length;

    useEffect(() => {
      if (size !== sizeProp) setSize(sizeProp);
    }, [sizeProp]);

    useEffect(() => {
      if (page !== pageProp) setPage(pageProp);
    }, [pageProp]);

    useEffect(() => {
      const timer = setTimeout(() => {
        setPage(goToPage);
      }, 500);
      return () => clearTimeout(timer);
    }, [goToPage]);

    // ·······························································
    // HANDLERS

    const handleGoToPage = (e) => {
      let value = parseInt(e);

      if (value < 1) {
        setGoToPage(1);
        return;
      }
      if (value > totalCount) {
        setGoToPage(totalCount);
        return;
      }
      setGoToPage(value);
    };

    const onChangeHandler = (e) => {
      if (!disabled) {
        setPage(e);
        setGoToPage(e);
        onChange(e);
      }
    };

    const onSizeChangeHandler = (e) => {
      if (!disabled) {
        setSize(e);
        onSizeChange(e);
      }
    };

    // ·······························································
    // STYLES

    const { classes, cx } = PagerStyles(
      { withGoTo, withControls, withEdges, disabled, hidePages: variant === 'infinity' },
      { name: 'Pager' }
    );

    return (
      <Stack direction={direction} alignItems={'center'} spacing={3}>
        {withGoTo && (
          <Box className={classes.goto}>
            <span className={classes.span}>{labels.goTo}</span>
            <input
              type={'number'}
              min={1}
              max={totalCount}
              maxLength={inputMaxLength}
              className={classes.input}
              value={goToPage.toString()}
              onChange={(e) => handleGoToPage(e)}
              disabled={disabled}
            />
            {/* NumberInput is not really an input type="number" so im using <input/> instead */}
            {/* <NumberInput hideControls /> */}
          </Box>
        )}
        <MantinePagination
          {...props}
          ref={ref}
          total={totalCount}
          boundaries={boundaries}
          siblings={siblings}
          classNames={classes}
          className={classes.root}
          direction={direction}
          withControls={withControls}
          withEdges={withEdges}
          page={page}
          onChange={(e) => onChangeHandler(e)}
        />
        {withSize && (
          <Box className={classes.size}>
            <Select
              onChange={onSizeChangeHandler}
              value={size}
              data={[10, 20, 30, 40, 50].map((size) => ({
                label: `${labels.show} ${size}`,
                value: size,
              }))}
            />
          </Box>
        )}
      </Stack>
    );
  }
);

Pager.defaultProps = PAGER_DEFAULT_PROPS;
Pager.propTypes = PAGER_PROP_TYPES;

export { Pager };
