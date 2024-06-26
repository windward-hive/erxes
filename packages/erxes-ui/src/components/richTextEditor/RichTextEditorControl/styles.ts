import { colors } from '../../../styles';
import { rgba } from '../../../styles/ecolor';
import styled from 'styled-components';

const EditorControl = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 0;
  color: ${colors.textPrimary};
  cursor: pointer;
  height: 1.75rem;
  padding: 0.25rem;
  width: 1.75rem;

  .editor_icon {
    width: 16px;
    height: 16px;
    display: inline-block;
    opacity: 0.8;
  }

  .textcolor_icon {
    background: url(/images/editor_icons.png) no-repeat 0 -384px !important;
  }

  .bgcolor_icon {
    background: url(/images/editor_icons.png) no-repeat 0 -360px !important;
  }

  &:hover,
  &.is-active {
    background-color: #f8f9fa;
  }

  &:disabled {
    color: ${colors.colorCoreLightGray} !important;
    svg {
      fill: ${colors.colorCoreLightGray} !important;
    }
    pointer-events: none;
  }

  border-radius: 0.25rem;

  &[data-active='true'] {
    color: ${colors.colorSecondary};
    background-color: ${rgba(colors.colorSecondary, 0.05)};
  }
`;
const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 0.0625rem solid #eee;
  border-radius: 0.25rem;
  color: ${colors.textPrimary};
  cursor: pointer;
  padding: 0.5rem;
`;
const LinkButton = styled.button`
  height: 2.25rem;
  min-height: 2.25rem;
  background-color: #fff;
  border: 0.0625rem solid #eee;
  color: ${colors.textPrimary};
  cursor: pointer;
  outline: none;
  font-weight: 600;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.25rem;
  border: 0.0625rem solid #eee;
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  &:hover,
  &.is-active {
    background-color: #f8f9fa;
  }
`;
const ImageInputWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  color: ${colors.textPrimary};
`;
const InputWrapper = styled.div`
  position: relative;
`;
const FormItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > label {
    color: rgba(34, 47, 62, 0.7);
  }
  > div {
    width: 100%;
    > input {
      flex-grow: 1;
    }
  }
`;
const FormActionWrapper = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-left: auto;
  padding: 0.5rem 1rem;
`;
const LinkInput = styled.input`
  border: 0.0625rem solid #eee;
  border-radius: 0.25rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 2.25rem;
  min-height: 2.25rem;
  color: #000;
  outline: none;
  padding: 0 2.35rem 0 0.25rem;
  &:focus {
    border: 0.0625rem solid ${rgba(colors.colorSecondary, 0.55)};
  }
  &::placeholder {
    color: #adb5bd;
  }
`;
const ImageHandlingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Input = styled.input`
  border: 0.0625rem solid #eee;
  border-radius: 0.25rem;
  height: 2.25rem;
  min-height: 2.25rem;
  color: #000;
  outline: none;
  padding: 0 0.25rem;
  &:focus {
    border: 0.0625rem solid ${rgba(colors.colorSecondary, 0.55)};
  }
  &::placeholder {
    color: #adb5bd;
  }
`;
const InputAction = styled.div`
  position: absolute;
  right: 0.3rem;
  top: 0.3rem;
  button {
    cursor: pointer;
    background-color: #fff;
    border: 0.0625rem solid #eee;
    border-radius: 0.25rem;
    padding-top: 0.2rem;
    &[data-active='true'] {
      color: ${colors.colorSecondary};
      background-color: ${rgba(colors.colorSecondary, 0.05)};
    }
  }
`;

const FileInputAction = styled.div`
  > div {
    cursor: pointer;
    background-color: #fff;
    border: 0.0625rem solid #eee;
    border-radius: 0.25rem;
    padding-left: 0.55rem;
    padding-right: 0.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    height: 100%;
    width: 36px;
    > div {
      position: absolute;
      left: 26px;
      top: 17px;
    }
  }
  label {
    &:hover {
      cursor: pointer;
    }
  }
  input[type='file'] {
    display: none;
  }
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FontSelectWrapper = styled.div<{ $toolbarPlacement: 'top' | 'bottom' }>`
  .css-13cymwt-control {
    border: 0.0625rem solid #eee;
    border-radius: 0.25rem;
    height: 1.75rem;
  }
  .css-1hb7zxy-IndicatorsContainer {
    display: none;
  }
  .Select-clear-zone {
    display: none;
  }
  .Select-input {
    z-index: 10;
    position: absolute;
  }

  .Select.is-disabled {
    .Select-control {
      background-color: unset !important;
    }
    .Select-placeholder {
      color: #aaa;
      top: -4px;
      left: 9px;
    }
  }

  .Select-control {
    width: 56px;
    border-bottom: none;
  }

  .Select-arrow-zone {
    top: -3px;
  }

  .Select--single > .Select-control .Select-value {
    padding-left: 0;
    padding-right: 0;
    top: -4px;
    left: 15px;
  }

  .Select-input > input {
    color: transparent;
    text-shadow: 0 0 0 #2196f3;
    &:focus {
      outline: none;
      cursor: default;
    }
  }
  .css-1nmdiq5-menu {
    z-index: 100;
    width: max-content;
    .Select-menu {
      max-height: ${({ $toolbarPlacement }) =>
    $toolbarPlacement === 'top' ? '135px' : '216px'};
    }
  }

  .Select-option {
    padding: 4px 8px;
  }
  .Select-placeholder {
    color: unset;
    top: -4px;
    left: 9px;
  }
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: white;
  border: none;
  &:first-of-type {
    border-top-right-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
  }
  &:last-of-type {
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px;
  width: 100%;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const PickerAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: white;
  border: none;
  &:first-of-type {
    border-bottom-left-radius: 0.25rem;
  }
  &:last-of-type {
    border-bottom-right-radius: 0.25rem;
  }
  width: 100%;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const ColorPickerWrapper = styled.div`
  .compact-picker {
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }
  > div {
    > div {
      box-shadow: none !important;
    }
  }
  .chrome-picker {
    box-shadow: none !important;
  }
`;


const RichTextEditorMenuWrapper = styled.div`
  display: flex;
  padding: 0.2rem;
  gap: 0.125rem;
  border-radius: 0.25rem;
`;

const RichTextEditorMenuPopoverWrapper = styled.div`
  .arrow {
    display: none;
  }
  .popover {
    box-shadow: 0 2px 6px 2px rgba(60, 64, 67, 0.15);
    z-index: 9999;
  }
`;

const getReactSelectStyle = (isSourceEnabled: boolean) => {
  return {
    container: (provided) => ({
      ...provided,
      background: 'transparent',
      color: '#444',
      minHeight: '1.75rem',
      height: '1.75rem',
      boxShadow: undefined,
    }),
    control: (provided) => ({
      ...provided,
      background: 'transparent',
      borderRadius: '0.25rem',
      border: 'none',
      minHeight: '1.75rem',
      height: '1.75rem',
      boxShadow: undefined,
      '&:hover': {
        border: '0',
        cursor: 'pointer',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isSourceEnabled ? '#AAAEB3' : '#444',
      fontSize: '0.75rem',
      fontWeight: 500,
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '1.75rem',
      padding: '0 6px',
      boxShadow: undefined,
    }),
    option: (provided, { isSelected }) => ({
      ...provided,
      backgroundColor: isSelected ? rgba(colors.colorSecondary, 0.15) 
      : 'transparent',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: !isSelected && rgba(colors.colorSecondary, 0.05),
      },
      '&:active': {
        backgroundColor: rgba(colors.colorSecondary, 0.15),
      },
      color: isSelected ? '#000' : '#444',
    }
    ),
    menu: (provided) => ({
      ...provided,
      width: 'min-content',
    }),
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    input: (provided) => ({
      ...provided,
      fontSize: '0.75rem',
      margin: '0px',
      caretColor: 'transparent',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      paddingLeft: 0,
      color: isSourceEnabled ? '#AAAEB3' : '#444',
      '&:hover': {
        color: '#444',
      },
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '1.75rem',
    }),
  }
}

export {
  EditorControl,
  LinkWrapper,
  LinkInput,
  LinkButton,
  InputAction,
  InputWrapper,
  FontSelectWrapper,
  FileInputAction,
  ImageInputWrapper,
  Input,
  FormItemWrapper,
  ImageHandlingForm,
  FormActionWrapper,
  ColorPickerWrapper,
  MenuItem,
  PickerAction,
  RichTextEditorMenuWrapper,
  RichTextEditorMenuPopoverWrapper,
  getReactSelectStyle
};
