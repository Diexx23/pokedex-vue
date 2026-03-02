<script setup>
import { ref, onMounted, computed } from "vue"

const pokemonList = ref([])
const search = ref("")

onMounted(async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
  const data = await response.json()

  const detailedPokemon = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url)
      return await res.json()
    })
  )

  pokemonList.value = detailedPokemon
})

// 🔎 Filtrado dinámico
const filteredPokemon = computed(() => {
  return pokemonList.value.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<template>
  <div>
    <!-- Buscador -->
    <input 
      v-model="search" 
      type="text" 
      placeholder="Buscar Pokémon..."
      class="search"
    />

    <!-- Grid -->
    <div class="grid">
      <div 
        v-for="pokemon in filteredPokemon" 
        :key="pokemon.id" 
        class="card"
        @click="$router.push(`/pokemon/${pokemon.name}`)"
      >
        <img :src="pokemon.sprites.other['official-artwork'].front_default" />
        <h3>{{ pokemon.name }}</h3>
      </div>
    </div>
  </div>
</template>

<style>
.search {
  margin: 20px;
  padding: 10px 15px;
  width: 250px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.grid {
  display: grid;
  gap: 20px;
  padding: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.card {
  background: #f2f2f2;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  text-transform: capitalize;
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card:hover {
  transform: scale(1.05);
}

.card img {
  width: 100%;
  max-width: 150px;
  height: auto;
  object-fit: contain;
}
</style>