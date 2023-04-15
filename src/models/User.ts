import { CardModel } from 'models';

export interface User extends CardModel {
  surname: string;
  birthday: string;
  gender: string;
  country: string;
}
