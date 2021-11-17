import { createStyles } from '@mantine/styles';

export const LogoStyles = createStyles((theme, {}, getRef) => {
  return {
    positive: {
      color: theme.colors.text01,
    },
    negative: {
      color: theme.colors.text07,
    },
  };
});
