import { CardModel } from 'models';

export interface User extends CardModel {
  id: string;
  surname: string;
  birthday: string;
  gender: string;
  country: string;
}
