<template>
<v-container>
    <v-row>
        <v-col cols="12">
            <h1>Chat</h1>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="12">
        <v-autocomplete
    v-model="selectedModel"
  label="Model Seçin"
  :items="modelListed">
</v-autocomplete>
</v-col>
    </v-row>
    
    <v-row>
        <v-col cols="12">
            <v-card  v-for="qa in questionsAndAnswers" :key="qa.id">
                <v-card-title>      {{qa.question}} </v-card-title>
                                <v-card-text>{{qa.answer}}</v-card-text>
            </v-card>
        </v-col>
    </v-row>
    
    <v-form ref="form" @submit.prevent="handleSubmit">

    <v-row>
        <v-col cols="10">
        <v-textarea v-model="prompt" label="Write Your Prompt here"></v-textarea>
        </v-col>
        <v-col cols="2">
        <v-btn type="submit">Submit</v-btn>
        </v-col>
    </v-row>
    
    </v-form>
</v-container>
</template>
<script setup>
import { computed } from 'vue';
import {GetModels,MakeChatRequest} from '../utils/ollamaService.ts'

const prompt=shallowRef('')
const questionsAndAnswers=ref([])
const localModels=[];
const selectedModel=ref('');


const response=await GetModels();
localModels.value=response.data;

const modelListed= computed(() => {
    return localModels.value.models.map((model) => {
        return model.name;
    });
});


async function handleSubmit() {
    console.log('submit');
    console.log(prompt.value);
    let chatResponse=await MakeChatRequest(selectedModel.value,prompt.value)
    console.log(chatResponse);
    let content=chatResponse.data.message.content

    questionsAndAnswers.value.push({question:prompt.value,answer:content,id:questionsAndAnswers.value.length+1});
    prompt.value='';
}


</script>
