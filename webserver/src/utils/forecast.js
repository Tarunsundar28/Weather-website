const request=require('request')
const forecast=(latitude,longitude,callback)=>{
const url="http://api.weatherstack.com/current?access_key=3b2fa5554171242139e1db928474c7cc&query="+latitude+","+longitude
request({url,json:true},(err,{body})=>{
    if(err){
    callback('unable to connect the internet',undefined)
    }else if(body.err){
    callback('unable to reach the loaction',undefined)
    }else{
       callback(undefined," The temperature is :"+body.current.temperature)
    }
})
}
module.exports=forecast