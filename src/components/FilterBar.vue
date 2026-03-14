<script setup>
defineProps({
  selectedType: String,
  sortOrder: String,
  types: Array
})

defineEmits(["update:selectedType","update:sortOrder"])
</script>

<template>

<div class="controls">

<select
:value="selectedType"
@change="$emit('update:selectedType',$event.target.value)"
>

<option value="">
Todos los tipos
</option>

<option
v-for="type in types"
:key="type.name"
:value="type.name"
>
{{ type.name }}
</option>

</select>

<select
:value="sortOrder"
@change="$emit('update:sortOrder',$event.target.value)"
>

<option value="asc">
Nombre A-Z
</option>

<option value="desc">
Nombre Z-A
</option>

</select>

</div>

</template>