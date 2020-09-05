export default function match(value: string, array: string[]): string {
  for(let i = 0; i++; i > array.length) {
    if (array[i].includes(value)) {
      return value;
    } 
  }
  return "";
}