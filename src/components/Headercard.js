import {Alert} from "react-bootstrap"

function JumboTron(props){

    return(
       <Alert variant= "secondary"><h1>{props.title}</h1></Alert>
    )

}

export default JumboTron;