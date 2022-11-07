import { FeatureId } from '@/portainer/feature-flags/enums';

import { BoxSelectorOption } from '@@/BoxSelector/types';
import { IconProps } from '@@/Icon';

export function buildOption<T extends number | string>(
  id: BoxSelectorOption<T>['id'],
  icon: IconProps['icon'],
  label: BoxSelectorOption<T>['label'],
  description: BoxSelectorOption<T>['description'],
  value: BoxSelectorOption<T>['value'],
  feature?: FeatureId,
  featherIcon?: IconProps['featherIcon']
): BoxSelectorOption<T> {
  return { id, icon, label, description, value, feature, featherIcon };
}
