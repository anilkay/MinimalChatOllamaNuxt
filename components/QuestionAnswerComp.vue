<template>
<v-card  v-for="qa in props.questionsAndAnswers" :key="qa.id">
                <v-card-title>      {{qa.question}} </v-card-title>
                                <v-card-text>{{qa.answer}}</v-card-text>
</v-card>
</template>
<script setup >
const props = defineProps({
    questionsAndAnswers: Object,
});
</script>