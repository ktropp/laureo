import { LucideIcon } from "lucide-react";

export interface BlockMeta {
  type: string;
  name: string;
  icon?: LucideIcon;
  isParent?: boolean;
}

export interface BlockJson {
  type: string;
  text?: string;
  children?: BlockJson[];
}