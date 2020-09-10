/**
 * @param {string} str 
 * @param {number} vector
 */
function hashOne(str: string, vector: number = 0): number {
    return str.charCodeAt(0) * 256 ** vector;
}

/**
 * @param {number} accumulator 
 * @param {number} currentValue 
 */
function add(accumulator: number, currentValue: number): number {
    return accumulator + currentValue;
}

/**
 * @param {string} str 
 * @return {number}
 */
function hash(str: string): number {
    return str
    .split('')
    .map(hashOne)
    .reduce(add, 0)
}

/**
 * @param {number} originalHash 
 * @param {string} firstChar 
 */
function shiftHash(originalHash: number, firstChar: string): number {
    return (originalHash - hashOne(firstChar)) / 256;
}

/**
 * @param {number} originalHash 
 * @param {number} strLen 
 * @param {string} nextChar 
 */
function pushHash(originalHash: number, strLen: number, nextChar: string): number {
    return originalHash + hashOne(nextChar, strLen-1);
}

/**
 * @param {number} originalHash 
 * @param {string} firstChar 
 * @param {string} nextChar 
 * @param {number} strLen 
 */
function rollHash(originalHash: number, firstChar: string, nextChar: string, strLen: number): number {
    const shiftedHash = shiftHash(originalHash, firstChar);
    return pushHash(shiftedHash, strLen, nextChar);
}

/**
 * @param {string} text 
 * @param {string} pattern 
 */
export function rabinkarp(text: string, pattern: string): number[] {
    const matches = [];
    const patternHash = hash(pattern);
    const patterLength = pattern.length;

    let currentHash = hash(text.substr(0, patterLength));

    for (let i = 0; i < text.length - (patterLength - 1); i++) {
        if (patternHash === currentHash) matches.push(i); 
        currentHash = rollHash(
          currentHash,
          text[i], 
          text.substr(i + patterLength, 1), 
          patterLength
        );
    }

    return matches;
}
