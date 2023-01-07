import axios from "axios";

const API = `${process.env.REACT_APP_SERVER_PORT}/api`;

export const BannerListApi = async () =>
  await axios.get(`${API}/mainContentsBannerList`);

export const SlideListApi = async () =>
  await axios.get(`${API}/mainContentsSlideList`);

export const SeriesListApi = async () =>
  await axios.get(`${API}/mainContentsSeriesList`);

export const CharacterList1Api = async () =>
  await axios.get(`${API}/mainCharacterList1`);

export const CharacterList2Api = async () =>
  await axios.get(`${API}/mainCharacterList2`);

export const CharacterList3Api = async () =>
  await axios.get(`${API}/mainCharacterList3`);

export const RestockListApi = async () =>
  await axios.get(`${API}/mainRestockList`);

export const MenuCharacterListApi = async () =>
  await axios.get(`${API}/menuCharacterListData`);

export const ProductListApi = async () => await axios.get(`${API}/product`);

export const PromotionApi = async () => await axios.get(`${API}/promotionlist`);
