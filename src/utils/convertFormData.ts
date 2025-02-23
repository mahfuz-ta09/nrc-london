

const convertFormData = (data:any) => {
    var form_data = new FormData()
    for(var key in data){
        if(key === 'file'){
            form_data.append(key,data[key][0])
        }else{
            form_data.append(key,data[key])
        }
    }

    return form_data
}

export default convertFormData