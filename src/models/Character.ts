import { CardModel } from 'models';

export interface Character extends CardModel {
  actor: string;
  realname: string;
  species: string;
  citizenship: string;
  dateofbirth: string;
  affiliation: string[];
  appearances: string[];
}

export type CharacterCutted = Omit<Character, 'affiliation' | 'appearances'>;
