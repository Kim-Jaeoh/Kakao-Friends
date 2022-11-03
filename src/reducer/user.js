export const SET_LOGIN_TOKEN = "SET_LOGIN_TOKEN";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_BASKET = "SET_BASKET";
export const CHECK_ITEM = "CHECK_ITEM";
export const UNCHECK_ITEM = "UNCHECK_ITEM";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const INPUTCHANGE = "INPUTCHANGE";

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
  type: INPUTCHANGE,
  payload: item,
  value: value,
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
    {
      id: "",
      title: "",
      price: "",
      image: "",
      amount: "",
      check: true,
    },
  ],
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
      if (plus && plus.amount < 99) {
        plus.amount += 1;
      }
      return {
        ...state,
        basket: [...state.basket],
      };

    case DECREMENT:
      const minus = state.basket.find((item) => item.id === action.payload.id);
      if (minus && minus.amount > 1) {
        minus.amount -= 1;
      }
      return {
        ...state,
        basket: [...state.basket],
      };

    case INPUTCHANGE:
      const change = state.basket.find((item) => item.id === action.payload.id);
      console.log(change);
      console.log(action.value);
      if (change) {
        change.amount = action.value;
      }

      return {
        ...state,
        basket: [...state.basket],
      };

    default:
      return state;
  }
};

export default user;
