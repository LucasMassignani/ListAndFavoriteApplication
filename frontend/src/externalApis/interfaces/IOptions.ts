import IFilterValue from './IFilterValue';

export default interface IOptions {
  limit?: number;
  page?: number;
  listFilterValue?: IFilterValue[];
}
