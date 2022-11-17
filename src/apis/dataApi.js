import axios from "axios";

const API = "https://kakao-friends.herokuapp.com";
// const API = "http://localhost:4000";

export const BannerListApi = () =>
  axios.get(`${API}/api/mainContentsBannerList`);

export const SlideListApi = () => axios.get(`${API}/api/mainContentsSlideList`);

export const SeriesListApi = () =>
  axios.get(`${API}/api/mainContentsSeriesList`);

export const CharacterList1Api = () =>
  axios.get(`${API}/api/mainCharacterList1`);

export const CharacterList2Api = () =>
  axios.get(`${API}/api/mainCharacterList2`);

export const CharacterList3Api = () =>
  axios.get(`${API}/api/mainCharacterList3`);

export const RestockListApi = () => axios.get(`${API}/api/mainRestockList`);

export const MenuCharacterListApi = () =>
  axios.get(`${API}/api/menuCharacterListData`);

export const CategoryListApi = () =>
  axios.get(`${API}/api/menuCategoryListData`);

export const ProductListApi = () => axios.get(`${API}/api/ProductListData`);

export const HalloweenApi = () => axios.get(`${API}/api/Halloween`);

export const PromotionApi = () => axios.get(`${API}/api/promotion`);

export const orderListApi = () => axios.get(`${API}/api/orderList`);
