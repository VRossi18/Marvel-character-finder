import axios from 'axios'

const getMembers = async (offset: number) => {
    const characters = axios.get(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=2d94077157eedecd3231dd94483296a0&hash=68c6700606414d5541ba573ea8c3d1d9&limit=5&offset=${offset}`)
    return (await characters).data
}

const getCharacterByName = async (name: string) => {
    const characterByName = axios.get(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&ts=1&apikey=2d94077157eedecd3231dd94483296a0&hash=68c6700606414d5541ba573ea8c3d1d9&limit=5`)
    return (await characterByName).data
}

export default { getMembers, getCharacterByName }