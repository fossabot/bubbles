import React, { useContext } from 'react';
import { Box } from '@mantine/core';
import DatasetItemDrawerContext from '../../context/DatasetItemDrawerContext';
import { Title } from '../../../../../typography';
import { TranslatorTabs } from '../../../../multilanguage';
import FieldConfigLocaleContext from './context/FieldConfigLocale';
import { Label } from './common/Label';
import { Description } from './common/Description';
import { Help } from './common/Help';
import { Multioption } from './Multioption';
import { Boolean } from './Boolean';
import { Select } from './Select';

const configFieldTypes = {
  text_field: null,
  rich_text: null,
  number: null,
  date: null,
  email: null,
  phone: null,
  link: null,
  multioption: <Multioption />,
  boolean: <Boolean />,
  select: <Select />,
  user: null,
  default: null,
};

const FieldConfigLocaleItem = ({ localeConfig }) => {
  const {
    form: { watch },
  } = useContext(DatasetItemDrawerContext);

  const fieldType = watch('config.type');

  return (
    <FieldConfigLocaleContext.Provider value={localeConfig}>
      <Label />
      <Description />
      <Help />
      {configFieldTypes[fieldType] ? configFieldTypes[fieldType] : configFieldTypes.default}
    </FieldConfigLocaleContext.Provider>
  );
};

const FieldConfigLocale = () => {
  const {
    contextRef: { messages, locales, defaultLocale },
  } = useContext(DatasetItemDrawerContext);

  return (
    <Box sx={(theme) => ({ marginTop: theme.spacing[5] })}>
      <Title order={4}>{messages.fieldConfigLocaleTitle}</Title>
      <TranslatorTabs locales={locales} defaultLocale={defaultLocale}>
        <FieldConfigLocaleItem />
      </TranslatorTabs>
    </Box>
  );
};

export { FieldConfigLocale };
