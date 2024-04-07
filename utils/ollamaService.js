
export async function GetModels(){
    const config = useRuntimeConfig()

    const ollamaEndpoint=config.public.API_BASE_URL
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
    const config = useRuntimeConfig()
    const ollamaEndpoint=config.public.API_BASE_URL

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