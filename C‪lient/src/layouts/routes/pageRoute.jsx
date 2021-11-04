// import external modules
import React from "react";
import { Route } from "react-router-dom";

// import internal(own) modules
import PageLayout from "../pageLayout";

const FirstPageRoute = ({ render,...rest }) => {
   return (
      <Route
         {...rest}
         render={matchProps => <PageLayout>{render(matchProps)}</PageLayout>}
      />
   );
};

export default FirstPageRoute;
