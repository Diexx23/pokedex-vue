<script setup>
defineProps({
  pokemon: Object,
  typeColors: Object,
  isFavorite: Function,
  toggleFavorite: Function
})
</script>

<template>

<div
class="card"
@click="$router.push(`/pokemon/${pokemon.name}`)"
>

<img :src="pokemon.sprites.other['official-artwork'].front_default" />

<h3>{{ pokemon.name }}</h3>

<div class="types">

<span
v-for="type in pokemon.types"
:key="type.type.name"
class="type-badge"
:style="{ background: typeColors[type.type.name] }"
>

{{ type.type.name }}

</span>

</div>

<button
class="fav"
@click.stop="toggleFavorite(pokemon)"
>

{{ isFavorite(pokemon.id) ? "★" : "☆" }}

</button>

</div>

</template>