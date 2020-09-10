export default function singleSearch(value: string, list: string[]): string {
  for (let i = 0; i < list.length; i++) {
    if (list[i].includes(value)) {
      return list[i];
    }
  }
  return "";
}
