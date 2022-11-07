import clsx from 'clsx';

import { isLimitedToBE } from '@/portainer/feature-flags/feature-flags.service';
import { Icon } from '@/react/components/Icon';

import './BoxSelectorItem.css';

import { BoxSelectorOption, Value } from './types';
import { LimitedToBeIndicator } from './LimitedToBeIndicator';
import { BoxOption } from './BoxOption';
import { BadgeIcon } from './BadgeIcon';
import { LogoIcon } from './LogoIcon';

type Props<T extends Value> = {
  option: BoxSelectorOption<T>;
  radioName: string;
  disabled?: boolean;
  tooltip?: string;
  onSelect(value: T, limitedToBE: boolean): void;
  isSelected(value: T): boolean;
  type?: 'radio' | 'checkbox';
  slim?: boolean;
};

export function BoxSelectorItem<T extends Value>({
  radioName,
  option,
  onSelect = () => {},
  disabled,
  tooltip,
  type = 'radio',
  isSelected,
  slim = false,
}: Props<T>) {
  const limitedToBE = isLimitedToBE(option.feature);

  const beIndicatorTooltipId = `box-selector-item-${radioName}-${option.id}-limited`;
  return (
    <BoxOption
      className={clsx({
        business: limitedToBE,
        limited: limitedToBE,
      })}
      radioName={radioName}
      option={option}
      isSelected={isSelected}
      disabled={disabled}
      onSelect={(value) => onSelect(value, limitedToBE)}
      tooltip={tooltip}
      type={type}
    >
      <>
        {limitedToBE && (
          <LimitedToBeIndicator
            tooltipId={beIndicatorTooltipId}
            featureId={option.feature}
          />
        )}
        <div
          className={clsx('flex gap-2', {
            'opacity-30': limitedToBE,
            'flex-col justify-between h-full': !slim,
            'items-center slim': slim,
          })}
        >
          <div
            className={clsx('boxselector_img_container flex items-center', {
              'flex-1': !slim,
            })}
          >
            {renderIcon()}
          </div>
          <div>
            <div className="boxselector_header">{option.label}</div>
            <p className="box-selector-item-description">
              {option.description}
            </p>
          </div>
        </div>
      </>
    </BoxOption>
  );

  function renderIcon() {
    if (!option.icon) {
      return null;
    }

    if (option.iconType === 'badge') {
      return <BadgeIcon icon={option.icon} featherIcon={option.featherIcon} />;
    }

    if (option.iconType === 'logo') {
      return <LogoIcon icon={option.icon} featherIcon={option.featherIcon} />;
    }

    return (
      <Icon
        icon={option.icon}
        feather={option.featherIcon}
        className="boxselector_icon !flex items-center"
      />
    );
  }
}
