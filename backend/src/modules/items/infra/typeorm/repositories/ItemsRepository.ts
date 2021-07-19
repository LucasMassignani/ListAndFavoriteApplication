import { getRepository, Repository } from 'typeorm';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ICreateItemDTO from '@modules/items/dtos/ICreateItemDTO';

import Item from '../entities/Item';
import IItemDTO from '@modules/items/dtos/IItemDTO';
import IFindAllUserFavoriteItemsOptionsDTO from '@modules/items/dtos/IFindAllUserFavoriteItemsOptionsDTO';
import IFindAllUserFavoriteItemsDTO from '@modules/items/dtos/IFindAllUserFavoriteItemsDTO';

class ItemsRepository implements IItemsRepository {
  private ormRepository: Repository<Item>;

  constructor() {
    this.ormRepository = getRepository(Item);
  }

  public async findById(id: string): Promise<Item | undefined> {
    const item = await this.ormRepository.findOne(id);

    return item;
  }

  public async findByItem(itemDTO: IItemDTO): Promise<Item | undefined> {
    const item = await this.ormRepository.findOne({
      where: {
        original_id: itemDTO.original_id,
        api_type: itemDTO.api_type,
      },
    });

    return item;
  }

  public async findAllUserFavoriteItems(
    user_id: string,
    { page, limit, listFilterValue }: IFindAllUserFavoriteItemsOptionsDTO,
  ): Promise<IFindAllUserFavoriteItemsDTO> {
    const favoritesQB = this.ormRepository
      .createQueryBuilder('item')
      .leftJoin('item.favorites', 'favorites')
      .leftJoin('item.filters', 'filters')
      .where('favorites.user_id = :user_id', { user_id })
      .groupBy('item.id');

    if (listFilterValue && Array.isArray(listFilterValue)) {
      listFilterValue.forEach(filterValue => {
        if (
          filterValue.filter &&
          filterValue.filter.name &&
          filterValue.filter.type &&
          filterValue.value
        ) {
          if (filterValue.filter.type === 'bool') {
            if (filterValue.value !== 'both') {
              const formattedValue = filterValue.value.replace(
                /[^\w\s]| /gi,
                '',
              );

              favoritesQB.andHaving(
                `:${filterValue.filter.name}_${formattedValue} = ANY(array_agg(concat(filters."name",'=',filters.value)))`,
                {
                  [`${filterValue.filter.name}_${formattedValue}`]: `${filterValue.filter.name}=${filterValue.value}`,
                },
              );
            }
          } else if (filterValue.filter.type === 'textList') {
            if (filterValue.value.length) {
              filterValue.value.forEach((value: string) => {
                const formattedValue = value.replace(/[^\w\s]| /gi, '');
                favoritesQB.andHaving(
                  `:${filterValue.filter.name}_${formattedValue}  = ANY(array_agg(concat(filters."name",'=',filters.value)))`,
                  {
                    [`${filterValue.filter.name}_${formattedValue}`]: `${filterValue.filter.name}=${value}`,
                  },
                );
              });
            }
          } else if (filterValue.filter.type === 'select') {
            if (filterValue.value !== 'all') {
              const formattedValue = filterValue.value.replace(
                /[^\w\s]| /gi,
                '',
              );
              favoritesQB.andHaving(
                `:${filterValue.filter.name}_${formattedValue} = ANY(array_agg(concat(filters."name",'=',filters.value)))`,
                {
                  [`${filterValue.filter.name}_${formattedValue}`]: `${filterValue.filter.name}=${filterValue.value}`,
                },
              );
            }
          }
        }
      });
    }
    const [query, params] = favoritesQB.getQueryAndParameters();
    const countQuery = `SELECT count(DISTINCT item.id) as count ${query.substr(
      query.indexOf('FROM'),
    )}`;

    favoritesQB.limit(limit).skip((page - 1) * limit);

    const [favorites, countDB] = await Promise.all([
      favoritesQB.getMany(),
      this.ormRepository.query(countQuery, params),
    ]);
    let count = 0;
    if (countDB.length) {
      [{ count }] = countDB;
    }
    return { list: favorites, pagination: { totalRegisters: Number(count) } };
  }

  public async create(itemData: ICreateItemDTO): Promise<Item> {
    const item = this.ormRepository.create(itemData);

    await this.ormRepository.save(item);

    return item;
  }

  public async save(item: Item): Promise<Item> {
    const saveItem = await this.ormRepository.save(item);
    return saveItem;
  }
}

export default ItemsRepository;
