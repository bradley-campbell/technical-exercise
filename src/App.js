import React, { useState } from "react";
import WithLodash from "./WithLodash"; // I created a component using Lodash to solve this as well, which works better than my solution
import styled from "styled-components";
function App() {
  const [image, setImage] = useState("");
  const [word, setWord] = useState("");

  let handleFetch = async () => {
    console.log("fetch"); // It seems to render properly but the fetch gets called many times
    const response = await fetch(
      `https://source.unsplash.com/600x300?theme=${word}`
    );
    setImage(response.url);
  };

  const debounce = (fn, delay) => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn();
      }, delay);
    };
  };

  let updateWord = (e) => {
    setWord(e.target.value);
    debouncedFetch();
  };

  const debouncedFetch = debounce(handleFetch, 2000); // I tried using the updateWord as the debounced function but couldn't figure out how to pass e.target.value along with it.

  return (
    <>
      <Wrapper>
        <input onChange={updateWord}></input>
        {image !== "" && <img src={image} alt="random" />}
        <h1>My solution</h1>
      </Wrapper>
      <WithLodash />
    </>
  );
}

export default App;

const Wrapper = styled.div`
  border: solid black 2px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  width: 600px;
  input {
    width: 150px;
    margin-bottom: 15px;
  }
`;
