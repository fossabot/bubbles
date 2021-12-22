import React from 'react';
import { Box, Space } from '@mantine/core';
import { Radio } from './Radio';
import mdx from './Radio.mdx';
import { RADIO_HELP_POSITIONS, RADIO_VARIANTS } from './Radio';
import { AcademicCapIcon } from '@heroicons/react/outline';

export default {
  title: 'Atoms/Form/Radio',
  parameters: {
    component: Radio,
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/c3MWm2gVHU4JfYlVfr5VvB/%F0%9F%8D%8B%F0%9F%92%A7-Bubbles-SD-v2?node-id=3642%3A2657',
    },
  },
  argTypes: {
    variant: { options: RADIO_VARIANTS, control: { type: 'select' } },
    helpPosition: { options: RADIO_HELP_POSITIONS, control: { type: 'select' } },
    onChange: { action: 'Checked' },
  },
};

const Template = ({ children, ...props }) => {
  return (
    <>
      <Radio {...props} name="test">
        {children} {0}
      </Radio>
      <Space></Space>
      <Radio {...props} name="test">
        {children} {1}
      </Radio>
      <Space></Space>
      <Radio {...props} name="test">
        {children} {2}
      </Radio>
    </>
  );
};

export const Playground = Template.bind({});

Playground.args = {
  children: 'Radio button label',
  variant: 'default',
  disabled: false,
  help: 'Help text',
  helpPosition: 'right',
  icon: <AcademicCapIcon height={32} width={32} />,
};
