import { FETCH_CARDS_SUCCESS } from './card-action-types';

export function fetchCardsSuccess(cards) {
  return {
    type: FETCH_CARDS_SUCCESS,
    cards
  }
}

export function fetchCards(name) {
  return (dispatch) => {
    fetch('/api/cards?name=' + name)
      .then((response) => response.json())
      .then((responseBody) => {
        dispatch(fetchCardsSuccess(responseBody.cards));
      })
  }
}