import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  Heart,
  Lock,
  Mail,
  Minus,
  Pause,
  Pencil,
  Play,
  Plus,
  Save,
  Search,
  Send,
  Settings,
  Share2,
  ShoppingBag,
  ShoppingCart,
  Star,
  Trash2,
  Unlock,
  Upload,
  X,
  type LucideIcon,
} from 'lucide-react';
import catalogue from '../../content/studio/catalogues/lucide.icon-catalogue.json';

const iconComponents = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  check: Check,
  plus: Plus,
  minus: Minus,
  x: X,
  'shopping-bag': ShoppingBag,
  'shopping-cart': ShoppingCart,
  search: Search,
  download: Download,
  upload: Upload,
  save: Save,
  'trash-2': Trash2,
  pencil: Pencil,
  heart: Heart,
  star: Star,
  'external-link': ExternalLink,
  copy: Copy,
  'share-2': Share2,
  send: Send,
  mail: Mail,
  lock: Lock,
  unlock: Unlock,
  play: Play,
  pause: Pause,
  settings: Settings,
} satisfies Record<string, LucideIcon>;

const catalogueNames = new Set(catalogue.icons.map((icon) => icon.name));
const componentNames = new Set(Object.keys(iconComponents));
const missingComponents = [...catalogueNames].filter((name) => !componentNames.has(name));
const unlistedComponents = [...componentNames].filter((name) => !catalogueNames.has(name));

if (missingComponents.length > 0 || unlistedComponents.length > 0) {
  throw new Error(
    `Studio Lucide catalogue mismatch. Missing: ${missingComponents.join(', ') || 'none'}; unlisted: ${unlistedComponents.join(', ') || 'none'}`
  );
}

export interface StudioIconOption {
  name: string;
  label: string;
  Icon: LucideIcon;
}

export const studioLucideIcons: StudioIconOption[] = catalogue.icons.map((icon) => ({
  ...icon,
  Icon: iconComponents[icon.name as keyof typeof iconComponents],
}));

export function getStudioLucideIcon(name: string): LucideIcon | undefined {
  return iconComponents[name as keyof typeof iconComponents];
}
