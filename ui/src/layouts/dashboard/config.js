import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Register",
    path: "/add-citizen",
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Create Proposal",
    path: "/new-proposal",
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Proposals",
    path: "/proposals",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Profile",
    path: "/profile",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: "Staking",
  //   path: "/stakeing",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UsersIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Policy Library",
  //   path: "/policy-library",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UsersIcon />
  //     </SvgIcon>
  //   ),
  // },
  {
    title: "Company Registry",
    path: "company/company-registry",
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: "Customers",
  //   path: "/customers",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UsersIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Companies",
  //   path: "/companies",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ShoppingBagIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Account",
  //   path: "/account",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Settings",
  //   path: "/settings",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Login",
  //   path: "/auth/login",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Register",
  //   path: "/auth/register",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Error",
  //   path: "/404",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   ),
  // },
];
