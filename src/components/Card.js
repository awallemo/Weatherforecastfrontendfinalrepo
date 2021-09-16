import {Card} from "react-bootstrap"
import {TiWeatherShower,TiWeatherCloudy, TiWeatherSunny} from "react-icons/ti"
import {useState, useEffect} from "react";


function TempCard(props){

    

    const [rain, setRain] = useState(true)
    const [clouds,setClouds] = useState(false)
    const [sunny,setSunny] = useState(false)
    


    function chooseWeather(weather){
        if (weather === "Rain"){
            setRain(true)
            setClouds(false)
            setSunny(false)
            return weather           
        }else if(weather === "Clouds"){
            setRain(false)
            setClouds(true)
            setSunny(false)
            return weather  
        }else if(weather ==="Clear"){
            setRain(false)
            setClouds(false)
            setSunny(true)
            return weather  
        }else{
            return ""
        }
    }

    useEffect(() => {
        chooseWeather(props.condition)
        // eslint-disable-next-line
    }, []);
    return(
        <Card>
            <Card.Body>
                <Card.Title>
                    {props.day}
                </Card.Title>
                
                <Card.Subtitle>
                    {props.date.toString()}             
                    
                </Card.Subtitle>
                <br></br>
                <Card.Title>
                    {
                        rain ? 
                        < TiWeatherShower  style={{fontSize:"80px"}}/> 
                        : ""
                    }

                    {
                        sunny ? 
                        < TiWeatherSunny style={{fontSize:"80px"}}/>
                        : "" 
                    }

                    {
                        clouds ? 
                        < TiWeatherCloudy style={{fontSize:"80px"}}/>
                        : "" 
                    }
                  
                </Card.Title>
                
                <Card.Title>
                    {props.maxtemp}°C
                </Card.Title>

                <Card.Subtitle>
                    {props.mintemp}°C
                </Card.Subtitle>
                
                <Card.Text>
                    {props.conditions}
                </Card.Text>
            </Card.Body>
            
        </Card>
    )
}

export default TempCard

