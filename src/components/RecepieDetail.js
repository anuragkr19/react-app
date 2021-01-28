import React from 'react';
import {useParams,useLocation} from 'react-router-dom';
import {Card,CardContent,TableRow,TableCell,Table,Typography} from '@material-ui/core';

export default function RecepieDetail(props){
    

    //returns key:value pair of URL parameter
    const {recepieID} = useParams();   
    //utility method to work with query string of a URL
    let query = new URLSearchParams(useLocation().search);
    //object to store special recepie
    let specialRecepie = {};
    //object to store other recepie
    let notSpecialRecepie = {};
 
    //check for special recepie
    if(query.get("isSpecialRecepie") === "special"){
      specialRecepie = props.specialRecepie.filter(item => item.uuid === recepieID);
    }
    else{
      notSpecialRecepie = props.recepies.filter(item => item.uuid === recepieID);
    }

    //functional component to render special recepie data 
    const RenderSpecialRecepie = (recepie) => {
     return(<div>
             {
               recepie ? 
                <section>
                  {
                    Object.keys(recepie).map((prop) =>{
                      return(<Card>
                               <CardContent><h3>{recepie[prop][0].title}</h3>
                                 {recepie[prop][0].type ?<Typography comment="span">Type: {recepie[prop][0].type}</Typography> : null } 
                                 {recepie[prop][0].geo ?<Typography comment="span">Location: {recepie[prop][0].geo} </Typography> : null }
                                 {recepie[prop][0].text ?<Typography comment="p">{recepie[prop][0].text}</Typography> : null }
                               </CardContent>
                             </Card>
                            )
                    })
                  }
                </section> : null
             }
            </div>
           )
    }

   //functional component to render all other recepie type of data
   const RenderRecepie = (recepie) => {
     const serVerUrl = "http://localhost:3001/";

     return(<div>  
             {recepie ? 
                      <section>
                         {
                          Object.keys(recepie).map((prop)  => {
                                 return(<Card>
                                          <CardContent>
                                            <h3>{recepie[prop][0].title}</h3>
                                            <Typography comment="p">{recepie[prop][0].description}</Typography>
                                            <img src={ serVerUrl + recepie[prop][0].images.small} alt="alt text" />
                                            <Typography comment="p">Serving: {recepie[prop][0].servings} | PrepTime:  {recepie[prop][0].prepTime} | CookTime: {recepie[prop][0].cookTime} </Typography>
                                               {
                                                 recepie[prop][0].ingredients ? 
                                                    <Table style={{margin:"0 auto"}}>
                                                      <TableRow>
                                                        <th>Amount</th>
                                                        <th>Measurement</th>
                                                        <th>Name</th>   
                                                      </TableRow>   
                                                 {
                                                  recepie[prop][0].ingredients.map(ingredient => {
                                                     return (<TableRow key={ingredient.uuid}>
                                                              <TableCell  align="center"><Typography comment="span">{ingredient.amount}</Typography></TableCell>
                                                              <TableCell align="center"><Typography comment="span">{ingredient.measurement}</Typography></TableCell>
                                                              <TableCell align="center"><Typography comment="span">{ingredient.name}</Typography></TableCell>
                                                             </TableRow>
                                                            )
                                                   })
                                                 }
                                                 </Table> : null
                            }
                            {
                              recepie[prop][0].directions ? 
                                  <Table>
                                      <TableRow>
                                       <th style={{float:"left"}}>Instructions</th>
                                       <th>Optional</th> 
                                      </TableRow>   
                                      {
                                         recepie[prop][0].directions.map(direction => {
                                              return (<TableRow key={direction}>
                                                       <TableCell><Typography comment="span">{direction.instructions}</Typography></TableCell>
                                                       <TableCell>{!direction.optional?<Typography comment="span">false</Typography>:<Typography comment="span">true</Typography>}</TableCell>
                                                      </TableRow>
                                                     )
                                               })
                                       }
                                  </Table> : null
                              }                    
                              </CardContent>
                            </Card>
                          )
                        })
                       }
                   </section> : null}
              </div>
         )
}

    return(
        <>
         <div>
            {
              specialRecepie.length > 0 ? <RenderSpecialRecepie recepie = {specialRecepie} /> : null
            }
          </div> 
          <div>
            {
             notSpecialRecepie.length > 0 ? <RenderRecepie recepie={notSpecialRecepie} /> : null
            }
          </div>
        </>
    )
}