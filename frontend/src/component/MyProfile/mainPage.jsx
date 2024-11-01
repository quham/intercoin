const { default: Nav } = require("./navbar");
import Homez from "./Home";
import HorizontalNav from "./horinav";
import "./navbar.scss";
function MainPage() {
    const options = [
        { name: "Notification", icon: "img/notification.svg" },
        { name: "User", icon: "img/user.svg" }
    ];
    return (
        <>
            <HorizontalNav
                options={options}
            />
            <div style={{ display: "flex" }}>
                <div className="nav-div" >

                    <Nav li={[
                        ["Home", "img/home.png"],
                        ["Payment", "img/money.png"],
                        ["Analysis ", "img/analyse.png"],
                        ["Reserves", "img/reserve.png"],
                        ["Support", "img/support.png"]
                    ]} />
                </div>
                <div className="home-div">
                    <Homez /></div>
            </div>


        </>
    )
}

export default MainPage