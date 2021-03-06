// import external modules
import React from "react";
import { Route } from "react-router-dom";

// import internal(own) modules
import ErrorLayout from "../errorLayout";

const CleanLayoutRoute = ({ render, ...rest }) => {
   return (
      <Route
         {...rest}
         render={matchProps => <ErrorLayout>{render(matchProps)}</ErrorLayout>}
      />
   );
};

export default CleanLayoutRoute;
