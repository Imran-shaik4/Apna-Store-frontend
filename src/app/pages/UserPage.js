import Register from "../components/Register";
import User from "../components/User";
import UserDetails from "../components/UserDetails";
import UserOrders from "../components/UserOrders";
function UserPage() {
    return (
        <div className="App">
            <User />
            <Register />
            <UserDetails />
            <UserOrders />
        </div>
    );
}

export default UserPage;
