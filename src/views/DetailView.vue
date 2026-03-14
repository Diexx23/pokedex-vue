<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

const pokemon = ref(null)
const loading = ref(true)

const statWidth = (value) => {
  const max = 255
  return (value / max) * 100 + "%"
}

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
}

onMounted(async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)
  pokemon.value = await response.json()
  loading.value = false
})
</script>

<template>

<div v-if="loading" class="text-center text-xl mt-20">
Cargando Pokémon...
</div>

<div v-else class="max-w-5xl mx-auto mt-10 bg-[#1c1c1c] border-4 border-red-700 rounded-2xl shadow-2xl p-8">

<button
@click="router.back()"
class="mb-6 bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg font-bold"
>
← Volver
</button>

<div class="grid md:grid-cols-2 gap-10">

<div class="flex flex-col items-center">

<div class="bg-black rounded-xl p-8 shadow-inner">
<img
:src="pokemon.sprites.other['official-artwork'].front_default"
class="w-72 h-72 object-contain"
/>
</div>

<h1 class="text-4xl font-bold capitalize mt-6">
#{{ pokemon.id }} {{ pokemon.name }}
</h1>

<div class="flex gap-2 mt-4">
<span
v-for="type in pokemon.types"
:key="type.type.name"
class="px-4 py-1 rounded-full text-sm font-bold text-white"
:style="{ background: typeColors[type.type.name] }"
>
{{ type.type.name }}
</span>
</div>

</div>

<div>

<h2 class="text-2xl font-bold text-red-400 mb-4">
Datos de Pokédex
</h2>

<div class="space-y-3 text-lg">

<p>
<strong>Altura:</strong>
{{ pokemon.height / 10 }} m
</p>

<p>
<strong>Peso:</strong>
{{ pokemon.weight / 10 }} kg
</p>

<p>
<strong>Experiencia base:</strong>
{{ pokemon.base_experience }}
</p>

</div>

<h2 class="text-2xl font-bold text-red-400 mt-8 mb-4">
Estadísticas
</h2>

<div
v-for="stat in pokemon.stats"
:key="stat.stat.name"
class="mb-4"
>

<div class="flex justify-between text-sm capitalize mb-1">
<span>{{ stat.stat.name }}</span>
<span>{{ stat.base_stat }}</span>
</div>

<div class="w-full bg-gray-700 rounded-full h-3">

<div
class="bg-red-500 h-3 rounded-full"
:style="{ width: statWidth(stat.base_stat) }"
></div>

</div>

</div>

</div>

</div>

</div>

</template>