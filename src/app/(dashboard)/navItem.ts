import { NavContent, Role } from "@/types/nav/type"
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
                    title   : "Profile",
                    path    : `${role}`,
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
                }
            );
            break;
        case USER_ROLE.ADMIN:
            navItem.push(
                {
                    title       : "Profile",
                    path        : `${role}`,
                    icon        : faUser,
                },
                {
                    title       : "Subjects",
                    path        : `${role}/specialties`,
                    icon        : faUser,
                },
                {
                    title       : "Test preparation",
                    path        : `${role}/courses`,
                    icon        : faUser,
                },
                {
                    title       : "University",
                    path        : `${role}/schedules`,
                    icon        : faUser,
                },
                {
                    title       : "Services",
                    path        : `${role}/banner`,
                    icon        : faUser,
                },
                {
                    title       : "Reviews",
                    path        : `${role}/reviews`,
                    icon        : faUser,
                },
                {
                    title       : "Process Req",
                    path        : `${role}/course-content`,
                    icon        : faUser,
                },
            );
            break;
        case USER_ROLE.STUDENT:
            navItem.push(
                {
                    title       : "Profile",
                    path        : `${role}`,
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