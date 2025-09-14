import { NavContent, Role } from "@/types/nav/type"
import { faScreenpal } from "@fortawesome/free-brands-svg-icons"
import {
  faArrowCircleDown,
  faBookOpen,
  faChartBar,
  faGlobe,
  faStar,
  faTasks,
  faUniversity,
  faUser,
  faUsers,
  faUserShield,
  faUserTie,
  faUserGraduate,
  faUserPlus,
  faInfo,
} from "@fortawesome/free-solid-svg-icons"

type Section = {
  section: string
  items: NavContent[]
}

const sideNavItem = (role: Role): Section[] => {
  const USER_ROLE = {
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
    STUDENT: "student",
    USER: "user",
    AGENT: "agent",
    SUB_AGENT: "sub_agent",
  }

  const common: NavContent[] = [
    { title: "Profile", path: "/", icon: faUser },
  ]

  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      return [
        { section: "My Action", items: common },
        {
            section: "Administration Action",
            items: [
              { title: "Manage Users", path: `${role}/manage-users`, icon: faUsers },
              { title: "Manage Admin", path: `${role}/manage-admin`, icon: faUserShield },
              { title: "Agent Control", path: `${role}/AllAgents`, icon: faUserTie },
              { title: "Submitted Student Files", path: `${role}/student-files`, icon: faUserGraduate },
              { title: "Student File Processing", path: `${role}/st-file`, icon: faTasks },
            ],
        },
        {
            section:'Web Controlls',
            items: [
                { title: "Statistics", path: `${role}/web-stat`, icon: faChartBar },
                { title: "Countries & Universities", path: `${role}/country-uni`, icon: faGlobe },
                { title: "Reviews", path: `${role}/reviews`, icon: faStar },
                { title: "Banner", path: `${role}/banner`, icon: faScreenpal },
                { title: "Blog", path: `${role}/blog`, icon: faInfo },
            ]
        }
      ]

    case USER_ROLE.ADMIN:
      return [
        { section: "My Action", items: common },
        {
          section: "Admin Tools",
            items: [
                { title: "Subjects", path: `${role}/subjects`, icon: faBookOpen },
                { title: "University", path: `${role}/university`, icon: faUniversity },
                { title: "Countries & Universities", path: `${role}/country-uni`, icon: faGlobe },
                { title: "Banner", path: `${role}/banner`, icon: faScreenpal },
                { title: "Blog", path: `${role}/blog`, icon: faInfo },
            ],
        },
        {
            section: "Administration Action",
            items:[
                { title: "Student File Processing", path: `${role}/st-file`, icon: faTasks },
            ]
        }
      ]

    case USER_ROLE.STUDENT:
      return [
        { section: "My Action", items: common },
        {
          section: "Study",
          items: [
            { title: "Schedules", path: `${role}/schedules`, icon: faBookOpen },
            { title: "My Classes", path: `${role}/my-classes`, icon: faUniversity },
          ],
        },
      ]

    case USER_ROLE.AGENT:
      return [
        { section: "My Action", items: common },
        {
          section: "Agent Tools",
          items: [
            { title: "Student Applications", path: `${role}/student-apps`, icon: faUserGraduate },
            { title: "Submitted Files", path: `${role}/submitted-files`, icon: faTasks },
            { title: "Referral Management", path: `${role}/referrals`, icon: faUserPlus },
          ],
        },
      ]

    case USER_ROLE.SUB_AGENT:
      return [
        { section: "My Action", items: common },
        {
          section: "Sub-Agent Tools",
          items: [
            { title: "Student Applications", path: `${role}/student-apps`, icon: faUserGraduate },
            { title: "Referral Uplines", path: `${role}/uplines`, icon: faUserTie },
          ],
        },
      ]

    default:
      return [{ section: "General", items: common }]
  }
}

export default sideNavItem
