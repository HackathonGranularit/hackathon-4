const replyMessage = async (message) =>{
    let response = ""
    let regex = /[A-Z]{3}\s\d{3}\S$/g
        try {
            if (message ==="Hi"){
                response= "Please enter your Number Plate"
            }else if (regex(message)){
                response= "Your amout is "
            }
        }catch(e){
            console.log(e)
        }
    
}
module.exports = replyMessage