import { LucideIcon } from "lucide-react";
import { HTMLAttributes } from "react";

export interface BlockMeta {
  type: string;
  name: string;
  icon?: LucideIcon;
  isParent?: boolean; // if true, can have nested blocks
  isText?: boolean; // if true, is editable as text
}

export interface BlockJson {
  type: string;
  text?: string;
  children?: BlockJson[];
}

export interface BlockProps extends HTMLAttributes<HTMLElement> {
  block: BlockJson;
}