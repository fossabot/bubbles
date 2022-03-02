import React, { useEffect, useState, useMemo } from 'react';
import update from 'immutability-helper';
import { isFunction, isEmpty, uniq } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '../../layout/Box';
import { InputError } from '../InputError';
import { TableInputDisplay } from './TableInputDisplay';
import { TABLE_INPUT_DEFAULT_PROPS, TABLE_INPUT_PROP_TYPES } from './TableInput.constants';
import { TableInputStyles } from './TableInput.styles';

// ----------------------------------------------------------------
// HELP FUNCTIONS

function serializeItem(value) {
  return { tableInputRowId: uuidv4(), ...value };
}

function serializeData(data) {
  return data.map((value) => serializeItem(value));
}

function deserializeData(data) {
  return data.map((item) => {
    const { tableInputRowId, ...value } = item;
    return value;
  });
}

// ----------------------------------------------------------------
// COMPONENT

const TableInput = ({
  data,
  form,
  error,
  unique,
  onChange = () => {},
  onChangeData = () => {},
  onBeforeRemove = () => {},
  onBeforeAdd = () => {},
  onAdd = () => {},
  onUpdate = () => {},
  onRemove = () => {},
  onSort = () => {},
  ...props
}) => {
  const [tableData, setTableData] = useState([]);
  const hasError = useMemo(() => !isEmpty(error), [error]);

  useEffect(() => {
    const newData = serializeData(data);
    setTableData(newData);
  }, [data]);

  // ··················
  // HANDLERS

  const handleOnChange = (newData, event) => {
    setTableData(cleanData);
    if (isFunction(onChangeData)) onChangeData(deserializeData(cleanData), event);
    if (isFunction(onChange)) onChange(deserializeData(cleanData), event);
  };

  const handleOnAdd = async (item) => {
    let canAdd = true;
    if (isFunction(onBeforeAdd)) {
      const result = await onBeforeAdd(item);
      canAdd = !(result === false);
    }
    if (canAdd) {
      const newData = update(tableData, { $push: [serializeItem(item)] });
      onAdd(serializeItem(item));
      handleOnChange(newData, { type: 'add' });
    }
  };

  const handleOnEdit = (newItem, index) => {
    const newData = [...tableData];
    const oldItem = newData[index];
    newData[index] = { ...oldItem, ...newItem };
    onUpdate({ oldItem, newItem, index });
    handleOnChange(newData, { type: 'edit', index, newItem, oldItem });
  };

  const handleOnRemove = async (index) => {
    let canRemove = true;
    if (isFunction(onBeforeRemove)) {
      const result = await onBeforeRemove(tableData[index]);
      canRemove = !(result === false);
    }
    if (canRemove) {
      tableData.splice(index, 1);
      onRemove(index);
      handleOnChange([...tableData], { type: 'remove' });
    }
  };

  const handleOnSort = (from, to) => {
    const record = tableData[from];
    const newData = update(tableData, {
      $splice: [
        [from, 1],
        [to, 0, record],
      ],
    });
    onSort({ from, to });
    handleOnChange(newData, { type: 'sort' });
  };

  const { classes, cx } = TableInputStyles({ hasError }, { name: 'TableInput' });

  return (
    <Box>
      <Box className={classes.wrapper}>
        <TableInputDisplay
          {...props}
          form={form}
          data={tableData}
          onAdd={handleOnAdd}
          onRemove={handleOnRemove}
          onEdit={handleOnEdit}
          onSort={handleOnSort}
          classes={classes}
        />
      </Box>
      {hasError && <InputError message={error} />}
    </Box>
  );
};

TableInput.defaultProps = TABLE_INPUT_DEFAULT_PROPS;
TableInput.propTypes = TABLE_INPUT_PROP_TYPES;

export { TableInput };
