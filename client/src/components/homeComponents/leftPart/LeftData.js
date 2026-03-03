import { FriendIcon } from "../../../assets/svg/FriendIcon";
import { MediaIcon } from "../../../assets/svg/MediaIcon";
import { Messages } from "../../../assets/svg/Messages";
import { NewsFeed } from "./../../../assets/svg/NewsFeed";
import { Settings } from "./../../../assets/svg/Settings";
export const LeftData = [
  {
    icon: NewsFeed,
    title: "News Feed",
    to: "/",
  },
  {
    icon: Messages,
    title: "Messages",
    to: "/messages",
  },
  {
    icon: FriendIcon,
    title: "Friends",
    to: "/friends",
  },
  {
    icon: MediaIcon,
    title: "Media",
    to: "/media",
  },
  {
    icon: Settings,
    title: "Settings",
    to: undefined,
  },
];
