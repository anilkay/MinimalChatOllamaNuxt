const ollamaEndpoint="http://localhost:11434";

export async function GetModels(){
    const GetModelsFullUrl=ollamaEndpoint+"/api/tags";
    const {data,pending,error,status}=await useFetch(GetModelsFullUrl,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        },
    });
    return {data: data.value,pending:pending.value,error:error.value,status:status.value};
}

export async function MakeChatRequest(modelName,chatMessages){
    const messages=chatMessages.map((message)=>{return {role:"user",content:message}});
    const MakeChatRequestFullUrl=ollamaEndpoint+"/api/chat";
    const {data,pending,error,status}=await useFetch(MakeChatRequestFullUrl,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({model:modelName,stream:false,messages:[...messages]}),
    });
    return {data: data.value,pending:pending.value,error:error.value,status:status.value};
}