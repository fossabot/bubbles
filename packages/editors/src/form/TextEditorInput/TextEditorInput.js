import React, { useMemo } from 'react';
import { isEmpty } from 'lodash';
import { Box, InputWrapper, useId } from '@bubbles-ui/components';
import {
  TEXT_EDITOR_INPUT_DEFAULT_PROPS,
  TEXT_EDITOR_INPUT_PROP_TYPES,
} from './TextEditorInput.constants';
import { TextEditorInputStyles } from './TextEditorInput.styles';
import { TextEditor } from '../TextEditor';
import {
  ColorTool,
  TransformsTool,
  HeadingsTool,
  ListIndentTool,
  TextAlignTool,
  ScriptsTool,
} from '../../tool';

const TextEditorInput = ({
  label,
  description,
  help,
  error,
  required,
  value,
  onChange,
  placeholder,
  toolbars,
  children,
  ...props
}) => {
  const uuid = useId();

  // ··································································
  // STYLES
  const hasError = useMemo(() => !isEmpty(error), [error]);
  const { classes } = TextEditorInputStyles({ hasError }, { name: 'TextEditorInput' });

  return (
    <InputWrapper
      uuid={uuid}
      label={label}
      description={description}
      error={error}
      help={help}
      required={required}
    >
      <Box className={classes.root}>
        <TextEditor {...props} content={value} onChange={onChange} editorClassname={classes.editor}>
          {toolbars.color && <ColorTool />}
          {toolbars.style && <TransformsTool />}
          {toolbars.heading && <HeadingsTool paragraph={false} />}
          {toolbars.list && <ListIndentTool />}
          {toolbars.align && <TextAlignTool />}
          {toolbars.formulation && <ScriptsTool />}
          {children}
        </TextEditor>
      </Box>
    </InputWrapper>
  );
};

TextEditorInput.defaultProps = TEXT_EDITOR_INPUT_DEFAULT_PROPS;
TextEditorInput.propTypes = TEXT_EDITOR_INPUT_PROP_TYPES;

export { TextEditorInput };
