<template>
    
        <v-row>
            <v-col cols="12">
                <h1>Pull Model</h1>
            </v-col>
        </v-row>
        <v-row>
        <v-col cols="6">
            <v-text-field label=""  v-model="modelName" outlined ></v-text-field>
        </v-col>
        <v-col cols="6">
            <v-btn type="button" @click="pullModel()">Save Conversation</v-btn>
        </v-col>
    </v-row>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-table>
                        <thead>
                            <tr>
                                <th class="text-left">Model Name</th>
                                <th class="text-left">Model Size</th>
                                <th class="text-left">Remove Model</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="localModel in localModels.models" :key="localModel.id">
                                <td>{{localModel.name}}</td>
                                <td>{{ localModel.size }}</td>
                                <td>
                                    <v-btn 
                                    type="button"
                                    color="red" 
                                    dark 
                                    icon
                                     @click="removeModel(localModel.name)">
                                     <v-icon>mdi-delete</v-icon>
                                    </v-btn> 
                                </td>
                            </tr>
                        </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import {PullModel,GetModels,DeleteModel} from '../utils/ollamaService.js'

const modelName=shallowRef('')
const isProcessing=shallowRef(false);
const localModels=ref([]);

//add mounted hook
onMounted(async () => {
   await updateModelList();
})


const updateModelList=async()=>{
    const response=await GetModels();
    localModels.value=response.data;
}


const pullModel=async()=>{
    isProcessing.value=true;
    const response=await PullModel(modelName.value)

    
    if(response.error)
    {
        isProcessing.value=false;
        console.log("Error in PullModel")
        console.log(response)
        return;
    }
    else {
    console.log(response)
    }
        
    localModels.value=await GetModels()
}


const removeModel=async(modelName)=>{
    console.log("Remove Model")
    await DeleteModel(modelName)
    await updateModelList();
}
</script>
<style scoped>

</style>