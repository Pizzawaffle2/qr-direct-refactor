import * as React from 'react';
import {
  Select as RadixSelect,
  SelectTrigger as RadixSelectTrigger,
  SelectValue as RadixSelectValue,
  SelectContent as RadixSelectContent,
  SelectGroup as RadixSelectGroup,
  SelectItem as RadixSelectItem
} from '@radix-ui/react-select';
import { SelectTriggerProps, SelectValueProps, SelectContentProps, SelectGroupProps, SelectItemProps } from '@radix-ui/react-select';

export const Select = RadixSelect;

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>((props, ref) => (
  <RadixSelectTrigger {...props} ref={ref} />
));

export const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>((props, ref) => (
  <RadixSelectValue {...props} ref={ref} />
));

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>((props, ref) => (
  <RadixSelectContent {...props} ref={ref} />
));

export const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>((props, ref) => (
  <RadixSelectGroup {...props} ref={ref} />
));

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>((props, ref) => (
  <RadixSelectItem {...props} ref={ref} />
));