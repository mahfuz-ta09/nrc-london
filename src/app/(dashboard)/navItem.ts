import { NavContent, Role } from "@/types/nav/type"
import { faBook, faBuilding, faHand, faHandshake, faPaperPlane, faPen, faUser } from "@fortawesome/free-solid-svg-icons";

const sideNavItem = (role : Role) => {
    const navItem:NavContent[] = []
    const USER_ROLE = {
        SUPER_ADMIN: "super_admin",
        ADMIN: "admin",
        STUDENT: "student",
        USER: "user"
    }


    // console.log("sad",role)
    switch(role){
        case USER_ROLE.SUPER_ADMIN:
            navItem.push(
                {
                    title    : "Profile",
                    path     : "/",
                    icon     : faUser,
                },
                {
                    title   : "Manage Admin",
                    path    : `${role}/manage-admin`,
                    icon    : faUser,
                },
                {
                    title   : "Manage Users",
                    path    : `${role}/manage-users`,
                    icon    : faUser,
                },
                {
                    title   : "Statistics",
                    path    : `${role}/web-stat`,
                    icon    : faUser,
                },
                {
                    title   : "Agents",
                    path    : `${role}/AllAgents`,
                    icon    : faUser,
                }
            );
            break;
        case USER_ROLE.ADMIN:
            navItem.push(
                {
                    title       : "Profile",
                    path        : "/",
                    icon        : faUser,
                },
                {
                    title       : "Subjects",
                    path        : `${role}/subjects`,
                    icon        : faBook,
                },
                {
                    title       : "University",
                    path        : `${role}/university`,
                    icon        : faBuilding,
                },
                // {
                //     title       : "Services",
                //     path        : `${role}/banner`,
                //     icon        : faPaperPlane,
                // },
                {
                    title       : "Reviews",
                    path        : `${role}/reviews`,
                    icon        : faHand,
                },
                {
                    title       : "Process Req",
                    path        : `${role}/process-req`,
                    icon        : faHandshake,
                },
                {
                    title       : "Country&Uni",
                    path        : `${role}/country-uni`,
                    icon        : faPen,
                },
                // {
                //     title       : "Test preparation",
                //     path        : `${role}/test-prep`,
                //     icon        : faPen,
                // },
            );
            break;
        case USER_ROLE.STUDENT:
            navItem.push(
                {
                    title       : "Profile",
                    path        : "/",
                    icon        : faUser,
                },
                {
                    title       : "Schedules",
                    path        : `${role}/schedules`,
                    icon        : faUser,
                },
                {
                    title       : "My classes",
                    path        : `${role}/my-classes`,
                    icon        : faUser,
                },
            );
            break;
    }

    return [...navItem]
}

export default sideNavItem