const axios = require('axios');

const wabaPhoneId = '110400311680161'
const faceBookAccessToken = 'EAAIEfrPBqW4BABP5BoHZBoZB1xYiPOWOnxyKNRgO9SSH9AsXq3nvgb111GUShO9uHEFC6fIy74dPV030AC6gzHhyFGCtMNvncsybczXnwQAd186lUaaQuKYQWuRiRNENR5WLS4YdsuHI3jfO4RJYjS0N5tIuA5ZCcJy3k1sbXlctZCrN7cyq'

const sendMessage = (body) => {
    const url = `https://graph.facebook.com/v13.0/${wabaPhoneId}/messages`
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${faceBookAccessToken}`
    }
    axios.post(
        url,
        body,
        {
            headers:headers
        }
    ).catch(
        (e) => {
            console.log(e.response)
        }
    )
}
module.exports = {
    sendMessage 
}
