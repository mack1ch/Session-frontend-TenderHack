import { DefaultOptionType } from "antd/es/select";

export interface ChangeEventExtra {

  preValue: LabeledValueType[];
  triggerValue: RawValueType;
  /** @deprecated Use `onSelect` or `onDeselect` instead. */
  selected?: boolean;
  /** @deprecated Use `onSelect` or `onDeselect` instead. */
  checked?: boolean;
  /** @deprecated This prop not work as react node anymore. */
  triggerNode: React.ReactElement;
  /** @deprecated This prop not work as react node anymore. */
  allCheckedNodes: LegacyCheckedNode[];
}

export interface LabeledValueType {
  key?: React.Key;
  value?: RawValueType;
  label?: React.ReactNode;
  /** Only works on `treeCheckStrictly` */
  halfChecked?: boolean;
}

export type RawValueType = string | number;

export interface LegacyCheckedNode {
  pos: string;
  node: React.ReactElement;
  children?: LegacyCheckedNode[];
}

export interface TreeNode {
  value?: RawValueType;
  title?: React.ReactNode;
  label?: React.ReactNode;
  key?: React.Key;
  children?: DefaultOptionType[];
}

export interface LegacyDataNode extends DefaultOptionType {}
