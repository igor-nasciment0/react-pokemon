import { useState } from 'react';
import './App.scss';
import axios from 'axios';
import Pokemon from './components/pokemon';

export default function PaginaPokemon() {

    const [listaPokemons, setListaPokemons] = useState([]);
    const [url, setUrl] = useState('');
    const [pagina, setPagina] = useState(0);
    const [nomeFiltro, setNomeFiltro] = useState('');

    const [buscando, setBuscando] = useState(false);

    async function buscarPokemons() {
        try {
            setBuscando(true);

            let apiCall = url === '' ?
                'https://pokeapi.co/api/v2/pokemon/' :
                url;

            let resposta = await axios.get(apiCall);
            setUrl(resposta.data.next);

            let respostaArray = resposta.data.results;
            let newLista = [];

            for (let i = 0; i < respostaArray.length; i++) {
                let item = respostaArray[i];

                let pokemonObjectInfo = await axios.get(item.url);
                newLista.push(pokemonObjectInfo.data);
            }

            setListaPokemons([...listaPokemons, ...newLista]);
            setPagina(pagina + 1);

            setBuscando(false);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="pagina-pokemon">
            <img src="/logoPokedex.png" alt="" />

            <input type="text" placeholder="Filtrar pokémons encontrados" value={nomeFiltro} onChange={e => setNomeFiltro(e.target.value)} />

            <section className='lista-pokemons'>
                {listaPokemons.map(item =>
                    <Pokemon pokeInfo={item}
                        nomeFiltro={nomeFiltro}
                        shinyPokemon={(Math.random() * 25).toFixed() == 1}
                    />
                )}
            </section>

            <h3>Página {pagina}</h3>
            <h4>Pokedex No.{pagina > 0 ? 1 : 0} - No.{20 * pagina}</h4>
            <button disabled={buscando} onClick={buscarPokemons}>{!buscando ? "Encontrar Pokémons" : <img src="/assets/images/rolling.gif" alt="" />}</button>
        </div>
    )
}