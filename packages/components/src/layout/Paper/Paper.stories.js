import React from 'react';
import { Box } from '@mantine/core';
import { Paper, PAPER_DEFAULT_PROPS, PAPER_RADIUS, PAPER_PADDING } from './Paper';
import mdx from './Paper.mdx';
import { UserCards } from '../../informative/UserCards/UserCards';
import { defaultUser } from '../../informative/UserCards/UserCards.stories';

export default {
  title: 'Atoms/Layout/Paper',
  parameters: {
    component: Paper,
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/c3MWm2gVHU4JfYlVfr5VvB/🍋💧-Bubbles-SD-v2?node-id=3616%3A25458',
    },
  },
  argTypes: {
    radius: { control: { type: 'select' }, options: PAPER_RADIUS },
    padding: { control: { type: 'select' }, options: PAPER_PADDING },
    shadow: { control: { type: 'select' }, options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'] },
  },
};

const Template = ({ children, ...props }) => {
  return <Paper {...props}>{children}</Paper>;
};

export const Playground = Template.bind({});

Playground.args = {
  children: <UserCards user={defaultUser} />,
  ...PAPER_DEFAULT_PROPS,
};
