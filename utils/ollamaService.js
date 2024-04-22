
export async function GetModels(){

    const ollamaEndpoint=GetApiEndpoint();

    const GetModelsFullUrl=ollamaEndpoint+"/api/tags";
    try {

  
    const data=await $fetch(GetModelsFullUrl,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        },
    });
    return {data: data,error:false};
}
 catch(e){
    return {data: e,error:true}; 
 }
}

export async function MakeChatRequest(modelName,chatMessages){
    const ollamaEndpoint=GetApiEndpoint();

    const messages=chatMessages.map((message)=>{return {role:"user",content:message}});
    const MakeChatRequestFullUrl=ollamaEndpoint+"/api/chat";
    try {

   
    const data=await $fetch(MakeChatRequestFullUrl,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({model:modelName,stream:false,messages:[...messages]}),
    });
    return {data: data,error:false};

    }
    catch(e){
        return {data: e,error:true};
    }
}

export async function PullModel(modelName)
{
    const ollamaEndpoint=GetApiEndpoint();

    const PullModelFullUrl=ollamaEndpoint+"/api/pull";
    try {

   
    const data=await $fetch(PullModelFullUrl,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({model:modelName,stream:false}),
    });
    return {data: data,error:false};

    }
    catch(e){
        return {data: e,error:true};
    }

}


export async function DeleteModel(modelName){
    const ollamaEndpoint=GetApiEndpoint();

    const DeleteModelFullUrl=ollamaEndpoint+"/api/delete";
    try {

   
    const data=await $fetch(DeleteModelFullUrl,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({name:modelName}),
    });
    return {data: data,error:false};

    }
    catch(e){
        return {data: e,error:true};
    }

}


function GetApiEndpoint(){
    const config = useRuntimeConfig()
    console.log(config.public.API_BASE_URL);
    if (config.public.API_BASE_URL === undefined) {
       return "http://localhost:11434"
    }
    return config.public.API_BASE_URL
}