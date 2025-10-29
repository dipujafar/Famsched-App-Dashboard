import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import {
  BadgeCent,
  CalendarDays,
  CirclePlus,
  GitPullRequestCreateArrow,
  Podcast,
  UsersRound,
} from "lucide-react";
import { BiSupport } from "react-icons/bi";

export const navLinks = [
  {
    key: "dashboard",
    icon: <RiDashboardHorizontalFill size={18} />,
    label: <Link href={"/dashboard"}>Dashboard</Link>,
  },
  {
    key: "account-details",
    icon: <UsersRound size={18} />,
    label: <Link href={"/account-details"}>Account Details</Link>,
  },
  {
    key: "subscription",
    icon: <Podcast />,
    label: <Link href={"/subscription"}>Subscription</Link>,
  },
  {
    key: "navLinks",
    icon: <BadgeCent />,
    label: <Link href={"/earning"}>Earning</Link>,
  },
  {
    key: "settings",
    icon: <IoSettingsOutline size={18} />,
    label: <Link href={"/settings"}>Settings</Link>,
  },
  // {
  //   key: "logout",
  //   icon: <RiLogoutCircleLine size={18} />,
  //   label: <Link href={"/login"}>Logout</Link>,
  // },
];
