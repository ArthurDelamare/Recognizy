import { rabinkarp } from "./hash/rabinkarp";

export class Fuzzy {
  public readonly items: any[] = [];

  constructor(items: any[] ) {
    this.items = items;
  }

  public search(pattern: string, options: FuzzyOptions = {}) {
    let matches = [];
    
    if (this.items.every(item => typeof(item) === "string")) {
      matches = this.stringSearch(pattern);
    } else if (options.keys == null) {
      throw new Error("Used object without specifying keys in options.");
    }

    return matches;
  }

  private stringSearch(pattern: string) {
    const matches = [];

    for (const [index, item] of this.items.entries()) {
      const result = rabinkarp(item, pattern);
      if (result.length > 0) {
        matches.push({
          item: item,
          index: index,
          matchesAt: result
        });
      }
    }

    return matches;
  }
}

export interface FuzzyOptions {
  caseSensitive?: boolean;
  keys?: string[];
}

export interface FuzzyResult<T> {
  item: T,
  index: number,
  matchesAt: number[]
}