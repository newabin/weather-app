const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event)=>{

    event.preventDefault()
    
    const location = search.value
    message1.textContent = "Loading..."
    message2.textContent = ""

    if(location.length === 0){
        message1.textContent = "Please Enter the Address"
        message2.textContent = ""
    }else{
        fetch('/weather?search='+location).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    message1.textContent = data.error
                    message2.textContent = ""
                }else{
                    message1.textContent = data.location
                    message2.textContent = data.forcastData
                }
            })
        })
        
            console.log(location)
    }

})

document.querySelector('#show-mylocation').addEventListener('click', ()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported in your browser!')
    }
    message1.textContent = "Loading..."
    message2.textContent = ""

    navigator.geolocation.getCurrentPosition((position)=>{
        fetch('/myweather?latitude='+position.coords.latitude+'&longitude='+position.coords.longitude).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    message1.textContent = data.error
                    message2.textContent = ""
                }else{
                    message1.textContent = data.address
                    message2.textContent = data.forcastData
                }
            })
        })

    })

})