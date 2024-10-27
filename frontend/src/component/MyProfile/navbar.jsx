'use client'
import React, { useState } from "react";

const Nav = ({ li }) => {
    const [window, setWindow] = useState(true);

    let openClose = () => {
        if (window === false) {
            setWindow(true);
        } else {
            setWindow(false);
        }
    };

    // Defining additional items separately
    const additionalItems = [
        ["Settings", "img/setting.svg"], // Assuming you have an SVG icon for settings
        ["Logout", "img/logout.svg"] // Assuming you have an SVG icon for logout
    ];

    return (
        <nav className="navbar-menu" style={{ width: window === false ? 250 : 60 }} >
            <div className="burger" onClick={() => openClose()}>
                <img src="img/menu.svg" alt="burger" />
            </div>
            <ul className="navbar__list">
                {li.map((item, i) => (
                    <div className="navbar__li-box" key={i}>
                        <div>
                            <img
                                src={item[1]}
                                alt={item[0]}
                                style={{ paddingLeft: window === false ? 27 : 17 }}
                            />
                        </div>
                        <div>
                            <li
                                className="navbar__li"
                                style={{ display: window === false ? "inline-block" : "none" }}
                            >
                                {item[0]}
                            </li>
                        </div>
                    </div>
                ))}
            </ul>
            {/* Separate container for additional items */}
            <ul className="navbar__list ">
                {additionalItems.map((item, i) => (
                    <div className="navbar__li-box" key={i}>
                        <div>
                            <img
                                src={item[1]}
                                alt={item[0]}
                                style={{ paddingLeft: window === false ? 27 : 17 }}
                            />
                        </div>
                        <div>
                            <li
                                className="navbar__li"
                                style={{ display: window === false ? "inline-block" : "none" }}
                            >
                                {item[0]}
                            </li>
                        </div>
                    </div>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
