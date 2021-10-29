// import external modules
import React from "react";
import { Route, Redirect } from "react-router-dom";
import _ from 'lodash'

import auth from "../../services/authService";
import config from '../../config.json';
import MainLayout from "../mainLayout";

const MainLayoutRoute = ({ location, path, render, ...rest }) => {

   const handleRenderMethod = (matchProps) => {

      if (!config.useAuthentication) {
         return <MainLayout>{render(matchProps)}</MainLayout>
      }

      const user = auth.getCurrentUser();
      if (user) {
         
         return <MainLayout>{render(matchProps)}</MainLayout>

         if (user.userType === "Admin" || user.userType === "Superuser") {
            return <MainLayout>{render(matchProps)}</MainLayout>
         }
         // else if (doesCurrentUserHaveAuthorization(user.permissions)) {
         //    return <MainLayout>{render(matchProps)}</MainLayout>
         // }
         else {
            //console.log('main rout', user)
            auth.logout();
            return (<Redirect
               to={{
                  pathname: "/login",
                  state: { message: "Access to this section is forbidden" }
               }}
            />)
         }

      }
      return (<Redirect
         to={{
            pathname: "/login",
            state: { from: matchProps.location }
         }}
      />)
   }
   return (
      <Route
         {...rest}
         path={path}
         render={matchProps => handleRenderMethod(matchProps)}
      />
   );
};

export default MainLayoutRoute;
