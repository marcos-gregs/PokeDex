const pokeApi = {}
function ConvertCard(element){
    let CardPoke = new BioPoke();
    CardPoke.name = element.name
    CardPoke.order = element.id
    CardPoke.img_card = element.sprites.front_default
    CardPoke.img_model = element.sprites.other.home.front_default
    let types = element.types.map(element => element.type.name)
    let [type] = types
    CardPoke.types = types
    CardPoke.type = type
   
    
    return CardPoke
}
function ModalCard(element){
    let CardPoke = new ModalPoke();
    // Filtro de determinados dados.
    let types = element.types.map(element => element.type.name)
    let [type] = types
    let moves  =  element.abilities.map(element=>{
       let abilitePoke = {name: element.ability.name}
       return abilitePoke
    })
    let stats = element.stats.map(element=>{
        let StatsPoke = {name:element.stat.name,base_stats:element.base_stat}
        return StatsPoke
    })
    CardPoke.name = element.name
    CardPoke.order = element.id
    CardPoke.img_model = element.sprites.other.home.front_default
    CardPoke.height = element.height
    CardPoke.weight = element.weight
    CardPoke.types = types
    CardPoke.type = type
    
    CardPoke.abilities = moves
    CardPoke.stats = stats
   
    console.log(CardPoke)
    return CardPoke
}


pokeApi.getPokemonDetails = (element) =>{    
    return fetch(element.url).then(res => res.json()).then(ConvertCard)
} 
pokeApi.getPokemonStats = (element) =>{    
    return fetch(element.url).then(res => res.json()).then(ModalCard)
} 


pokeApi.getPokemons = (offset = 0,limit = 10)=>{ 
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then(res => res.json())
    .then(res => res.results)
    .then(pokemon => pokemon.map(pokeApi.getPokemonDetails))
    .then(req => Promise.all(req))
    .then(pokeDetail =>    pokeDetail   )
    .catch(error => console.log(error))
}
pokeApi.getModalStats = (offset = 0,limit = 10)=>{ 
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then(res => res.json())
    .then(res => res.results)
    .then(pokemon => pokemon.map(pokeApi.getPokemonStats))
    .then(req => Promise.all(req))
    .then(pokeStats =>    pokeStats )
    .catch(error => console.log(error))
}




