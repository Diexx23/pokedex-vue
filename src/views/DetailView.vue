<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const pokemon = ref(null)

onMounted(async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)
  pokemon.value = await response.json()
})
</script>

<template>
  <div v-if="pokemon" class="detail">
    <button @click="$router.back()">⬅ Volver</button>

    <h1>{{ pokemon.name }}</h1>

    <img :src="pokemon.sprites.other['official-artwork'].front_default" />

    <div class="info">
      <p><strong>Altura:</strong> {{ pokemon.height }}</p>
      <p><strong>Peso:</strong> {{ pokemon.weight }}</p>
      <p><strong>Experiencia base:</strong> {{ pokemon.base_experience }}</p>

      <div class="types">
        <span 
          v-for="type in pokemon.types" 
          :key="type.type.name"
          class="type"
        >
          {{ type.type.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style>
.detail {
  text-align: center;
  padding: 20px;
}

img {
  width: 250px;
  margin: 20px 0;
}

.info {
  max-width: 400px;
  margin: auto;
}

.types {
  margin-top: 15px;
}

.type {
  display: inline-block;
  background: #eee;
  padding: 5px 10px;
  border-radius: 10px;
  margin: 5px;
  text-transform: capitalize;
}
</style>