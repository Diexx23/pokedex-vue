<script setup>
import { ref, onMounted, computed } from "vue"
import { usePokemonStore } from "../stores/pokemonStore"

import PokemonCard from "../components/PokemonCard.vue"
import SearchBar from "../components/SearchBar.vue"
import FilterBar from "../components/FilterBar.vue"

const pokemonList = ref([])
const search = ref("")
const selectedType = ref("")
const sortOrder = ref("asc")
const loading = ref(true)
const types = ref([])

const store = usePokemonStore()

const typeColors = {
  normal:"#A8A77A",
  fire:"#EE8130",
  water:"#6390F0",
  electric:"#F7D02C",
  grass:"#7AC74C",
  ice:"#96D9D6",
  fighting:"#C22E28",
  poison:"#A33EA1",
  ground:"#E2BF65",
  flying:"#A98FF3",
  psychic:"#F95587",
  bug:"#A6B91A",
  rock:"#B6A136",
  ghost:"#735797",
  dragon:"#6F35FC",
  dark:"#705746",
  steel:"#B7B7CE",
  fairy:"#D685AD"
}

onMounted(async () => {

  loading.value = true

  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  const data = await response.json()

  const detailedPokemon = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url)
      return await res.json()
    })
  )

  pokemonList.value = detailedPokemon

  const typeResponse = await fetch("https://pokeapi.co/api/v2/type")
  const typeData = await typeResponse.json()

  types.value = typeData.results

  loading.value = false

})

const filteredPokemon = computed(() => {

  let list = [...pokemonList.value]

  if (search.value) {
    list = list.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  if (selectedType.value) {
    list = list.filter(pokemon =>
      pokemon.types.some(t => t.type.name === selectedType.value)
    )
  }

  list.sort((a,b)=>{
    if(sortOrder.value==="asc"){
      return a.name.localeCompare(b.name)
    }else{
      return b.name.localeCompare(a.name)
    }
  })

  return list

})

const toggleFavorite = (pokemon)=>{
  store.toggleFavorite(pokemon)
}

const isFavorite = (id)=>{
  return store.isFavorite(id)
}
</script>

<template>

<div>

<h1 class="title">Pokédex</h1>

<SearchBar
:search="search"
@update:search="search = $event"
/>

<FilterBar
:selectedType="selectedType"
:sortOrder="sortOrder"
:types="types"
@update:selectedType="selectedType = $event"
@update:sortOrder="sortOrder = $event"
/>

<div v-if="loading" class="message">
Cargando Pokémon...
</div>

<div v-else-if="filteredPokemon.length === 0" class="message">
No se encontraron Pokémon
</div>

<div v-else class="grid">

<PokemonCard
v-for="pokemon in filteredPokemon"
:key="pokemon.id"
:pokemon="pokemon"
:typeColors="typeColors"
:isFavorite="isFavorite"
:toggleFavorite="toggleFavorite"
/>

</div>

</div>

</template>

<style>
.grid{
display:grid;
gap:22px;
padding:20px;
grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
max-width:1200px;
margin:auto;
}

.card{
background:#1c1c1c;
padding:18px;
border-radius:14px;
text-align:center;
text-transform:capitalize;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
border:2px solid #c1121f;
box-shadow:
0 0 8px rgba(255,0,0,0.6),
inset 0 0 6px rgba(255,255,255,0.1);
transition:all 0.25s ease;
}

.card:hover{
transform:translateY(-5px) scale(1.02);
box-shadow:
0 0 15px rgba(255,0,0,0.9),
inset 0 0 10px rgba(255,255,255,0.2);
}

.card img{
width:110px;
height:110px;
object-fit:contain;
margin-bottom:8px;
filter:drop-shadow(0 0 4px rgba(255,255,255,0.4));
}

.card h3{
margin:5px 0;
font-size:18px;
letter-spacing:1px;
}

.types{
display:flex;
gap:6px;
margin-top:6px;
flex-wrap:wrap;
justify-content:center;
}

.type-badge{
padding:4px 10px;
border-radius:14px;
font-size:11px;
color:white;
font-weight:bold;
text-transform:uppercase;
box-shadow:0 0 4px rgba(0,0,0,0.4);
}

.fav{
margin-top:10px;
font-size:22px;
background:none;
border:none;
cursor:pointer;
color:#ffd60a;
transition:transform 0.2s;
}

.fav:hover{
transform:scale(1.2);
}

.title{
text-align:center;
font-size:42px;
letter-spacing:3px;
margin-top:10px;
color:white;
text-shadow:
0 0 8px red,
0 0 20px darkred;
}
</style>