import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type NavContent = {
    title: string
    path: string
    icon: IconDefinition
}

export type Section = {
  section: string;
  items: NavContent[];
}

export type Role = {
    SUPER_ADMIN?: string
    ADMIN?: string
    STUDENT?: string
    USER?: string
    AGENT?: string
    SUB_AGENT?: string
}