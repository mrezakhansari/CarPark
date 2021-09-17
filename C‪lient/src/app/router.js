// import external modules
import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import Spinner from "../components/spinner/spinner";
import { connect } from "react-redux";
// import internal(own) modules
import PageRoute from "../layouts/routes/pageRoute";
import MainLayoutRoutes from "../layouts/routes/mainRoutes";
import LoginLayoutRoute from "../layouts/routes/loginRoutes"
import LogoutLayoutRoute from "../layouts/routes/logoutRoutes";
import ErrorLayoutRoute from "../layouts/routes/errorRoutes";
import urls from '../urls.json';

//#region User Pages ------------------------------------------------------------------

const LazyFirstPage = lazy(() => import("../views/pages/firstPage"));
const LazyMessageToDriverPage = lazy(() => import("../views/pages/messageToDriverPage"));
const LazyRegisterDriverPage = lazy(()=>import("../views/pages/registerDriverPage"));
const LazyUserProfile = lazy(() => import("../views/pages/userProfile"));
const LazyHistoryTrackingPage = lazy(() => import("../views/pages/mapTracking"));
const LazyFinancePage = lazy(() => import("../views/pages/financePage"));
const LazyOnlineTrackingPage = lazy(() => import("../views/pages/onlineTracking"));
const LazyLogout = lazy(() => import("../views/pages/logoutPage"));

//#endregion --------------------------------------------------------------------------

//#region Admin Pages -----------------------------------------------------------------

const LazyLoginPage = lazy(() => import("../views/pages/loginPage"));
const LazyPageCar = lazy(() => import("../views/pages/pageCar"));
const LazyPageUser = lazy(() => import("../views/pages/pageUser"));
const LazyProductsPage = lazy(() => import("../views/pages/productsPage"));

//#endregion --------------------------------------------------------------------------


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

        <PageRoute
            exact
            path={urls.RegisterDriver}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyRegisterDriverPage {...matchprops} />
              </Suspense>)}
          />

          <PageRoute
            exact
            path={urls.Code}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyMessageToDriverPage {...matchprops} />
              </Suspense>)}
          />

          {/* <PageRoute
            exact
            path={urls.RegisterDriver}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyFirstPage {...matchprops} />
              </Suspense>)}
          />

          <MainLayoutRoutes
            exact
            path={urls.Home}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyUserProfile {...matchprops} />
              </Suspense>)}
          />

          <MainLayoutRoutes
            exact
            path={urls.UserProfile}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyUserProfile {...matchprops} />
              </Suspense>
            )}
          /> */}
          {/* <MainLayoutRoutes
            exact
            path={urls.Admin.Users}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyUsersPage {...matchprops} />
              </Suspense>
            )}
          /> */}
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
          {/* <MainLayoutRoutes
            exact
            path={urls.Admin.Products}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyProductsPage {...matchprops} />
              </Suspense>
            )}
          /> */}
          {/* <MainLayoutRoutes
            exact
            path={urls.Admin.Dashboard}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyMaintainance {...matchprops} />
              </Suspense>
            )}
          /> */}
          <LoginLayoutRoute
            exact
            path={urls.Auth.Login}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyLoginPage {...matchprops} />
              </Suspense>
            )}
          />
          {/* <MainLayoutRoutes
            exact
            path={urls.MapTracking}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyHistoryTrackingPage {...matchprops} />
              </Suspense>
            )}
          /> */}
          {/* <MainLayoutRoutes
            exact
            path={urls.OnlineTracking}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyOnlineTrackingPage {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path={urls.Finance}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyFinancePage {...matchprops} />
              </Suspense>
            )}
          /> */}
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
