
const getDiv = document.querySelector('#pokemonList')

const btnLoadMore = document.querySelector("#btn-loadMore")
let offset = 0
let limit = 10

pokeApi.getPokemons().then(pokemon =>{
    pokemon.map((element) => getDiv.innerHTML += CreateCard(element))
})
pokeApi.getModalStats().then(pokemon =>{
    pokemon.map((element)=> getDiv.innerHTML += CardModal(element))
})


btnLoadMore.addEventListener('click',()=>{
    offset += limit
    pokeApi.getPokemons(offset,limit).then(pokemon => pokemon.map((element) => getDiv.innerHTML += CreateCard(element))
    )
    pokeApi.getModalStats(offset,limit).then(pokemon =>{
        pokemon.map((element)=> getDiv.innerHTML += CardModal(element))
    })
 
})


function CreateCard(poke){
    return `
            <li type="button" class="pokeCard ${poke.type} data-bs-toggle" data-bs-toggle="modal" data-bs-target="#staticBackdrop${poke.order}">
            <div class="cardNamePoke">
                
            <h5>#${poke.order} ${poke.name}</h5>

            
            
            </div>

            <img class="imgPoke" src="${poke.img_card}" alt="" srcset="">
        
            <div class="sectionContentType">
                <p>Types</p>
                <ol class="contentType">
                ${TypeContent(poke.types)}
                </ol>
            </div>
            </li>

    
    `


}
function CardModal(poke){
    return `
    <div class="modal fade " id="staticBackdrop${poke.order}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog   ">
        <div class="modal-content ">
            <div class="modal-header ${poke.type}">
                <div class ="modeal-header-text">
                <div class="card-type  card-type-${poke.type}"></div>
                
                </div>
            
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
           
            </div>
            <div class="modal-body card_poke_model">

            <div class="card_poke_model_top">
            <img class="imgPoke" src="${poke.img_model}" alt="" srcset="">


            <div class="card_poke_model_txt">
            <h3 class="text_name_modal">${poke.order}°  ${poke.name}</h3>
            <ol class='ol_diameter_modal'>
                    <li class="btn btn-outline-dark">Height: <strong >${poke.height}</strong></li>
                    <li class="btn btn-outline-dark">Weight: <strong >${poke.weight}</strong></li>
            </ol>
                <div class="div_abilities_modal">
                        <h3 class="p_abilities"> Abilities:</h3>
                        <ol class="ol_abilities_modal">
                    
                        ${AbilitiesContent(poke.abilities)}
                        </ol>
                </div>

            </div>
            </div>
            <div>
            <ol class='ol_stats_modal'>
            ${StatsContent(poke.stats)}
            </ol></div>
            
            
            </div>
            <div class="modal-footer">
     
            
            </div>
        </div>
     
        </div>
    </div>
    `
}


function TypeContent(type =[]){
    return type.map(types => `<li class="card-type card-type-${types} "> </li>`).join(' ')

}
function StatsContent(stats =[]){
    return stats.map(stats=>`<li>  
      <p>${stats.name}:</p>   
      <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: ${stats.base_stats}%;" aria-valuenow="${stats.base_stats}" aria-valuemin="0" aria-valuemax="200">${stats.base_stats}</div>
    </div>
</li>`).join('')
}
function AbilitiesContent(abilities=[]){
    return abilities.map(abilities =>`
    <li class="btn btn-outline-dark">${abilities.name}</li>
    `).join('')
}



