import React, { useEffect } from "react";
import styled from "styled-components";
import { arrayShuffle } from "@adriantombu/array-shuffle";
import { useImmerReducer } from "use-immer";

import img1 from "./img/img1.jpg";
import img2 from "./img/img2.jpg";
import img3 from "./img/img4.jpg";
import img4 from "./img/img6.jpg";
import img5 from "./img/img7.jpg";
import img6 from "./img/img8.jpg";

import Card from "./Card";

const cards = arrayShuffle([
  { id: 0, img: img1, isHidden: true, picked: false },
  { id: 0, img: img1, isHidden: true, picked: false },
  { id: 1, img: img2, isHidden: true, picked: false },
  { id: 1, img: img2, isHidden: true, picked: false },
  { id: 2, img: img3, isHidden: true, picked: false },
  { id: 2, img: img3, isHidden: true, picked: false },
  { id: 3, img: img4, isHidden: true, picked: false },
  { id: 3, img: img4, isHidden: true, picked: false },
  { id: 4, img: img5, isHidden: true, picked: false },
  { id: 4, img: img5, isHidden: true, picked: false },
  { id: 5, img: img6, isHidden: true, picked: false },
  { id: 5, img: img6, isHidden: true, picked: false }
]);

const initialState = {
  boardLocked: false,
  key1: null,
  key2: null,
  cards
};

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "pick":
      if (
        state.boardLocked ||
        state.cards[action.key].picked ||
        action.key === state.key1
      ) {
        return state;
      }
      if (state.key1 === null) {
        state.cards[action.key].isHidden = false;
        state.key1 = action.key;
        return state;
      } else {
        state.cards[action.key].isHidden = false;
        state.boardLocked = true;
        state.key2 = action.key;
        return state;
      }
    case "return":
      if (state.cards[state.key1].id === state.cards[state.key2].id) {
        state.cards[state.key1].picked = true;
        state.cards[state.key2].picked = true;
      } else {
        state.cards[state.key1].isHidden = true;
        state.cards[state.key2].isHidden = true;
      }
      state.boardLocked = false;
      state.key1 = null;
      state.key2 = null;
      return state;
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
}

function App() {
  const [{ key2, cards, boardLocked }, dispatch] = useImmerReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (key2 !== null) setTimeout(() => dispatch({ type: "return" }), 1000);
  }, [dispatch, key2]);

  if (cards.every(({ picked }) => picked)) {
    return (
      <div>
        <Text>Feliz Aniversario, baby! 😘</Text>
        <Button onClick={() => dispatch({ type: "reset" })}>GO AGAIN !</Button>
      </div>
    );
  }
  return (
    <Grid>
      {cards.map(({ id, img, isHidden }, key) => (
        <Card
          key={key}
          src={img}
          id={id}
          hideCursor={boardLocked}
          isHidden={isHidden}
          onClick={() => dispatch({ type: "pick", id, key })}
        />
      ))}
    </Grid>
  );
}

const Button = styled.button`
  width: 100px;
  margin-top: 25px;
  margin-left: 20px;
  cursor: pointer;
`;

const Text = styled.div`
  margin: 0 auto;
  margin-top: 70px;
  margin-left: 15px;
  margin-right: 10px;
  font-weight: 600;
  font-size: 10vh;
`;

const Grid = styled.div`
  max-width: 1000px;
  margin: auto 0;
  display: grid;
  padding: 20px;
  grid-template-columns: auto auto auto auto;
  grid-auto-flow: dense;
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  @media screen and (max-width: 500px) {
    grid-template-columns: auto auto;
  }
`;

export default App;
