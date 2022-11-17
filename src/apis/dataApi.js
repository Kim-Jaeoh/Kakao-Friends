import axios from "axios";

const API = "https://kakao-friends.herokuapp.com";
// const API = "http://localhost:4000";

export const BannerListApi = () => axios.get(`${API}/mainContentsBannerList`);

export const SlideListApi = () => axios.get(`${API}/mainContentsSlideList`);

export const SeriesListApi = () => axios.get(`${API}/mainContentsSeriesList`);

export const CharacterList1Api = () => axios.get(`${API}/mainCharacterList1`);

export const CharacterList2Api = () => axios.get(`${API}/mainCharacterList2`);

export const CharacterList3Api = () => axios.get(`${API}/mainCharacterList3`);

export const RestockListApi = () => axios.get(`${API}/mainRestockList`);

export const MenuCharacterListApi = () =>
  axios.get(`${API}/menuCharacterListData`);

export const CategoryListApi = () => axios.get(`${API}/menuCategoryListData`);

export const ProductListApi = () => axios.get(`${API}/ProductListData`);

export const HalloweenApi = () => axios.get(`${API}/Halloween`);

export const PromotionApi = () => axios.get(`${API}/promotion`);

export const orderListApi = () => axios.get(`${API}/orderList`);
