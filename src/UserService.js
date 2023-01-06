export async function getAllUsers(){
    try{
        const response = await fetch('https://reqres.in/api/users');
        // console.log(response);
        return await response.json();
    }catch(error){
        return [];
    }
}

export async function getSingleUser(id){
    try{
        const response = await fetch('https://reqres.in/api/users/'+id);
        // console.log(response);
        return await response.json();
    }catch(error){
        return [];
    }
}