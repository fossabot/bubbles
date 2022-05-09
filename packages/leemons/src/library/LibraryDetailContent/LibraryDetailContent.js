import React from 'react';
import { isEmpty } from 'lodash';
import { Box, Badge, Paper, Stack, ImageLoader, Text, useClipboard } from '@bubbles-ui/components';
import { DuplicateIcon } from '@bubbles-ui/icons/outline';
import { LibraryCardContent, getDomain } from '../LibraryCardContent';
import { LibraryCardFooter } from '../LibraryCardFooter';
import { LibraryDetailContentStyles } from './LibraryDetailContent.styles';
import {
  LIBRARY_DETAIL_CONTENT_DEFAULT_PROPS,
  LIBRARY_DETAIL_CONTENT_PROP_TYPES,
} from './LibraryDetailContent.constants';
import { ActionButton } from '@bubbles-ui/components/src/form';

const LibraryDetailContent = ({
  description,
  metadata,
  tags,
  url,
  icon,
  fileType,
  fileExtension,
  variant,
  onCopy = () => {},
  ...props
}) => {
  const { classes, cx } = LibraryDetailContentStyles({}, { name: 'LibraryDetailContent' });
  const clipboard = useClipboard({ timeout: 2000 });

  const handleCopy = () => {
    clipboard.copy(url);
    onCopy();
  };

  return (
    <Stack direction="column" className={classes.root}>
      <LibraryCardContent description={description} truncated={false} />
      <LibraryCardFooter fileType={fileType} fileExtension={fileExtension} />
      {variant === 'bookmark' && (
        <Box
          sx={(theme) => ({ padding: theme.spacing[2], backgroundColor: theme.colors.mainWhite })}
        >
          <Paper bordered padding={2} radius="sm" shadow="none" fullWidth>
            <Stack spacing={2}>
              <Box>
                <ImageLoader src={icon} height={20} width={20} radius={4} />
              </Box>
              <Box>
                <Stack direction="column" display="grid">
                  <Text size="xs" strong>
                    {getDomain(url)}
                  </Text>
                  <Text size="xs" role="productive" truncated>
                    {url}
                  </Text>
                </Stack>
              </Box>
              <Box>
                <ActionButton
                  icon={<DuplicateIcon height={16} width={16} onClick={handleCopy} />}
                  tooltip={
                    clipboard.copied
                      ? props.labels?.copied || 'Copied'
                      : props.labels?.copy || 'Copy'
                  }
                />
              </Box>
            </Stack>
          </Paper>
        </Box>
      )}
      <Stack direction="column" className={classes.lowerContent}>
        {!isEmpty(metadata) && <LibraryCardContent metadata={metadata} />}
        {tags?.length > 0 && (
          <Box className={classes.tags}>
            <Box className={classes.tagsContainer}>
              {tags.map((tag, index) => (
                <Box key={`${tag} ${index}`}>
                  <Badge
                    label={tag}
                    size="md"
                    closable={false}
                    radius={'default'}
                    color={'stroke'}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

LibraryDetailContent.defaultProps = LIBRARY_DETAIL_CONTENT_DEFAULT_PROPS;
LibraryDetailContent.propTypes = LIBRARY_DETAIL_CONTENT_PROP_TYPES;

export { LibraryDetailContent };
