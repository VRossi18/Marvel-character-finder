import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header'
import Card from './components/card'
import service from './components/service'
import { FaSearch } from 'react-icons/fa'
import { PacmanLoader } from 'react-spinners';
import { css } from '@emotion/react'

function App() {
  const [characters, setCharacters] = useState([])
  const [name, setName] = useState("")
  const [details, setDetails] = useState({name: '', description: '', thumbnail: '', comics: 0})
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(true)
  const override = css`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    position: absolute;
    margin-left: 25%;
  `

  useEffect(() => {
    async function fetchMembers() {
      const response = await service.getMembers(offset)
      setCharacters(response.data.results)
      setLoading(false)
    }

    fetchMembers()
  }, [])

  const changeCharacters = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value
    setName(enteredName)
  }

  const search = async () => {
    const characterByName = await service.getCharacterByName(name)
    setCharacters(characterByName.data.results)
  }

  const setDetailsBoard = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const characterName = event.currentTarget.id
    const details = characters.find((character: any) => character.name === characterName) as any
    console.log(details)
    setDetails({name: details.name, description: details.description, thumbnail: details.thumbnail.path, comics: details.comics.available})
  }

  const setPaginationOffset = async (num: number) => {
    setLoading(true)
    const newOffset = num * 5
    setOffset(newOffset)
    const response = await service.getMembers(offset)
    setCharacters(response.data.results)
    setLoading(false)
  }


  return (
    <div>
      <Header/>
      <div id='search-container'>
        <input id="search-bar" value={name} placeholder="Procure por um nome de personagem" onChange={changeCharacters}/>
        <button onClick={search}><FaSearch/></button>
      </div>
      <div id="main-body">
        <div>
          <PacmanLoader color={'black'} loading={loading} size={150} css={override}/>
        </div>
        <div id="cards">
          {characters.map((character: any) => <div onClick={(event) => setDetailsBoard(event)} id={character.name}>
                                                <Card key={character.id} 
                                                    name={character.name} 
                                                    description={character.description}
                                                    comics={character.comics.available} 
                                                    thumbnail={character.thumbnail?.path + '.' + character.thumbnail?.extension} />
                                              </div>)}
        </div>
        <div id="details">
          <img src={details.thumbnail + '.jpg'}/>
          <div id="details-body">
            <p>{details.name === "" ? "Nome: Clique no herói ao lado" : `Nome: ${details.name}`}</p>
            <p>{details.description === "" ? "Descrição: Não informado": `Descrição: ${details.description}`}</p>
            <p>{details.comics === 0 ? "Aparências nos quadrinhos: 0" : `Aparências nos quadrinhos: ${details.comics}`}</p>
          </div>
        </div>
      </div>
      <footer id="pagination">
        <div onClick={() => setPaginationOffset(1)}>1</div>
        <div onClick={() => setPaginationOffset(2)}>2</div>
        <div onClick={() => setPaginationOffset(3)}>3</div>
        <div onClick={() => setPaginationOffset(4)}>4</div>
        <div onClick={() => setPaginationOffset(5)}>5</div>
        <div onClick={() => setPaginationOffset(6)}>6</div>
        <div onClick={() => setPaginationOffset(7)}>7</div>
        <div onClick={() => setPaginationOffset(8)}>8</div>
        <div onClick={() => setPaginationOffset(9)}>9</div>
        <div onClick={() => setPaginationOffset(10)}>10</div>
        <div onClick={() => setPaginationOffset(11)}>11</div>
        <div onClick={() => setPaginationOffset(12)}>12</div>
        <div onClick={() => setPaginationOffset(13)}>13</div>
        <div onClick={() => setPaginationOffset(14)}>14</div>
        <div onClick={() => setPaginationOffset(15)}>15</div>
        <div onClick={() => setPaginationOffset(16)}>16</div>
        <div onClick={() => setPaginationOffset(17)}>17</div>
        <div onClick={() => setPaginationOffset(18)}>18</div>
      </footer>
    </div>
  );
}

export default App;
