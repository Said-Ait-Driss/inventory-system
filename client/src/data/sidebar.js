import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd, BiCategoryAlt } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdPeople } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Commandes",
    icon: <FaShoppingCart />,
    childrens: [
      {
        title: "New Command",
        path: "/add-command",
      },
      {
        title: "Commands List",
        path: "/commands-list",
      },
    ],
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Clients",
    icon: <MdPeople />,
    childrens: [
      {
        title: "Add Client",
        path: "/add-client",
      },
      {
        title: "Clients List",
        path: "/clients-list",
      },
    ],
  },
  {
    title: "Categories",
    icon: <BiCategoryAlt />,
    childrens: [
      {
        title: "Add Category",
        path: "/add-category",
      },
      {
        title: "categories List",
        path: "/categories-list",
      },
    ],
  },
  {
    title: "Suppliers",
    icon: <FaPeopleGroup />,
    childrens: [
      {
        title: "Add Supplier",
        path: "/add-supplier",
      },
      {
        title: "Suppliers List",
        path: "/suppliers-list",
      },
    ],
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;
