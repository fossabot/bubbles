import React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';
import { CalendarIcon, ExternalLinkIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { Group, Title, Text, Box } from '@mantine/core';
import { Button, BUTTON_SIZES, BUTTON_VARIANTS, BUTTON_COLORS } from './Button';
 


const sizes = BUTTON_SIZES.map((size) => (
  <Button key={size} size={size}>
    Button {size}
  </Button>
));

const loading = BUTTON_SIZES.map((size) => (
  <Button key={size} size={size} loading>
    Button {size}
  </Button>
));

const getSizes = ({ ...props }) =>
  BUTTON_SIZES.map((size) => (
    <Button key={size} size={size} {...props}>
      Button {size}
    </Button>
  ));

const getLinkSizes = ({ ...props }) =>
  BUTTON_SIZES.map((size) => (
    <Button as="a" href="https://www.leemons.io" target="_blank" key={size} size={size} {...props}>
      Button {size}
    </Button>
  ));

  const variations = BUTTON_VARIANTS.map((variant) => (
    <Button key={variant} variant={variant} >
      Button {variant}
    </Button>
  ));

 const getVariations = ({ ...props }) =>
    BUTTON_VARIANTS.map((variant) => (
      <Button key={variant} variant={variant} {...props}>
        Button {variant}
      </Button>
    ));
  getVariations.parameters ={
    docs: {
      // a ver si se ve esto o no
    }
  }
    
  const colors = BUTTON_COLORS.map((color) => (
    <Button key={color} color={color}>
      Button {color}
    </Button>
  ));

  const getColors = ({ ...props }) =>
    BUTTON_COLORS.map((color) => (
      <Button key={color} color={color} variant='outline'>
        Button {color}
      </Button>
    ));



export default {
  title: 'Form/Button',
  parameters: {
    component: Button,
     
  },
  argTypes: {
    rounded: { control: { type: 'boolean' } },
    showLeftIcon: { control: { type: 'boolean' } },
    showRightIcon: { control: { type: 'boolean' } },
    size: { options: BUTTON_SIZES, control: { type: 'select' } },
    color: { options: BUTTON_COLORS, control: { type: 'select' } },
    variant: { options: BUTTON_VARIANTS, control: { type: 'select' } },
  },
};
 
const Template = (props) => {
  return <Button {...props}>Button Label</Button>;
};

export const DefaultButton = Template.bind({});

DefaultButton.args = {
  size: 'sm',
  color: 'primary',
  variant: 'default',
  rounded: false,
  showLeftIcon: false,
  showRightIcon: false,
  rightIcon: <ChevronRightIcon style={{ height: '1.2rem' }} />,
  leftIcon: <ChevronRightIcon style={{ height: '1.2rem' }} />,
};


 const Examples = () => (
  <>
    <Title order={3}> </Title>
    <Text>
      
    </Text>
    <Group style={{ gap: 32 }} mt="24px" mb="44px" mx="2px">
      {getVariations({
        //leftIcon: <CalendarIcon style={{ width: 14 }} />,
        size: 'sm',
      })}
    </Group>
    <Title order={3}>Rounded style </Title>
    <Text>
      The rounded style is used for user interface suggested actions for the rest of actions use the
      default button.
    </Text>
    <Text color="grey" size="sm">
      Examples:
    </Text>
    <Group style={{ gap: 32 }} mt="16px" mb="44px" mx="2px">
      <Button rounded={true} variant="outline">
        Skip and go to Users <ChevronRightIcon style={{ height: '1.2rem', marginLeft: '8px' }} />
      </Button>
      <Button rounded={true}>
        Mach profiles <ChevronRightIcon style={{ height: '1.2rem', marginLeft: '8px' }} />
      </Button>
    </Group>
    <Title order={3}>Button Colors </Title>
    <Text>
      We have four button colors:
      <Text weight={600} component="span">
        {' '}
        Primary (Main actions),
      </Text>{' '}
      Secondary, Terciary and negative.{' '}
    </Text>{' '}
    <Text> Negative color only works with outline variations.</Text>
    <Group style={{ gap: 32 }} mt="24px" mb="44px" mx="2px">
      {getColors({
        leftIcon: <CalendarIcon style={{ width: 14 }} />,
        size: 'sm',
      })}
    </Group>
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.uiBackground03,
        textAlign: 'center',
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: 'pointer',
      })}
    >
      <Button color="negative" variant="outline">
        Negative color
      </Button>
    </Box>
  </>
);
/*
 

export const Disabled = () => (
  <>
    <Group style={{ gap: 20 }}>{getSizes({ disabled: true })}</Group>
    <Group style={{ marginTop: 20, gap: 10 }}>
      {getSizes({ variant: 'outline', disabled: true })}
    </Group>
    <Group style={{ marginTop: 20, gap: 10 }}>
      {getSizes({ variant: 'light', disabled: true })}
    </Group>
    <Group style={{ marginTop: 20, gap: 10 }}>
      {getSizes({ variant: 'link', disabled: true })}
    </Group>
  </>
);
export const FullWidth = () => (
  <div>
    <Button fullWidth>Full width button</Button>
    <Button as="a" fullWidth style={{ marginTop: 20 }}>
      Full width link button
    </Button>
    <Button variant="link" fullWidth style={{ marginTop: 20 }}>
      Full width link variant
    </Button>
  </div>
);
export const Overflow = () => (
  <div style={{ width: 120, padding: 20, backgroundColor: '#f3f3f3' }}>
    <Button fullWidth>Full width button</Button>
    <Button as="a" fullWidth style={{ marginTop: 20 }}>
      Full width link button
    </Button>
    <Button variant="link" fullWidth style={{ marginTop: 20 }}>
      Full width link variant
    </Button>
  </div>
);
export const Loading = () => <Group style={{ gap: 10 }}>{loading}</Group>;

export const ReactRouter = () => (
  <MemoryRouter>
    <Group style={{ gap: 10 }}>
      <Button as={Link} to="/hello">
        Router button
      </Button>
    </Group>
  </MemoryRouter>
); */

/*

const getThemes = (props) =>
  Object.keys(DEFAULT_THEME.colors).map((color) => (
    <Button key={color} color={color} {...props}>
      {color}
    </Button>
  ));

const getLinkThemes = (props) =>
  Object.keys(DEFAULT_THEME.colors).map((color) => (
    <Button
      component="a"
      href="https://mantine.dev"
      target="_blank"
      key={color}
      color={color}
      {...props}
    >
      link - {color}
    </Button>
  ));

export const Gradient = () => (
  <Group style={{ padding: 20 }}>
    <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
      Indigo cyan
    </Button>
    <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 90 }}>
      Lime green
    </Button>
    <Button variant="gradient" gradient={{ from: 'teal', to: 'cyan', deg: 180 }}>
      Teal cyan
    </Button>
  </Group>
);

export const Themes = () => (
  <>
    <Group style={{ padding: 20 }}>{getThemes()}</Group>
    <Group style={{ padding: 20 }}>{getThemes({ variant: 'default' })}</Group>
    <Group style={{ padding: 20 }}>{getThemes({ variant: 'light' })}</Group>
    <Group style={{ padding: 20 }}>{getThemes({ variant: 'outline' })}</Group>
    <Group style={{ padding: 20 }}>{getThemes({ variant: 'link' })}</Group>
    <div style={{ backgroundColor: 'silver' }}>
      <Group style={{ padding: 20 }}>{getThemes({ variant: 'white' })}</Group>
    </div>
  </>
);

export const LinkThemes = () => (
  <>
    <Group style={{ padding: 20 }}>{getLinkThemes()}</Group>
    <Group style={{ padding: 20 }}>{getLinkThemes({ variant: 'outline' })}</Group>
    <Group style={{ padding: 20 }}>{getLinkThemes({ variant: 'link' })}</Group>
  </>
);
*/
