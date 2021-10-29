// import external modules
import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import Spinner from "../components/spinner/spinner";
import { connect } from "react-redux";
// import internal(own) modules
import PageLayoutRoute from "../layouts/routes/pageRoute";
import MainLayoutRoutes from "../layouts/routes/mainRoutes";
import LoginLayoutRoute from "../layouts/routes/loginRoutes"
import LogoutLayoutRoute from "../layouts/routes/logoutRoutes";
import ErrorLayoutRoute from "../layouts/routes/errorRoutes";
import urls from '../urls.json';

//#region User Pages ------------------------------------------------------------------

const LazyHomePage = lazy(() => import("../../src/views/pages/PageHome"));
const LazyMessageToDriverPage = lazy(() => import("../views/pages/messageToDriverPage"));
const LazyRegisterDriverPage = lazy(() => import("../views/pages/registerDriverPage"));

//#endregion --------------------------------------------------------------------------

//#region Admin Pages -----------------------------------------------------------------

const LazyPageCar = lazy(() => import("../views/pages/PageCar"));
const LazyPageUser = lazy(() => import("../views/pages/pageUser"));
const LazyPageAssign = lazy(() => import("../views/pages/PageAssign"));

//#endregion --------------------------------------------------------------------------


const LazyLoginPage = lazy(() => import("../views/pages/loginPage"));
const LazyLogout = lazy(() => import("../views/pages/logoutPage"));
const LazyErrorPage = lazy(() => import("../views/pages/error"));

class Router extends Component {
  state = {};
  // componentWillMount() {
  //   const user = auth.getCurrentUser();

  //   this.setState({ user });
  // }
  render() {
    //console.log('from render')
    return (
      // Set the directory path if you are deplying in sub-folder
      <BrowserRouter basename="/">
        <Switch>
          {/* <MainLayoutRoutes
            exact
            path={urls.Home}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyHomePage {...matchprops} />
              </Suspense>)}
          /> */}
          <PageLayoutRoute
            exact
            path={urls.RegisterDriver}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyRegisterDriverPage {...matchprops} />
              </Suspense>)}
          />
          <PageLayoutRoute
            exact
            path={urls.Code}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyMessageToDriverPage {...matchprops} />
              </Suspense>)}
          />
          <MainLayoutRoutes
            exact
            path={urls.Admin.User}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyPageUser {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path={urls.Admin.Car}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyPageCar {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path={urls.Admin.Assign}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyPageAssign {...matchprops} />
              </Suspense>
            )}
          />
          <LoginLayoutRoute
            exact
            path={urls.Auth.Login}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyLoginPage {...matchprops} />
              </Suspense>
            )}
          />
          <LogoutLayoutRoute
            exact
            path={urls.Auth.Logout}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyLogout {...matchprops} />
              </Suspense>
            )}
          />
          <ErrorLayoutRoute
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyErrorPage {...matchprops} />
              </Suspense>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // fetch: () => dispatch(fetchVoyagesTopTenOpen()),
    // fetchOperator:(value)=>dispatch(fetchOperatorInfoBasedOnCode(value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);
