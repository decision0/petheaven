import { IoBarChartSharp } from "react-icons/io5";
import { SiPetsathome } from "react-icons/si";
import { MdPets } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";

const links = [
  { text: "rehoming pets", path: ".", icon: <MdPets /> },
  { text: "pets seeking home ", path: "all-pets", icon: <SiPetsathome /> },
  { text: "stats", path: "stats", icon: <IoBarChartSharp /> },
  { text: "profile", path: "profile", icon: <ImProfile /> },
  { text: "admin", path: "admin", icon: <MdAdminPanelSettings /> },
];

export default links;
