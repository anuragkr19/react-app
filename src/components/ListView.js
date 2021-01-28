import React,{useState,useEffect} from "react";
import {useRouteMatch,Route,Link} from 'react-router-dom';
import axios from 'axios';
import {Container} from '@material-ui/core';

import RecepieDetail from "./RecepieDetail";


export default function ListView(props){

    //create local state variable recepies
    const [recepies, setRecepies] = useState([]);
    ////create local state variable specialRecepie
    const [specialRecepie, setSpecialRecepie] = useState([]);
 
    //use get request to fetch both special and all other recepie after render
    useEffect(()=> {
        axios.get('http://localhost:3001/recipes')
             .then(response => {
               setRecepies(response.data);
             },(error) =>{
                console.log(error);
             });

        axios.get('http://localhost:3001/specials')
             .then(response => {
               setSpecialRecepie(response.data);
             },(error)=>{
                console.log(error);
             });

    },[]);

    //render recepie both special and other recepie
    return(
        <> 
           <Container>
           <div style={{float:"left"}}>
               <h3>Special Recepie</h3>
               {
                  specialRecepie ? 
                      <ul style={{listStyleType:"none"}}>
                        {
                            specialRecepie.map(sp => {
                              return(<li key={sp.uuid}>
                                       <Link to={`/${sp.uuid}?isSpecialRecepie=special`}>{sp.title}</Link>
                                      </li>
                                    );   
                             })
                          }
                      </ul>: null 
               }
           </div>
           <div>
             <h3>All Recepies</h3>
             {
              recepies ? 
                <ul style={{listStyleType:"none"}}>
                 {
                    recepies.map((recepie) => {
                        return(<li key={recepie.uuid}>
                                  <Link to={`/${recepie.uuid}`}>{recepie.title}</Link>
                               </li>
                               );
                    }) 
                 }
                </ul>: null
             }  
             <Route exact path={`/:recepieID`}> {/*If  url ends with /uuid  render RecepieDetail functional component */}
                <RecepieDetail recepies={recepies} specialRecepie={specialRecepie} />
             </Route>
            </div>
         </Container>
        </>
      )
}