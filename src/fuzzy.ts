import { rabinkarp } from "./hash/rabinkarp";

export class Fuzzy {
  public readonly items: any[] = [];


  constructor(items: any[] ) {
    this.items = items;
  }

  search(pattern: string, options: FuzzyOptions) {
    
  }
}

export interface FuzzyOptions {
  caseSensitive?: boolean;
  keys?: string[]; 
}
