export function cx(...classNames: Array<string | boolean>) {
  return classNames.filter(Boolean).join(' ');
}
