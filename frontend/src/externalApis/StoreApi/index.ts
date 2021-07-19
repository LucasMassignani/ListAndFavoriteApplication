import axios, { AxiosInstance } from 'axios';
import IItemApi from '../interfaces/IItemApi';
import IDynamicFilter from '../interfaces/IDynamicFilter';
import IFilter from '../interfaces/IFilter';
import IGetItemListReturn from '../interfaces/IGetItemListReturn';
import IItem from '../interfaces/IItem';
import IOptions from '../interfaces/IOptions';

interface IStoreItem {
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

class StoreApi implements IItemApi {
  private api: AxiosInstance;
  public apiType: string;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://fakestoreapi.com/',
    });
    this.apiType = 'StoreApi';
  }

  public getDynamicFilter(): IDynamicFilter {
    return {
      sort: {
        name: 'sort',
        label: 'Sort By',
        type: 'sort',
        options: [
          {
            label: 'Title (A-Z)',
            value: 'title-asc',
          },
          {
            label: 'Title (Z-A)',
            value: 'title-desc',
          },
          {
            label: 'Price: Low to High',
            value: 'price-asc',
          },
          {
            label: 'Price: High to Low',
            value: 'price-desc',
          },
        ],
      },
      category: {
        type: 'select',
        name: 'category',
        label: 'Category',
        options: [],
      },
    };
  }

  public async getFilterFromItem(item: IItem): Promise<IFilter[]> {
    const response = await this.api.get<IStoreItem>(
      `products/${item.original_id}`,
    );

    const dynamicFilters = this.getDynamicFilter();

    const filters: IFilter[] = [];
    Object.keys(dynamicFilters).forEach((key: any) => {
      const dynamicFilter = dynamicFilters[key];
      const data: any = response.data;

      if (dynamicFilter.type === 'select') {
        filters.push({
          name: dynamicFilter.name,
          value: String(data[key]),
        });
      }
    });

    return filters;
  }

  public async getItemList({
    limit = 6,
    page = 1,
    listFilterValue = [],
  }: IOptions): Promise<IGetItemListReturn> {
    const response = await this.api.get<IStoreItem[]>('products');
    const pageLimit = (page - 1) * limit;
    const dynamicFilter = this.getDynamicFilter();
    const sort = listFilterValue.find(
      (filter) => filter.filter.name === 'sort',
    );
    let field: keyof IStoreItem = 'title',
      order = 'asc';
    if (sort?.value) {
      [field, order] = sort.value.split('-');
    }

    if (dynamicFilter.category.type === 'select') {
      const response = await this.api.get<string[]>('products/categories');

      const options = response.data.map((category) => {
        return {
          label: category,
          value: category,
        };
      });

      dynamicFilter.category.options = [
        { label: 'all', value: 'all' },
        ...options,
      ];
    }

    const filteredItems = response.data.filter((item: any) => {
      if (listFilterValue.length < 1) return true;
      const isValid = !listFilterValue.find((filterValue) => {
        if (!filterValue.value) return false;
        if (filterValue.filter.type === 'sort') return false;
        if (filterValue.filter.type === 'select') {
          return item[filterValue.filter.name] !== filterValue.value;
        }
        return false;
      });

      return isValid;
    });
    const total = filteredItems.length;

    const itemSorted = filteredItems.sort((a, b) => {
      if (a[field] > b[field]) {
        return order === 'asc' ? 1 : -1;
      }
      if (a[field] < b[field]) {
        return order === 'asc' ? -1 : 1;
      }
      return 0;
    });

    const itemLimited = itemSorted.slice(pageLimit, limit + pageLimit);

    const itemList = itemLimited.map((item, index): IItem => {
      try {
        return {
          original_id: String(item.id),
          title: item.title,
          image_url: item.image,
          api_type: this.apiType,
        };
      } catch (error) {
        if (
          error.response &&
          error.response.status &&
          error.response.status === 404
        ) {
          return {
            original_id: String(index),
            title: '',
            image_url: '',
            image_preview: '',
            api_type: this.apiType,
          };
        }
        throw error;
      }
    });

    return {
      filter: dynamicFilter,
      list: itemList,
      totalPages: Math.ceil(total / limit),
      totalRegisters: total,
    };
  }

  public getApiType(): string {
    return this.apiType;
  }
}

export default new StoreApi();
