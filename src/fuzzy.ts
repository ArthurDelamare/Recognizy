import { rabinkarp } from "./hash/rabinkarp";

export class Fuzzy {
  public readonly items: any[] = [];

  constructor(items: any[] ) {
    this.items = items;
  }

  public search(pattern: string, options: FuzzyOptions = {}) {
    let matches = [];

    if (this.items.every(item => typeof(item) === "string")) {
      matches = this.stringSearch(pattern, options.caseSensitive);
    } else if (options.keys == null) {
      throw new Error("Used object without specifying keys in options.");
    } else {
      matches = this.objectSearch(pattern, options.keys);;
    }

    return matches;
  }

  private stringSearch(pattern: string, caseSensitive: boolean = false) {
    const matches: FuzzyResult[] = [];

    for (const [index, item] of this.items.entries()) {
      const formattedItem = caseSensitive ? item : item.toLowerCase();
      const result = rabinkarp(formattedItem, pattern);
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

  private objectSearch(pattern: string, keys: string[], caseSensitive: boolean = false) {
    const matches: FuzzyResult[] = [];

    for (const [index, item] of this.items.entries()) {
      const result = this.itemSearch(pattern, item, keys, caseSensitive);

      if (result.item != null) {
        result.index = index;
        matches.push(result);
      }
    }

    return matches;
  }

  private itemSearch(pattern: string, item: any, keys: string[], caseSensitive: boolean = false): FuzzyResult {
    const match: FuzzyResult = {};

    for (const key of keys) {
      const variable = item[key];

      if (typeof(variable) === "string") {
        const formattedVariable = caseSensitive ? variable : variable.toLowerCase();
        const result = rabinkarp(formattedVariable, pattern);

        if (result.length > 0) {
          match.item = item;
          return match;
        }
      }

      if (Array.isArray(variable)) {
        for (const value in variable) {
          if (typeof(value) === "string") {
            const formattedValue = caseSensitive ? value : value.toLowerCase();
            const result = rabinkarp(formattedValue, pattern);

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