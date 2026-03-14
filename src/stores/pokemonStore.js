import { defineStore } from "pinia"
import { ref } from "vue"

export const usePokemonStore = defineStore("pokemon", () => {

  const favorites = ref(JSON.parse(localStorage.getItem("favorites")) || [])

  const toggleFavorite = (pokemon) => {
    const index = favorites.value.findIndex(p => p.id === pokemon.id)

    if (index === -1) {
      favorites.value.push(pokemon)
    } else {
      favorites.value.splice(index, 1)
    }

    localStorage.setItem("favorites", JSON.stringify(favorites.value))
  }

  const isFavorite = (id) => {
    return favorites.value.some(p => p.id === id)
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite
  }
})