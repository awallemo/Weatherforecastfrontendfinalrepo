import { Container, Row, Col} from "react-bootstrap"
import JumboTron from "../components/Headercard";
import TempCard from "../components/Card"
import axios from "axios";
import { useEffect, useState } from 'react';


function Historicaldatapage(){
    const [test, setTest] = useState([])

    useEffect(() =>{
        axios.get("https://localhost:5001/api/Weathercards/")
              .then((res) => {console.log(res)
                setTest(res.data)
                console.log(res.data.length)
            })


              
    },[])
    
    return(
        <Container>
            <Row>
             <JumboTron title={"Vær og Temp for de siste 30 dagene"}/>
            </Row>
            <Row>
            {test.map((result, index) => (
                <Col>
                    <TempCard maxtemp={result.maxtemp} mintemp = {result.mintemp}  
                    date={result.date} 
                    day={result.day}
                    conditions={result.condition}
                    />
                </Col>

            ))}

            </Row>
        </Container>
    )
}

export default Historicaldatapage
