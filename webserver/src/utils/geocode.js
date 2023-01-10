const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGFydW5zdW5kYXIiLCJhIjoiY2xjaGh3M2p3MGJmbTNucDU2Z25xdmtjeSJ9.wEFiTDi65dTIU8XVLCRzrw&limit=1'
   request({url,json:true},(err,{body})=>{
     if(err){
         callback('no internet connection',undefined)
     }else if(body.features.length==0){
         callback('unable to find the location',undefined)
     }else{
         const latitude=body.features[0].center[1];
          const longitude=body.features[0].center[0];
          const location=body.features[0].place_name
         callback(undefined,{
             latitude,
             longitude,
             location
         }
             )
     }
   })
 }
 module.exports=geocode