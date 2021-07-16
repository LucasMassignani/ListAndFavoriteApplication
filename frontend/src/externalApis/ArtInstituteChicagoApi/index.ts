import axios, { AxiosInstance } from 'axios';
import IArtworkApi from '../interfaces/IArtworkApi';
import IItem from '../interfaces/IItem';
import IOptions from '../interfaces/IOptions';

interface IArtInstituteChicagoArtworkSearch {
  data: Array<{
    api_link: string;
  }>;
}

interface IArtInstituteChicagoItem {
  data: {
    title: string;
    image_id: string;
  };
}

class ArtInstituteChicagoApi implements IArtworkApi {
  private api: AxiosInstance;
  public apiType: string;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.artic.edu/api/v1/',
    });
    this.apiType = 'ArtInstituteChicagoApi';
  }

  public async getItemList({
    limit = 20,
    page = 1,
  }: IOptions): Promise<IItem[]> {
    const response = await this.api.get<IArtInstituteChicagoArtworkSearch>(
      'artworks/search',
      {
        params: {
          limit,
          page,
        },
      },
    );

    const listItemPromise = response.data.data.map(
      async ({ api_link }): Promise<IItem> => {
        const { data: artwork } = await this.api.get<IArtInstituteChicagoItem>(
          api_link,
        );

        return {
          id: artwork.data.image_id,
          title: artwork.data.title,
          imageUrl: `https://www.artic.edu/iiif/2/${artwork.data.image_id}/full/843,/0/default.jpg`,
          apiType: this.apiType,
        };
      },
    );

    const listaItem = await Promise.all(listItemPromise);

    return listaItem;
  }
}

export default new ArtInstituteChicagoApi();
