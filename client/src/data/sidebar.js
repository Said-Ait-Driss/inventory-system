import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd, BiCategoryAlt } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title:"Categories",
    icon: <BiCategoryAlt />,
    childrens:[
      {
        title: "Add Category",
        path: "/add-category",
      },
      {
        title: "categories List",
        path: "/categories-list",
      },
    ]
  },
  {
    title:"Suppliers",
    icon: <FaPeopleGroup />,
    childrens:[
      {
        title: "Add Supplier",
        path: "/add-supplier",
      },
      {
        title: "Suppliers List",
        path: "/suppliers-list",
      },
    ]
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
