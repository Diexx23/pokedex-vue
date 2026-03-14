<script setup>
defineProps({
  search: String
})

defineEmits(["update:search"])
</script>

<template>

<input
:value="search"
@input="$emit('update:search', $event.target.value)"
type="text"
placeholder="Buscar Pokémon..."
class="search"
/>

</template>