import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { LOGIC_OPERATORS } from '../ProgramRules';
import { RuleConditionStyles } from './RuleCondition.styles';
import { Box, Text, NumberInput, Select, TextInput } from '@bubbles-ui/components';
import { MultiSelect } from '@bubbles-ui/components/src/form/';
import { Menu } from '@bubbles-ui/components/src/navigation';
import { DeleteBinIcon } from '@bubbles-ui/icons/solid';
import { v4 as uuidv4 } from 'uuid';

const PROPTYPES_SHAPE = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

export const RULE_CONDITION_DEFAULT_PROPS = {};
export const RULE_CONDITION_PROP_TYPES = {
  program: PROPTYPES_SHAPE,
  grades: PropTypes.arrayOf(PROPTYPES_SHAPE),
  sources: PropTypes.arrayOf(PROPTYPES_SHAPE),
  courses: PropTypes.arrayOf(PROPTYPES_SHAPE),
  knowledges: PropTypes.arrayOf(PROPTYPES_SHAPE),
  subjects: PropTypes.arrayOf(PROPTYPES_SHAPE),
  subjectTypes: PropTypes.arrayOf(PROPTYPES_SHAPE),
  subjectGroups: PropTypes.arrayOf(PROPTYPES_SHAPE),
  dataTypes: PropTypes.arrayOf(PROPTYPES_SHAPE),
  operators: PropTypes.arrayOf(PROPTYPES_SHAPE),
  logicOperator: PROPTYPES_SHAPE,
  setLogicOperator: PropTypes.func,
  index: PropTypes.number,
  draggableId: PropTypes.string,
  data: PropTypes.object,
  setData: PropTypes.func,
  condition: PropTypes.object,
  group: PropTypes.object,
  edited: PropTypes.array,
  setEdited: PropTypes.func,
  error: PropTypes.bool,
};

const RuleCondition = ({
  program,
  grades,
  sources,
  courses,
  knowledges,
  subjects,
  subjectTypes,
  subjectGroups,
  dataTypes,
  operators,
  logicOperator,
  setLogicOperator,
  index,
  draggableId,
  data,
  setData,
  condition,
  group,
  edited,
  setEdited,
  error,
  setError,
  errorMessage,
  ...props
}) => {
  const { classes, cx } = RuleConditionStyles({});

  const [sourceValue, setSourceValue] = useState(condition.source || '');
  const [sourceIdsValue, setSourceIdsValue] = useState(condition.sourceIds || []);
  const [dataType, setDataType] = useState(condition.data || '');
  const [operatorValue, setOperatorValue] = useState(condition.operator || '');
  const [targetValue, setTargetValue] = useState(condition.target || '');

  const setNewData = (e, field) => {
    if (field === 'source') {
      condition[field] = e;
      condition.sourceIds = [];
      setSourceIdsValue([]);
      if (e === 'program') {
        condition.sourceIds = [program.value];
        setSourceIdsValue([program.value]);
      }
    }
    if (field === 'sourceIds') setSourceIdsValue(e);
    condition[field] = e;
    setData({ ...data });
  };

  const getSourceSelect = (value) => {
    switch (value) {
      case 'course':
        return (
          <MultiSelect
            data={courses}
            placeholder={'Select course...'}
            value={sourceIdsValue}
            onChange={(e) => setNewData(e, 'sourceIds')}
          />
        );
      case 'knowledge':
        return (
          <MultiSelect
            data={knowledges}
            placeholder={'Select knowledge...'}
            value={sourceIdsValue}
            onChange={(e) => setNewData(e, 'sourceIds')}
          />
        );
      case 'subject':
        return (
          <MultiSelect
            data={subjects}
            placeholder={'Select subject...'}
            value={sourceIdsValue}
            onChange={(e) => setNewData(e, 'sourceIds')}
          />
        );
      case 'subjectType':
        return (
          <MultiSelect
            data={subjectTypes}
            placeholder={'Select subject type...'}
            value={sourceIdsValue}
            onChange={(e) => setNewData(e, 'sourceIds')}
          />
        );
      case 'subjectGroup':
        return (
          <MultiSelect
            data={subjectGroups}
            placeholder={'Select subject group...'}
            value={sourceIdsValue}
            onChange={(e) => setNewData(e, 'sourceIds')}
          />
        );
      default:
        return null;
    }
  };

  const setGroupOperator = (value) => {
    group.operator = value;
    setData({ ...data });
  };

  const getLogicOperatorSelect = () => {
    if (index === 0) {
      return <Text>Where</Text>;
    }
    if (index === 1) {
      return (
        <Select
          className={classes.input}
          data={LOGIC_OPERATORS}
          value={logicOperator.value}
          onChange={(e) => {
            setLogicOperator({ label: e.toUpperCase(), value: e });
            setGroupOperator(e);
          }}
        />
      );
    } else {
      return <Text>{logicOperator.label}</Text>;
    }
  };

  const removeCondition = () => {
    group.conditions.splice(index, 1);
    setData({ ...data });
  };

  const duplicateCondition = () => {
    group.conditions.push({ ...condition, id: uuidv4() });
    setData({ ...data });
  };

  const turnToGroup = () => {
    group.conditions.splice(index, 1, {
      id: uuidv4(),
      group: { operator: 'and', conditions: [condition] },
    });
    setData({ ...data });
  };

  useEffect(() => {
    setEdited(
      edited.map((item) => {
        if (item.id === draggableId) {
          if (targetValue === '' || !targetValue || targetValue === 0) {
            return {
              ...item,
              value: false,
            };
          }
          return {
            ...item,
            value: true,
          };
        }
        return item;
      })
    );
  }, [targetValue]);

  useEffect(() => {
    if (edited.filter((item) => item.value === false).length === 0) {
      setError(false);
    }
  }, [edited]);

  useEffect(() => {
    setEdited([...edited, { id: draggableId, value: false }]);
  }, []);

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <Box
          className={classes.root}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Box className={classes.logicOperator}>{getLogicOperatorSelect()}</Box>
          <Box className={classes.sourceSelects}>
            <Select
              className={classes.input}
              data={sources}
              placeholder={'Select item...'}
              value={sourceValue}
              onChange={(e) => {
                setSourceValue(e);
                setNewData(e, 'source');
              }}
              disabled={!program}
            />
            {sourceValue && getSourceSelect(sourceValue)}
          </Box>
          <Select
            data={dataTypes}
            placeholder={'Select data...'}
            value={dataType}
            onChange={(e) => {
              setDataType(e);
              setNewData(e, 'data');
            }}
            disabled={!sourceValue}
          />
          <Select
            data={operators}
            placeholder={'Select operator...'}
            value={operatorValue}
            onChange={(e) => {
              setOperatorValue(e);
              setNewData(e, 'operator');
            }}
            disabled={!dataType}
          />
          {dataType === 'gpa' || dataType === 'grade' ? (
            <Select
              data={grades}
              placeholder={'Select grade...'}
              value={targetValue}
              onChange={(e) => {
                setTargetValue(e);
                setNewData(e, 'target');
              }}
              disabled={!operatorValue}
              error={error && !targetValue ? errorMessage || 'Please select a grade' : null}
              required
            />
          ) : operatorValue === 'contains' ? (
            <TextInput
              placeholder={'Enter value...'}
              value={targetValue}
              onChange={(e) => {
                setTargetValue(e);
                setNewData(e, 'target');
              }}
              disabled={!operatorValue}
              error={error && !targetValue ? errorMessage || 'Please select a grade' : null}
              required
            />
          ) : (
            <NumberInput
              placeholder={'Enter value...'}
              defaultValue={0}
              value={targetValue}
              onChange={(e) => {
                setTargetValue(e);
                setNewData(e, 'target');
              }}
              disabled={!operatorValue}
              error={error && !targetValue ? errorMessage || 'Please select a grade' : null}
              required
            />
          )}
          <Menu
            items={[
              { children: 'Remove', icon: <DeleteBinIcon />, onClick: removeCondition },
              { children: 'Duplicate', icon: <DeleteBinIcon />, onClick: duplicateCondition },
              { children: 'Turn into group', icon: <DeleteBinIcon />, onClick: turnToGroup },
            ]}
          />
        </Box>
      )}
    </Draggable>
  );
};

RuleCondition.defaultProps = RULE_CONDITION_DEFAULT_PROPS;
RuleCondition.propTypes = RULE_CONDITION_PROP_TYPES;

export { RuleCondition };
