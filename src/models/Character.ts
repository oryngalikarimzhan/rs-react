export interface Character {
  name: string;
  actor: string;
  realname: string;
  species: string;
  citizenship: string;
  dateofbirth: string;
  affiliation: string[];
  appearances: string[];
  image: string;
}

export type CharacterCutted = Omit<Character, 'affiliation' | 'appearances'>;
