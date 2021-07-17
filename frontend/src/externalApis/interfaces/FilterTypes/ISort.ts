export default interface ISort {
  name: string;
  label: string;
  type: 'sort';
  options: Array<{
    label: string;
    value: string;
  }>;
}
