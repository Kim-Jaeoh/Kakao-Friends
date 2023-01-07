export const SET_LOGIN_TOKEN = "SET_LOGIN_TOKEN";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_BASKET = "SET_BASKET";
export const SET_ORDER = "SET_ORDER";
export const CHECK_ITEM = "CHECK_ITEM";
export const UNCHECK_ITEM = "UNCHECK_ITEM";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const INPUT_CHANGE = "INPUT_CHANGE";
export const SET_CART_PRICE = "SET_CART_PRICE";
export const SET_TOTAL_PRICE = "SET_TOTAL_PRICE";

export const setLoginToken = (loginToken) => ({
  type: SET_LOGIN_TOKEN,
  payload: loginToken,
});

export const setCurrentUser = (currentUser) => ({
  type: SET_CURRENT_USER,
  payload: currentUser,
});

export const setBasket = (basket) => ({
  type: SET_BASKET,
  payload: basket,
});

export const setOrder = (order) => ({
  type: SET_ORDER,
  payload: order,
});

export const CheckItem = (item) => ({
  type: CHECK_ITEM,
  payload: item,
});

export const UnCheckItem = (item) => ({
  type: UNCHECK_ITEM,
  payload: item,
});

export const Increment = (item) => ({
  type: INCREMENT,
  payload: item,
});

export const Decrement = (item) => ({
  type: DECREMENT,
  payload: item,
});

export const InputChange = (item, value) => ({
  type: INPUT_CHANGE,
  payload: item,
  value: value,
});

export const setCartPrice = (item) => ({
  type: SET_CART_PRICE,
  payload: item,
});

export const setTotalPrice = (item) => ({
  type: SET_TOTAL_PRICE,
  payload: item,
});

const initialState = {
  loginToken: "logout",
  currentUser: {
    uid: "",
    displayName: "",
    email: "",
    createdAtId: "",
    cart: [],
    like: [],
  },
  basket: [
    // {
    //   id: "",
    //   product: "",
    //   title: "",
    //   price: "",
    //   image: "",
    //   quanity: "",
    //   check: true,
    // },
  ],
  order: {
    tid: "",
    created_at: "",
    orderInfo: {},
  },
  cartPrice: "",
  totalPrice: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_TOKEN:
      return {
        ...state,
        loginToken: action.payload,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case SET_BASKET:
      return {
        ...state,
        basket: action.payload,
      };

    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };

    case CHECK_ITEM:
      const item1 = state.basket.find((item) => item.id === action.payload.id);
      if (item1) {
        item1.check = true;
      }

      return {
        ...state,
        basket: [...state.basket],
      };

    case UNCHECK_ITEM:
      const item2 = state.basket.find((item) => item.id === action.payload.id);
      if (item2) {
        item2.check = false;
      }

      return {
        ...state,
        basket: [...state.basket],
      };

    case INCREMENT:
      const plus = state.basket.find((item) => item.id === action.payload.id);
      if (plus && plus.quanity < 99) {
        plus.quanity += 1;
      }
      return {
        ...state,
        basket: [...state.basket],
      };

    case DECREMENT:
      const minus = state.basket.find((item) => item.id === action.payload.id);
      if (minus && minus.quanity > 1) {
        minus.quanity -= 1;
      }
      return {
        ...state,
        basket: [...state.basket],
      };

    case INPUT_CHANGE:
      const change = state.basket.find((item) => item.id === action.payload.id);
      if (change) {
        change.quanity = action.value;
      }

      return {
        ...state,
        basket: [...state.basket],
      };

    case SET_CART_PRICE:
      return {
        ...state,
        cartPrice: action.payload,
      };

    case SET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };

    default:
      return state;
  }
};

export default user;
