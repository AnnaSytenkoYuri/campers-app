type FeatureWithGetter = {
  icon: string;
  iconType?: string;
  getLabel: (value: string) => string;
};

type FeatureWithLabel = {
  label: string;
  icon: string;
  iconType?: string;
};

type FeatureMeta = FeatureWithGetter | FeatureWithLabel;

type FeatureKey = keyof typeof FEATURES;

type Camper = Partial<Record<FeatureKey, string | boolean>>;

export const FEATURES = {
  transmission: {
    icon: 'diagram',
    iconType: '',
    getLabel: (value: string) =>
      value === 'automatic'
        ? 'Automatic'
        : value === 'manual'
        ? 'Manual'
        : value,
  },
  engine: {
    icon: 'fuel-pump',
    iconType: '',
    getLabel: (value: string) =>
      value === 'petrol'
        ? 'Petrol'
        : value === 'diesel'
        ? 'Diesel'
        : value === 'hybrid'
        ? 'Hybrid'
        : value === 'electric'
        ? 'Electric'
        : value,
  },
  kitchen: { label: 'Kitchen', icon: 'cup-hot', iconType: '' },
  bathroom: { label: 'Bathroom', icon: 'ph_shower', iconType: '' },
  TV: { label: 'TV', icon: 'tv', iconType: '' },
  gas: { label: 'Gas', icon: 'hugeicons_gas-stove', iconType: 'stroke' },
  microwave: {
    label: 'Microwave',
    icon: 'lucide_microwave',
    iconType: 'stroke',
  },
  radio: { label: 'Radio', icon: 'ui-radios', iconType: '' },
  refrigerator: {
    label: 'Fridge',
    icon: 'solar_fridge-outline',
    iconType: '',
  },
  water: { label: 'Water', icon: 'ion_water-outline', iconType: 'stroke' },
  AC: { label: 'AC', icon: 'wind', iconType: '' },
} satisfies Record<string, FeatureMeta>;

type Chip = {
  key: string;
  label: string;
  icon: string;
  iconType: string;
};

export function buildFeature(camper: Camper): Chip[] {
  const chips: Chip[] = [];

  for (const [key, meta] of Object.entries(FEATURES) as [
    FeatureKey,
    FeatureMeta
  ][]) {
    const value = camper[key];

    if ('getLabel' in meta) {
      if (value) {
        chips.push({
          key,
          label: meta.getLabel(String(value)),
          icon: meta.icon,
          iconType: meta.iconType ?? 'stroke',
        });
      }
      continue;
    }

    if (value === true) {
      chips.push({
        key,
        label: meta.label,
        icon: meta.icon,
        iconType: meta.iconType ?? 'stroke',
      });
    }
  }

  return chips;
}
