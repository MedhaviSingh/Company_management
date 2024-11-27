const menu = [
    {
        id: 0,
        displayName: 'Dashboard',
        path: 'dashboard',
        role: ['admin', 'manager', 'employee'], 
    },
    {
        id: 1,
        displayName: 'My Profile',
        path: 'users',
        role: ['admin', 'manager', 'employee'], 
    },
];

export const getMenu = (userRole) => {
    return menu.filter((item) => item.role.includes(userRole.toLowerCase()));
};

export default menu;
