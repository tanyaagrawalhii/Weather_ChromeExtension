const API_key=`e4f273e6c4c93188f9964501de66d735`
window.onload = function(){
    var startPos;
    var geoSuccess = function(position){
        startPos=position;
    

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${startPos.coords.latitude}&lon=${startPos.coords.longitude}&units=metric&appid=${API_key}`)
        
            .then((data)=> data.json())
            .then((jsondata)=>{
                
                fetch(`https://openweathermap.org/img/wn/${jsondata.weather[0].icon}@2x.png`)
                    .then((res) =>res.blob())
                    .then((result)=>{
                        document.getElementById("text_location").innerHTML = jsondata.name
                        document.getElementById("text_location_country").innerHTML=jsondata.sys.country
                        document.getElementById("text_temp").innerHTML= Math.round(jsondata.main.temp)
                        document.getElementById("text_feelslike").innerHTML= Math.round(jsondata.main.feels_like)
                        document.getElementById("text_desc").innerHTML=jsondata.weather[0].description
                    
                        const imgObjectURL = URL.createObjectURL(result);
                        document.getElementById("icon").src=imgObjectURL
                    })
                
            

            })
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
}

