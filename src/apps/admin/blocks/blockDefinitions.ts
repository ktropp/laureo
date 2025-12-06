import { LucideIcon } from "lucide-react";
import { HTMLAttributes } from "react";

export interface BlockMeta {
  type: string;
  name: string;
  icon?: LucideIcon;
  isParent?: boolean; // if true, can have nested blocks
  isText?: boolean; // if true, is editable as text
  isServer?: boolean; // if true, admin will have different component than frontend (frontend will be use server)
  tagName?: string; // tagName for editable
  className?: string; // default classes
  tags?: BlockTag[];
  variants?: BlockVariant[];
  icons?: LucideIcon[];
  iconSize?: number;
  spaceSize?: number;
  iconClassName?: string;
  allowedChildren?: string[];
  allowedParents?: string[];
  disallowChildren?: string[];
}

export interface BlockTag {
  tagName: string;
  className?: string;
}

export interface BlockVariant {
  name: string;
  className: string;
}

export interface BlockJson {
  index: string;
  type: string;
  text?: string;
  tagName?: string;
  className?: string;
  id?: string;
  href?: string;
  isTargetBlank?: boolean;
  media_id?: number;
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  target?: string;
  rel?: string;
  icon?: string;
  iconPosition?: 'before' | 'after';
  children?: BlockJson[];
  lock?: boolean;
}

export interface BlockProps extends HTMLAttributes<HTMLElement> {
  block: BlockJson;
  GlobalFields?: GlobalField[];
}