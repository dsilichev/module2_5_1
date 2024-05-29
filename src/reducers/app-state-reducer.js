export const initialAppState = {
  isLoading: false,
  isUpdating: false,
  isDeleting: false,
};

export const appStateReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case 'SET_ISLOADING': {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case 'SET_ISUPDATING': {
      return {
        ...state,
        isUpdating: action.payload,
      };
    }
    case 'SET_ISDELETING': {
      return {
        ...state,
        isDeleting: action.payload,
      };
    }
    default:
      return state;
  }
};
