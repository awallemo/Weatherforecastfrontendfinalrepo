import {Badge, Container, Row, Col, Button, InputGroup, FormControl} from "react-bootstrap"
import JumboTron from "../components/Headercard";
import TempCard from "../components/Card"
import axios from "axios";
import {  useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,  LabelList,  } from 'recharts';
import { useHistory } from "react-router"





function AddWeatherToDb(weatherobject){
 axios.post("https://weatherforecastbackend.azurewebsites.net/api/Weathercards/",{
  
  date: weatherobject.date.toString(),
  day:weatherobject.day,
  maxtemp: weatherobject.maxtemp,
  mintemp: weatherobject.mintemp,
  condition:weatherobject.condition
}).then((response) => console.log("response", response))
}



function IndexPage(){
const history = useHistory();
const [results, setResult] = useState([])
const [hourly, setHourly] = useState([])
const[tempCity, setTempCity] = useState()
const [city, setCity] = useState()
//UseStates for latitudes and longitudes

const [geo, setGeo] = useState({lat: "", lon: ""})

let datoliste = [];

// async function getCity(location){

//   console.log("Hei", tempCity)
//   axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=cfa5776ea5e4da9aecbc0e76164f8659`)
//               .then((res) => {console.log("GEORESPONSE",res.data)
//                 console.log(res.data.length)
//                 console.log("lat",res.data[0].lat)
//                 console.log("lon", res.data[0].lon)
//                 setGeo({lat:res.data[0].lat, lon:res.data[0].lon})
//                 console.log("GeoState",geo)
//             })
// }

async function getWeather(){
  try{
    return await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${geo.lat}&lon=${geo.lon}&units=metric&exclude=currently,minutely&appid=cfa5776ea5e4da9aecbc0e76164f8659`);
  } catch(error){
    throw error.response
  }
}


//Funksjon som kjører getcity også getweather

async function getCoordinatesAndWeather(location){
  console.log("tempcity",location)
  setCity(location)


  await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=cfa5776ea5e4da9aecbc0e76164f8659`)
  .then((res) => {console.log("GEORESPONSE",res.data)
    console.log(res.data.length)
    console.log("lat",res.data[0].lat)
    console.log("lon", res.data[0].lon)
    setGeo({lat:res.data[0].lat, lon:res.data[0].lon})
    console.log("GeoState",geo)
})

  getWeather()
  .then(
    (result) => {
      console.log("daily", result.data.daily)
      console.log("hourly", result.data.hourly)
      result.data.daily.pop()

      //Lager en ny liste med objekter som er på ønsket format.
      let dailylist = []
      console.log("datolista", datoliste)
      //loop over lista 
      for(let i = 0; i < result.data.daily.length; i++){
        let tomorrow = new Date(timeElapsed + 86400000*i)
        let month = tomorrow.getUTCMonth()+1
        let day = tomorrow.toLocaleString("default", {weekday:"long"})
        let weatherobject = 
        
        {
          date:tomorrow.getUTCDate()+"/"+month+"/"+tomorrow.getFullYear(), 
          day:day,
          maxtemp:result.data.daily[i].temp.max, 
          mintemp:result.data.daily[i].temp.min, 
          condition:result.data.daily[i].weather[0].main
        }
        
        
        

        dailylist.push(weatherobject)
        
      }
      console.log("nye lista", dailylist)

      setResult(dailylist)
      
      setHourly(result.data.hourly)

      
      
      axios.get("https://weatherforecastbackend.azurewebsites.net/api/Weathercards/")
      .then((res) => 
      {
        
        if (res.data.length === 0){
          AddWeatherToDb(dailylist[0])
        }
        
        if(res.data[res.data.length-1].date !== dailylist[0].date){
          AddWeatherToDb(dailylist[0])
        }else if(res.data[res.data.length-1].maxtemp !== dailylist[0].maxtemp){
          
          axios.delete(`https://weatherforecastbackend.azurewebsites.net/Weathercards/${res.data[res.data.length-1].id}`)
          AddWeatherToDb(dailylist[0])
          
        }
      })

      
      
      
      
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
      
    }
  )
}

const timeElapsed = Date.now()




for (let i = 0; i<results.length;i++){
  
  const tomorrow = new Date(timeElapsed + 86400000*i)
  
  
  datoliste.push(tomorrow)
}



console.log(datoliste)



const timeliste = []




for(let i = 0; i < 48; i++){
 timeliste.push(new Date(Date.now()+i*1000*60*60).getHours()+ ":" + new Date(Date.now()+i*1000*60*60).getMinutes())
}









    return(
        <>
        <h1>
         <Badge bg="secondary">Weather Forecast</Badge>
         <Button variant="primary" onClick={()=>history.push('/historicaldata')}>
           Historicaldata
         </Button>
         
         
        </h1>
        
        <Container>

        <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">City</InputGroup.Text>
            <FormControl
              placeholder="Write a city"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange = {(e) =>setTempCity(e.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick = {() => getCoordinatesAndWeather(tempCity)}>
              Send
            </Button>
        </InputGroup>

            <Row>
             <JumboTron title={"7 Day Forecast for " + city}/>
            </Row>
        
            <Row>
            {results.map((card, index) => (
                <Col>
                    <TempCard maxtemp={card.maxtemp} mintemp = {card.mintemp}  
                    date={card.date} 
                    day={card.day}
                    conditions={card.condition}
                    />
                </Col>
 
            ))}

            </Row>

            <Row>
             <JumboTron title={"48 hour Forecast"}/>
            </Row>

            <Row>
                
                    <AreaChart
                      width={1300}
                      height={400}
                      data={hourly}
                      margin={{
                        top: 10,
                        right: 0,
                        left: -30,
                        bottom: 0,
                      }}
                      
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis datakey="dt" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="temp" stroke="#8884d8" fill="#8884d8" >
                      <LabelList dataKey="temp" position="top" />
                      </Area>
                    </AreaChart>
                
            </Row>
            

        </Container>
        
        </>
        
        
    )

  }

export default IndexPage;