import { 
  FETCH_CARDS_SUCCESS, FETCH_CARDS_LOADING, FETCH_CARDS_ERROR,
  FETCH_CARD_SUCCESS, FETCH_CARD_LOADING, FETCH_CARD_ERROR
} from 'dokkin/js/card/card-action-types'

export function fetchCards(query) {
  return (dispatch) => {
    dispatch(fetchCardsLoading(query));
    fetch(`/api/cards?search_q=${query}`)
      .then((response) => response.json())
      .then((responseBody) => {
        dispatch(fetchCardsSuccess(responseBody.cards));
      })
      .catch((error) => {
        dispatch(fetchCardsError(error))
      });
  }
}

export function fetchCard(id) {
  return (dispatch) => {
    dispatch(fetchCardLoading(id));
    fetch(`/api/cards/${id}`)
      .then((response) => response.json())
      .then((responseBody) => {
        dispatch(fetchCardSuccess(responseBody));
      })
      .catch((error) => {
        dispatch(fetchCardsError(error))
      });
  }
}

export function fetchCardsSuccess(cardsList) {
  return {
    type: FETCH_CARDS_SUCCESS,
    cardsList
  }
}

export function fetchCardsLoading(query) {
  return {
    type: FETCH_CARDS_LOADING,
    query
  }
}

export function fetchCardsError(error) {
  return {
    type: FETCH_CARDS_ERROR,
    error
  }
}

export function fetchCardSuccess(card) {
  return {
    type: FETCH_CARD_SUCCESS,
    card
  }
}

export function fetchCardLoading(id) {
  return {
    type: FETCH_CARD_LOADING,
    id
  }
}

export function fetchCardError(error) {
  return {
    type: FETCH_CARD_ERROR,
    error
  }
}