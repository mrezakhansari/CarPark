import React from "react";
import { Home, Monitor, LogOut, DollarSign, MapPin } from "react-feather";
import urls from '../urls.json';

const MenuList = [
    // {
    //     name: "پروفایل شما", key: "userProfile", url: urls.UserProfile, icon: () => <Home size={18} />, child: []
    // },
    // {
    //     name: "تاریخچه ردیابی", key: "historyTracking", url: urls.MapTracking, icon: () => <MapPin size={18} />, child: []
    // },
    // {
    //     name: "امور مالی", key: "finance", url: urls.Finance, icon: () => <DollarSign size={18} />, child: []
    // },
    // {
    //     name: "ردیابی آنلاین", key: "onlineTracking", url: urls.OnlineTracking, icon: () => <Home size={18} />, child: []
    // },
    {
        name: "پنل ادمین",
        key: "ADMIN",
        icon: () => <Monitor size={18} />,
        child: [
            // { name: "داشبورد مدیریتی", key: "ADMIN-DASHBOARD", url: urls.Admin.Dashboard, child: [] },
            { name: "مدیریت خودرو", key: "ADMIN-CAR", url: urls.Admin.Car, child: [] },
            { name: "مدیریت کاربران", key: "ADMIN-User", url: urls.Admin.User, child: [] },
            { name: "مدیریت تخصیص", key: "ADMIN-Assign", url: urls.Admin.Assign, child: [] },
            { name: "مدیریت وسیله ها", key: "ADMIN-VEHICLES", url: urls.Admin.Vehicles, child: [] },
            { name: "مدیریت محصولات", key: "ADMIN-PRODUCTS", url: urls.Admin.Products, child: [] }
        ]
    },
    {
        name: "خروج", key: "LOGOUT", url: urls.Auth.Logout, icon: () => <LogOut size={18} />, child: []
    },
];

export default MenuList;