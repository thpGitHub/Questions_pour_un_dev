import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
  
const PageNotFound: FunctionComponent = () => {
  
  return (
    <div>  
      <h1>404</h1> 
      <Link to="/">
        Retourner à l'accueil
      </Link>
    </div>
  );
}

export default PageNotFound;