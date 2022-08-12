import React from 'react';
import { Box, Select, Button, DatePicker, Text, TextInput, Switch } from '@bubbles-ui/components';
import _ from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import { ScoresPeriodFormStyles } from './ScoresPeriodForm.styles';
import {
  SCORES_PERIOD_FORM_DEFAULT_PROPS,
  SCORES_PERIOD_FORM_PROP_TYPES,
} from './ScoresPeriodForm.constants';
import { SearchIcon } from '@bubbles-ui/icons/outline';
import { isFunction } from 'lodash';

function Periods({ classes, cx, labels, locale, onPeriodSelect, periods, setValue, watch }) {
  const startDate = watch('startDate')?.getTime();
  const endDate = watch('endDate')?.getTime();
  const [periodSelected, setPeriodSelected] = React.useState(null);

  React.useEffect(() => {
    if (
      periodSelected &&
      (periodSelected.startDate.getTime() !== startDate ||
        periodSelected.endDate.getTime() !== endDate)
    ) {
      setPeriodSelected(null);
      if (_.isFunction(onPeriodSelect)) {
        onPeriodSelect(null);
      }
    }
  }, [startDate, endDate]);

  if (!periods?.length) {
    return null;
  }

  return (
    <Box className={classes.periodsList}>
      <Text role="productive" strong color="soft" size="xs" transform="uppercase">
        {labels?.evaluations}
      </Text>
      {periods?.map((period) => {
        return (
          <Box
            className={cx(classes.period, {
              [classes.selectedPeriod]:
                startDate === period.startDate.getTime() && endDate === period.endDate.getTime(),
            })}
            key={period.id}
            onClick={() => {
              setPeriodSelected(period);
              if (_.isFunction(onPeriodSelect)) {
                onPeriodSelect(period);
              }
              setValue('startDate', period.startDate);
              setValue('endDate', period.endDate);
            }}
          >
            <Text color="primary" strong>
              {period.name}
            </Text>
            <Text color="quartiary">
              {period.startDate?.toLocaleDateString(locale)} -{' '}
              {period.endDate.toLocaleDateString(locale)}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}

function RenderSelects({ classes, clearLabel, control, errors, fields }) {
  return React.useMemo(() => {
    const selects = fields.map((field, index) => {
      const { name, placeholder, data, required, disabled, label, ...props } = field;

      return (
        <Controller
          // EN: The key should change if the value changes, otherwise the component will not re-render.
          // ES: El key debe cambiar si el valor cambia, de lo contrario el componente no se renderizará.
          key={`${name}-${index}`}
          control={control}
          name={name}
          rules={{ required }}
          render={({ field }) => {
            React.useEffect(() => {
              if (field.value && !data.some((item) => item.value === field.value)) {
                field.onChange(null);
              }
            }, [data]);

            return (
              <Select
                {...props}
                placeholder={placeholder}
                error={errors[name]}
                label={label}
                clearable={!required && clearLabel}
                data={data}
                disabled={disabled}
                required={!!required}
                {...field}
              />
            );
          }}
        />
      );
    });

    return <Box className={classes.selectWrapper}>{selects}</Box>;
  }, [fields, control, errors]);
}

function SelectDates({
  classes,
  control,
  errorMessages,
  errors,
  labels,
  locale,
  watch,
  getValues,
}) {
  return (
    <Box className={classes.periodWrapper}>
      <Controller
        control={control}
        name="startDate"
        rules={{
          required: errorMessages.startDate || 'Required Field',
          validate: (value) => {
            const endDate = getValues('endDate');

            if (!endDate) {
              return true;
            }

            if (value > endDate) {
              return errorMessages.validateStartDate || 'Invalid start date';
            }

            return true;
          },
        }}
        render={({ field }) => (
          <DatePicker
            label={labels.startDate}
            error={errors.startDate}
            required
            locale={locale}
            maxDate={watch('endDate')}
            headerStyle={{ flex: 'none' }}
            {...field}
            onChange={(value) => {
              if (!value) {
                field.onChange(value);
                return;
              }
              const date = new Date(value);

              date.setHours(0, 0, 0, 0);

              field.onChange(date);
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="endDate"
        rules={{
          required: errorMessages.endDate || 'Required Field',
          validate: (value) => {
            const startDate = getValues('startDate');

            if (!startDate) {
              return true;
            }

            if (value < startDate) {
              return errorMessages.validateEndDate || 'Invalid end date';
            }

            return true;
          },
        }}
        render={({ field }) => (
          <DatePicker
            label={labels.endDate}
            error={errors.endDate}
            required
            locale={locale}
            minDate={watch('startDate')}
            headerStyle={{ flex: 'none' }}
            {...field}
            onChange={(value) => {
              if (!value) {
                field.onChange(value);
                return;
              }

              const date = new Date(value);

              date.setHours(0, 0, 0, 0);

              field.onChange(date);
            }}
          />
        )}
      />
    </Box>
  );
}

function PeriodCreationForm({
  classes,
  control,
  errorMessages,
  labels,
  errors,
  handleSubmit,
  onSaveHandler,
}) {
  return (
    <Box className={classes.createContent}>
      <Controller
        control={control}
        name="periodName"
        rules={{
          required: errorMessages.periodName || 'Required Field',
        }}
        render={({ field }) => (
          <TextInput {...field} label={labels?.periodName} required error={errors.periodName} />
        )}
      />
      <Controller
        control={control}
        name="shareWithTeachers"
        render={({ field }) => (
          <Switch
            {...field}
            size="md"
            label={labels.shareWithTeachers}
            checked={field.value}
          ></Switch>
        )}
      />
      <Button fullWidth position="center" onClick={handleSubmit(onSaveHandler)}>
        {labels.saveButton}
      </Button>
    </Box>
  );
}

function ScoresPeriodForm({
  value,
  fields,
  labels,
  errorMessages,
  onSubmit,
  onSave,
  allowCreate,
  periods,
  locale,
  onChange,
  onPeriodSelect,
}) {
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: value });

  const onSubmitHandler = ({ periodName, shareWithTeachers, ...formValue }) => {
    if (_.isFunction(onSubmit)) {
      onSubmit(formValue);
    }
  };

  const onSaveHandler = ({ periodName, shareWithTeachers, ...formValue }) => {
    if (_.isFunction(onSave)) {
      onSave(formValue);
    }
  };

  React.useEffect(() => {
    if (isFunction(onChange)) {
      const subscription = watch((value, { name }) => {
        if (!['startDate', 'endDate'].includes(name)) {
          onChange(_.omit(value, ['startDate', 'endDate']));
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [watch, onChange]);

  const { classes, cx } = ScoresPeriodFormStyles({}, { name: 'ScoresPeriodForm' });

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <RenderSelects
          classes={classes}
          clearLabel={'clear'}
          control={control}
          errors={errors}
          fields={fields}
        />

        {!allowCreate && (
          <Periods
            classes={classes}
            cx={cx}
            labels={labels}
            locale={locale}
            onPeriodSelect={onPeriodSelect}
            periods={periods}
            setValue={setValue}
            watch={watch}
          />
        )}

        {!allowCreate && (
          <Box className={classes.customPeriodTitle}>
            <Text role="productive" strong color="soft" size="xs" transform="uppercase">
              {labels?.customPeriod}
            </Text>
          </Box>
        )}

        <SelectDates
          classes={classes}
          control={control}
          errorMessages={errorMessages}
          errors={errors}
          labels={labels}
          locale={locale}
          watch={watch}
          getValues={getValues}
        />

        {allowCreate && (
          <PeriodCreationForm
            classes={classes}
            control={control}
            errorMessages={errorMessages}
            labels={labels}
            errors={errors}
            handleSubmit={handleSubmit}
            onSaveHandler={onSaveHandler}
          />
        )}

        {!allowCreate && (
          <Box className={classes.buttonWrapper}>
            <Button type="submit" position="center" fullWidth rightIcon={<SearchIcon />}>
              {labels.submit}
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
}

ScoresPeriodForm.defaultProps = SCORES_PERIOD_FORM_DEFAULT_PROPS;
ScoresPeriodForm.propTypes = SCORES_PERIOD_FORM_PROP_TYPES;

export { ScoresPeriodForm };
