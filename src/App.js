import Header from "./app/stylecomponents/Header";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import StoreList from './app/stylecomponents/StoresList';
import Login from './app/stylecomponents/Login';
import Register from './app/stylecomponents/Register';
import MyOrders from './app/stylecomponents/MyOrders';
import Profile from './app/stylecomponents/Profile';
import MyStores from './app/stylecomponents/MyStores';
import MyStore from './app/stylecomponents/MyStore';
import SearchedStores from './app/stylecomponents/SearchedStores';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CreateStore from "./app/stylecomponents/CreateStore";
import OrderComponent from "./app/stylecomponents/OrderComponent";
import OwnerOrderDetails from "./app/stylecomponents/OwnerOrderDetails";
import AppDescription from "./app/stylecomponents/AppDescription";
function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <div>
            <Switch>
              <Route exact path="/">
                <StoreList />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/myorders">
                <MyOrders />
              </Route>
              <Route path="/mystores">
                <MyStores />
              </Route>
              <Route path="/mystore">
                <MyStore />
              </Route>
              <Route path="/searchedstores">
                <SearchedStores />
              </Route>
              <Route path="/createstore">
                <CreateStore />
              </Route>
              <Route path="/placeorder">
                <OrderComponent />
              </Route>
              <Route path="/storeorder">
                <OwnerOrderDetails />
              </Route>
              <Route path="/appdiscription">
                <AppDescription />
              </Route>
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});
