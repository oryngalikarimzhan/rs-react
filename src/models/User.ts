import { CardModel } from 'models/index';

export interface User extends CardModel {
  surname: string;
  birthday: string;
  gender: string;
  country: string;
}
