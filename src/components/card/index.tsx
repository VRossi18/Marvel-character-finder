import './styles.css'

type CardProps = {
    name: string
    thumbnail: string
    description: string
    comics: number
}

export default ({name, thumbnail, description, comics}: CardProps) => {
    return (
        <div id="card">
            <img src={thumbnail}/>
            <label>{name}</label>
        </div>
    )    
}