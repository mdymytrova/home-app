import { SelectOptionModel } from '@common/select/select-option.model';
import { HouseViewEnum } from '@enums/house-view.enum';

export const HouseViewOptions: SelectOptionModel<HouseViewEnum>[] = [
  {
    id: HouseViewEnum.House,
    name: 'Houses',
  },
  {
    id: HouseViewEnum.City,
    name: 'Cities',
  },
  {
    id: HouseViewEnum.State,
    name: 'States',
  },
];
