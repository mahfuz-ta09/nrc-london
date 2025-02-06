

const convertFormData = (data:any) => {
    var form_data = new FormData()
    for(var key in data){
        if(key === 'file'){
            console.log(data[key][0])
            if(data[key] && data[key].length > 0)form_data.append(key,data[key][0])
        }else{
            form_data.append(key,data[key])
        }
    }

    return form_data
}

export default convertFormData