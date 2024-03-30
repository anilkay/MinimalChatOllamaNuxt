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