export class Fuzzy {
  public readonly items: string[] = [];
  public options: FuzzyOptions = {};

  constructor(items: string[], options: FuzzyOptions) {
    this.items = items;
    this.options = options;
  }
}

export interface FuzzyOptions {}
