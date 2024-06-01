import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;
const StyledBoong = styled.div`
  width: 800px;
  padding : 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #ccc;
  border-radius: 15px;
`;
const StyledInput = styled.input`
  margin: 5px;
  padding: 10px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  margin: 5px;
  padding: 10px 15px;
  border: 1px solid #5183b973;
  border-radius: 4px;
  background-color: #5183b9;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const StyledSection = styled.div`
  width: 30%;
  background-color: ${(props) => props.bgColor || "#ffffff70"};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const StyledListItem = styled.li`
  background-color: #f9f9f9c0;
  margin: 10px 0;
  padding: 10px;
  /* border: 1px solid #ddd; */
  border-radius: 4px;
`;

const StyledHeader = styled.h3`
  text-align: center;
  color: #fff;
  background-color: ${(props) => props.bgColor || "#333"};
  padding: 10px;
  border-radius: 4px;
`;

const MovieAdd = () => {
  const [title, setTitle] = useState("");
  const [count, setCount] = useState("");
  const [date, setDate] = useState("");

  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const titleInput = (e) => {
    setTitle(e.target.value);
  };

  const countInput = (e) => {
    setCount(e.target.value);
  };

  const dateInput = (e) => {
    setDate(e.target.value);
  };

  const addMovie = (event) => {
    event.preventDefault();
    const newMovie = {
      id: uuidv4(),
      title: title,
      count: count,
      date: date,
      status: "상영 예정",
    };
    setMovies([...movies, newMovie]);
    setTitle("");
    setCount("");
    setDate("");
  };

  const updateMovieStatus = (id, status) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === id ? { ...movie, status: status } : movie
    );
    setMovies(updatedMovies);
  };

  const deleteMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
  };

  return (
    <>
      <StyledForm onSubmit={addMovie}>
        <h1>마곡지점 대국전 포스터관리</h1>
        <StyledBoong>
          <StyledInput
            value={title}
            onChange={titleInput}
            type="text"
            placeholder="영화명을 입력하세요."
          />
          <StyledInput
            value={count}
            onChange={countInput}
            type="text"
            placeholder="매수를 입력하세요."
          />
          <StyledInput
            value={date}
            onChange={dateInput}
            type="text"
            placeholder="개봉일을 입력하세요."
          />
          <StyledButton type="submit">등록</StyledButton>
        </StyledBoong>
      </StyledForm>
      <StyledDiv>
        <StyledSection bgColor="#ffca39">
          <StyledHeader bgColor="#none">상영 예정작</StyledHeader>
          <StyledList>
            {movies
              .filter((movie) => movie.status === "상영 예정")
              .map((movie) => (
                <StyledListItem key={movie.id}>
                  {movie.title} <br />
                  {movie.date} 개봉
                  <br />
                  {movie.count} 장<br />
                  <StyledButton
                    onClick={() => updateMovieStatus(movie.id, "상영중")}
                  >
                    상영중
                  </StyledButton>
                </StyledListItem>
              ))}
          </StyledList>
        </StyledSection>
        <StyledSection bgColor="#28a745">
          <StyledHeader bgColor="#none">상영중</StyledHeader>
          <StyledList>
            {movies
              .filter((movie) => movie.status === "상영중")
              .map((movie) => (
                <StyledListItem key={movie.id}>
                  {movie.title} <br />
                  {movie.date} 개봉
                  <br />
                  {movie.count} 장<br />
                  <StyledButton
                    onClick={() => updateMovieStatus(movie.id, "종영")}
                  >
                    종영
                  </StyledButton>
                </StyledListItem>
              ))}
          </StyledList>
        </StyledSection>
        <StyledSection bgColor="#dc3545">
          <StyledHeader bgColor="#none">종영</StyledHeader>
          <StyledList>
            {movies
              .filter((movie) => movie.status === "종영")
              .map((movie) => (
                <StyledListItem key={movie.id}>
                  {movie.title} <br />
                  {movie.date} 개봉
                  <br />
                  {movie.count} 장<br />
                  <StyledButton
                    onClick={() => updateMovieStatus(movie.id, "상영중")}
                  >
                    상영중
                  </StyledButton>
                  <StyledButton onClick={() => deleteMovie(movie.id)}>
                    삭제
                  </StyledButton>
                </StyledListItem>
              ))}
          </StyledList>
        </StyledSection>
      </StyledDiv>
    </>
  );
};

export default MovieAdd;
