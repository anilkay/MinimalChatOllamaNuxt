<template>
    <NuxtLink to="/chat">Chat</NuxtLink>
    <p>{{generatedNanoid}}</p>
</template>
<script lang="ts" setup>
const generatedNanoid=ref<string>()
import {nanoid,customAlphabet} from 'nanoid'

//const nanoid2=customAlphabet('147',10)
generatedNanoid.value=nanoid(10)
//generatedNanoid.value= nanoid2(4)
//Custom Alphabet works just fine.


</script>