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
    } else {
      matches = this.objectSearch(pattern, options.keys);
    }

    return matches;
  }

  private stringSearch(pattern: string) {
    const matches: FuzzyResult[] = [];

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

  private objectSearch(pattern: string, keys: string[]) {
    const matches: FuzzyResult[] = [];

    for (const [index, item] of this.items.entries()) {
      const result = this.itemSearch(pattern, item, keys);

      if (result.item != null) {
        result.index = index;
        matches.push(result);
      }
    }

    

    return matches;
  }

  private itemSearch(pattern: string, item: any, keys: string[]): FuzzyResult {
    const match: FuzzyResult = {};

    for (const key in keys) {
      const variable = this.items[key];

      if (typeof(variable) === "string") {
        const result = rabinkarp(variable, pattern);

        if (result.length > 0) {
          match.item = item;
          return match;
        }
      }

      if (Array.isArray(variable)) {
        for (const value in variable) {
          if (typeof(value) === "string") {
            const result = rabinkarp(value, pattern);

            if (result.length > 0) {
              match.item = item;
              return match;
            }
          }
        }
      }
    }

    return match;
  }
}

export interface FuzzyOptions {
  caseSensitive?: boolean;
  keys?: string[];
}

export interface FuzzyResult {
  item?: any,
  index?: number,
  matchesAt?: number[]
}