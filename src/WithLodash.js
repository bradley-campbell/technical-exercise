import { useState } from "react";
import debounce from "lodash/debounce";
import styled from "styled-components";

const WithLodash = () => {
  const [image, setImage] = useState("");
  const [word, setWord] = useState("");

  let handleFetch = async () => {
    console.log(word);
    const response = await fetch(
      `https://source.unsplash.com/600x300?theme=${word}`
    );
    setImage(response.url);
  };

  let updateWord = (e) => {
    setWord(e.target.value);
    handleFetch();
  };

  updateWord = debounce(updateWord, 2000);

  return (
    <Wrapper>
      <input onKeyDown={updateWord}></input>
      {image && <img src={image} alt="random" />}
      <h1>Using Lodash</h1>
    </Wrapper>
  );
};

export default WithLodash;

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
