import axios, { AxiosInstance } from 'axios';
import lodash from 'lodash';
import IItemApi from '../interfaces/IItemApi';
import IDynamicFilter from '../interfaces/IDynamicFilter';
import IFilter from '../interfaces/IFilter';
import IGetItemListReturn from '../interfaces/IGetItemListReturn';
import IItem from '../interfaces/IItem';
import IOptions from '../interfaces/IOptions';

interface IArtInstituteChicagoArtworkSearch {
  pagination: {
    total_pages: number;
    total: number;
  };
  data: Array<{
    api_link: string;
  }>;
}

interface IArtInstituteChicagoItem {
  data: {
    id: string;
    title: string;
    image_id: string;
    thumbnail: {
      lqip: string;
    };
    term_titles: string[];
    classification_titles: string[];
    material_titles: string[];

    is_public_domain: boolean;
    has_educational_resources: boolean;
    has_not_been_viewed_much: boolean;
  };
}

interface ITerm {
  term: {
    [key: string]: boolean;
  };
}

interface IMatch {
  match: {
    [key: string]: string;
  };
}

interface IExist {
  exists: {
    field: string;
  };
}

interface ISort {
  [key: string]: 'asc' | 'desc';
}

class ArtInstituteChicagoApi implements IItemApi {
  private api: AxiosInstance;
  public apiType: string;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.artic.edu/api/v1/',
    });
    this.apiType = 'ArtInstituteChicagoApi';
  }

  public getDynamicFilter(): IDynamicFilter {
    return {
      sort: {
        name: 'sort',
        label: 'Sort By',
        type: 'sort',
        options: [
          {
            label: 'Most Popular',
            value: 'popular',
          },
          {
            label: 'Most Recent',
            value: 'timestamp-asc',
          },
          {
            label: 'Less Recent',
            value: 'timestamp-desc',
          },
        ],
      },
      is_public_domain: {
        type: 'bool',
        name: 'is_public_domain',
        label: 'Is Public Domain',
      },
      has_educational_resources: {
        name: 'has_educational_resources',
        label: 'Has Educational Resources',
        type: 'bool',
      },
      has_not_been_viewed_much: {
        name: 'has_not_been_viewed_much',
        label: 'Has Not Been Viewed Much',
        type: 'bool',
      },
      term_titles: {
        name: 'term_titles',
        label: 'Terms',
        type: 'textList',
        recommendedOptions: [],
      },
      classification_titles: {
        name: 'classification_titles',
        label: 'Classifications',
        type: 'textList',
        recommendedOptions: [],
      },
      material_titles: {
        name: 'material_titles',
        label: 'Materials',
        type: 'textList',
        recommendedOptions: [],
      },
    };
  }

  public async getFilterFromItem(item: IItem): Promise<IFilter[]> {
    const response = await this.api.get<IArtInstituteChicagoItem>(
      `artworks/${item.original_id}`,
    );

    const dynamicFilters = this.getDynamicFilter();

    const filters: IFilter[] = [];
    Object.keys(dynamicFilters).forEach((key: any) => {
      const dynamicFilter = dynamicFilters[key];
      const data: any = response.data.data;
      if (dynamicFilter.type === 'bool') {
        filters.push({
          name: dynamicFilter.name,
          value: String(data[key]),
        });
      } else if (dynamicFilter.type === 'textList') {
        data[key].forEach((value: string) => {
          filters.push({
            name: dynamicFilter.name,
            value: String(value),
          });
        });
      }
    });

    return filters;
  }

  public async getItemList({
    limit = 20,
    page = 1,
    listFilterValue = [],
  }: IOptions): Promise<IGetItemListReturn> {
    const must: Array<ITerm | IMatch | IExist> = [
      {
        exists: {
          field: 'image_id',
        },
      },
    ];
    const sort: Array<ISort> = [];

    listFilterValue
      .filter((filterValue) => {
        if (filterValue.value === undefined) {
          return false;
        }

        if (filterValue.filter.type === 'bool') {
          return filterValue.value !== 'both';
        }

        if (filterValue.filter.type === 'textList') {
          return filterValue.value.length > 0;
        }

        if (filterValue.filter.type === 'sort') {
          return filterValue.value !== 'popular';
        }

        return false;
      })
      .forEach((filterValue) => {
        if (filterValue.filter.type === 'bool') {
          must.push({
            term: {
              [filterValue.filter.name]: filterValue.value === 'true',
            },
          });
        }
        if (filterValue.filter.type === 'textList') {
          filterValue.value.forEach((value: string) => {
            must.push({ match: { term_titles: value } });
          });
        }
        if (filterValue.filter.type === 'sort') {
          const [field, order] = filterValue.value.split('-');
          sort.push({ [field]: order });
        }
      });

    const response = await this.api.get<IArtInstituteChicagoArtworkSearch>(
      'artworks/search',
      {
        params: {
          limit,
          page,
          params: {
            sort: sort.length ? sort : undefined,
            query: {
              bool: {
                must,
              },
            },
          },
        },
      },
    );

    const dynamicFilter = this.getDynamicFilter();

    const listItemPromise = response.data.data.map(
      async ({ api_link }, index): Promise<IItem> => {
        try {
          const { data: artwork } =
            await this.api.get<IArtInstituteChicagoItem>(api_link);

          if (dynamicFilter.term_titles.type === 'textList') {
            dynamicFilter.term_titles.recommendedOptions = lodash.union(
              dynamicFilter.term_titles.recommendedOptions,
              artwork.data.term_titles,
            );
          }

          if (dynamicFilter.classification_titles.type === 'textList') {
            dynamicFilter.classification_titles.recommendedOptions =
              lodash.union(
                dynamicFilter.classification_titles.recommendedOptions,
                artwork.data.classification_titles,
              );
          }

          if (dynamicFilter.material_titles.type === 'textList') {
            dynamicFilter.material_titles.recommendedOptions = lodash.union(
              dynamicFilter.material_titles.recommendedOptions,
              artwork.data.material_titles,
            );
          }

          return {
            original_id: String(artwork.data.id),
            title: artwork.data.title,
            image_url: `https://www.artic.edu/iiif/2/${artwork.data.image_id}/full/843,/0/default.jpg`,
            image_preview: artwork.data?.thumbnail?.lqip || '',
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
      },
    );

    const itemList = await Promise.all(listItemPromise);

    return {
      filter: dynamicFilter,
      list: itemList,
      totalPages: response.data.pagination.total_pages,
      totalRegisters: response.data.pagination.total,
    };
  }

  public getApiType(): string {
    return this.apiType;
  }
}

export default new ArtInstituteChicagoApi();
