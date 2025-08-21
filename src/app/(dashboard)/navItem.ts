import { NavContent, Role } from "@/types/nav/type"
import { faArrowCircleDown, faBookOpen, faChartBar, faGlobe, faStar, faTasks, faUniversity, faUser, faUsers, faUserShield, faUserTie } from "@fortawesome/free-solid-svg-icons";

const sideNavItem = (role : Role) => {
    const navItem:NavContent[] = []
    const USER_ROLE = {
        SUPER_ADMIN: "super_admin",
        ADMIN: "admin",
        STUDENT: "student",
        USER: "user"
    }


    switch(role){
        case USER_ROLE.SUPER_ADMIN:
            navItem.push(
                {
                    title    : "Profile",
                    path     : "/",
                    icon     : faUser,
                },
                {
                    title    : "my action",
                    path     : "---",
                    icon     : faUser,
                },
                {
                    title   : "Manage Admin",
                    path    : `${role}/manage-admin`,
                    icon    : faUserShield,
                },
                {
                    title   : "Manage Users",
                    path    : `${role}/manage-users`,
                    icon    : faUsers,
                },
                {
                    title   : "Statistics",
                    path    : `${role}/web-stat`,
                    icon    : faChartBar,
                },
                {
                    title   : "Agents",
                    path    : `${role}/AllAgents`,
                    icon    : faUserTie,
                },
                {
                    title   : "admin action",
                    path    : `---`,
                    icon    :  faArrowCircleDown,
                },
                {
                    title    : "Country&Uni",
                    path     : `${role}/country-uni`,
                    icon     : faGlobe,
                },
                {
                    title       : "Reviews",
                    path        : `${role}/reviews`,
                    icon        : faStar,
                },
                {
                    title       : "Process Req",
                    path        : `${role}/process-req`,
                    icon        : faTasks,
                },
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
                    title    : "my action",
                    path     : "---",
                    icon     : faUser,
                },
                {
                    title       : "Subjects",
                    path        : `${role}/subjects`,
                    icon        : faBookOpen,
                },
                {
                    title       : "University",
                    path        : `${role}/university`,
                    icon        : faUniversity,
                },
                {
                    title       : "Reviews",
                    path        : `${role}/reviews`,
                    icon        : faStar,
                },
                {
                    title       : "Process Req",
                    path        : `${role}/process-req`,
                    icon        : faTasks,
                },
                {
                    title       : "Country&Uni",
                    path        : `${role}/country-uni`,
                    icon        : faGlobe,
                },
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