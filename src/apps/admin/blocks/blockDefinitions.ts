import { LucideIcon } from "lucide-react";

export interface BlockMeta {
  type: string;
  name: string;
  icon?: LucideIcon;
}

export interface BlockJson {
  type: string;
  children?: BlockJson[];
}