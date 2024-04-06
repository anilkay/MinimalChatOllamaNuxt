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
            <question-answer-comp :questionsAndAnswers="questionsAndAnswers">

            </question-answer-comp>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="12">
            <v-btn type="button" @click="saveQuestionAndAnswers()">Save Conversation</v-btn>
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
import {GetModels,MakeChatRequest} from '../utils/ollamaService.js'

const prompt=shallowRef('')
const questionsAndAnswers=ref([])
const localModels=[];
const selectedModel=ref('');
let  messages=[];

 watch(selectedModel, (value) => {
    questionsAndAnswers.value=[];
    messages=[];
  });


const response=await GetModels();
localModels.value=response.data;

const modelListed= computed(() => {
    return localModels.value.models.map((model) => {
        return model.name;
    });
});

async function saveQuestionAndAnswers(){
    console.log(questionsAndAnswers.value);
    //Download the file as json
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(questionsAndAnswers.value)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = "questionsAndAnswers.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    
}

async function handleSubmit() {
    console.log('submit');
    console.log(prompt.value);
    messages.push(prompt.value);
    let chatResponse=await MakeChatRequest(selectedModel.value,messages)
    console.log(chatResponse);
    let content=chatResponse.data.message.content

    questionsAndAnswers.value.push({question:prompt.value,answer:content,id:questionsAndAnswers.value.length+1});
    prompt.value='';
}


</script>
