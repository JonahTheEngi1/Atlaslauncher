import {UserInterface} from "../types/userInterface";
import ReactDOM from "react-dom";
import React from "react";
import pageMapping from "../pages/pageMapping";
import {Avatar, Button} from "@mui/material";
import {setSetting} from "../utils/settings";

interface UserDropdownProps {
    user: UserInterface | null | undefined;
    pageChange: (page: string) => void;
    userDataChange: (user: UserInterface | null) => void;
}
function UserDropdown(props: UserDropdownProps) {
    function ListItem({page, classes = []}: {page: string | null, classes?: string[]}) {
        function handleClick() {
            if(page) {
                props.pageChange(page)
            }else{
                props.userDataChange(null)
                setSetting("credentials", null)
            }
        }
        return (
            <li><a className={"dropdown-item attach-candle" + ` ${classes.join(" ")}`} onClick={handleClick}>{page ? pageMapping[page].name : "Logout"}</a></li>
        )
    }
    function ListDivider(){
        return <li><hr className="dropdown-divider"></hr></li>
    }

    function UserDropdownInner(){
        return (
            <div className="dropdown">
                <Button
                    className="button dropdown-toggle attach-candle"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    startIcon={<Avatar
                        src={props.user ? `https://crafatar.com/avatars/${props.user.uuid}?overlay` : ""}
                        sx={{height: "26px", width: "26px"}}
                    />}
                >
                    {props.user?.name}
                </Button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <ListItem page="profile" />
                    <ListDivider />
                    <ListItem page="settings" />
                    <ListItem page={null} classes={["text-danger"]} />
                </ul>
            </div>
        )
    }

    return ReactDOM.createPortal(<UserDropdownInner />, document.getElementById("user-dropdown")!)
}

export default UserDropdown
