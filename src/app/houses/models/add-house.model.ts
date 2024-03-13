export interface AddHouseModel {
  name: string;
  cityId?: number;
  cityName?: string;
  stateId: number;
  ownerId: number;
  photoUrl: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
}
