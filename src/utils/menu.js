// Updated Menu Structure
const menu = [
    {
        id: 0,
        displayName: 'Dashboard',
        path: 'dashboard',
        role: ['admin', 'manager', 'employee'], // Access for all roles
    },
    {
        id: 1,
        displayName: 'Admin Panel',
        path: 'admin',
        role: ['admin'], // Access for admin only
    },
    {
        id: 2,
        displayName: 'Manage Users',
        path: 'users',
        role: ['admin'], // Access for admin only
    },
    {
        id: 3,
        displayName: 'My Profile',
        path: 'users',
        role: ['admin', 'manager', 'employee'], // Access for all roles
    },
];

// Function to Get Menu Items Based on User Role
export const getMenu = (userRole) => {
    // Ensure role is lowercase for comparison and filter menu items
    return menu.filter((item) => item.role.includes(userRole.toLowerCase()));
};

export default menu;
