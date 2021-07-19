export default interface ISelect {
  name: string;
  label: string;
  type: 'select';
  options: Array<{
    label: string;
    value: string;
  }>;
}
