console.log('client side javascript language')

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
        fetch('http://localhost:4444/weather?search='+location).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    message1.textContent = data.error
                    message2.textContent = ""
                }else{
                    message1.textContent = data.location
                    message2.textContent = data.Data
                    console.log(data.location)
                    console.log(data.Data)
                }
            })
        })
        
            console.log(location)
    }

})