// import external modules
import React from "react";
import { Route, Redirect } from "react-router-dom";

// import internal(own) modules
import PageLayout from "../pageLayout";
import { getUserCarAssignInfoBasedOnQrCode } from '../../services/userCarAssign';

const FirstPageRoute = ({ computedMatch, render, location, ...rest }) => {
   console.log(location, render);
   const id = computedMatch.params.id;
   console.log('asdasdasd', computedMatch, id);

   const handleRenderMethod = (matchProps) => {
      return (<PageLayout>{render(matchProps)}</PageLayout>);
      // try {
      //    const temp = await getUserCarAssignInfoBasedOnQrCode({ id: id });
      //    console.log(temp);
      //    if (temp.data.result) {
      //       return (<PageLayout>{render(matchProps)}</PageLayout>);
      //    }
      //    else {
      //       return (<Redirect
      //          to={{
      //             pathname: "/qwe",
      //             state: { message: "Access to this section is forbidden" }
      //          }}
      //       />)
      //    }
      // } catch (error) {
      //    return (<Redirect
      //       to={{
      //          pathname: "/qwe",
      //          state: { message: "Access to this section is forbidden" }
      //       }}
      //    />)
      // }
   }
   return (
      <Route
         {...rest}
         render={matchProps => handleRenderMethod(matchProps)}
      />
   );
};

export default FirstPageRoute;
