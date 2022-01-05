import React, { useContext } from 'react';
import { Box, Col, Grid } from '@mantine/core';
import DatasetItemDrawerContext from '../../context/DatasetItemDrawerContext';
import { Text } from '../../../../../typography';
import { Controller } from 'react-hook-form';
import { MultiSelect } from '../../../../../form/MultiSelect';

const UserField = () => {
  const {
    contextRef: { messages, selectOptions, gridColumn, colSpans },
    form: { control, unregister },
  } = useContext(DatasetItemDrawerContext);

  function onChange(newValue, onchange) {
    console.log(onchange);
    const index = newValue.indexOf('*');
    if (index > 0) {
      onchange([]);
    } else {
      if (index === 0) newValue.splice(index, 1);
      console.log(newValue);
      onchange(newValue);
    }
  }

  return (
    <Box sx={(theme) => ({ marginTop: theme.spacing[4] })}>
      <Grid columns={gridColumn} align="center">
        <Col span={colSpans[0]}>
          <Text strong color="primary" role="productive">
            {messages.userCentersLabel}
          </Text>
        </Col>

        <Col span={colSpans[1]}>
          <Controller
            name="config.center"
            control={control}
            render={({ field: { value, ...field } }) => (
              <MultiSelect
                {...field}
                value={!value || value.length === 0 ? ['*'] : value}
                required
                data={selectOptions.userCenters}
                onChange={(e) => onChange(e, field.onChange)}
              />
            )}
          />
        </Col>
      </Grid>
    </Box>
  );
};

export { UserField };
