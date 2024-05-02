import './index.scss';

export default function Pokemon(props) {

    let typesArray = props.pokeInfo.types; 
    let tipos = typesArray[0].type.name;

    for(let i = 1; i < typesArray.length; i++)
    {
        tipos = tipos + ', ' + typesArray[i].type.name;
    }

    let nomePokemon = props.pokeInfo.name;
    let imgPokemon = props.shinyPokemon ? 
                     props.pokeInfo.sprites.other['official-artwork'].front_shiny :
                     props.pokeInfo.sprites.other['official-artwork'].front_default;

    let display = nomePokemon.includes(props.nomeFiltro.toLowerCase()) ? 'show' : 'notShow'; 
    let displayShiny = props.shinyPokemon && 'shiny'; 

    return(
        <div className={`container-pokemon ${display} ${displayShiny}`}>
            <img src={imgPokemon} alt={`Imagem do ${nomePokemon}`}  />
            <h3>{nomePokemon}</h3>
            <h3 className="h3-shiny">shiny</h3>
            <h4>{tipos}</h4>
        </div>
    )
}