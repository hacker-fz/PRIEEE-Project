import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    User,
    UserPlus,
    UserCheck,
    UserX,
    Shield,
    Mail,
    Phone,
    ChevronRight,
    Loader2,
    RotateCw
} from "lucide-react";
import { toast } from 'sonner';

// Mock user data
const initialUsers = [
    {
        id: 'USR-1001',
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        phone: '+1 (555) 123-4567',
        role: 'Admin',
        status: 'Active',
        lastActive: '2023-06-15 09:42',
        department: 'Management'
    },
    {
        id: 'USR-1002',
        name: 'Maria Garcia',
        email: 'maria.g@example.com',
        phone: '+1 (555) 987-6543',
        role: 'Manager',
        status: 'Active',
        lastActive: '2023-06-14 14:30',
        department: 'Operations'
    },
    {
        id: 'USR-1003',
        name: 'James Wilson',
        email: 'james.w@example.com',
        phone: '+1 (555) 456-7890',
        role: 'Supervisor',
        status: 'Inactive',
        lastActive: '2023-06-10 11:15',
        department: 'Warehouse'
    },
    {
        id: 'USR-1004',
        name: 'Sarah Chen',
        email: 'sarah.chen@example.com',
        phone: '+1 (555) 789-0123',
        role: 'Operator',
        status: 'Active',
        lastActive: '2023-06-15 08:20',
        department: 'Logistics'
    },
    {
        id: 'USR-1005',
        name: 'David Kim',
        email: 'david.kim@example.com',
        phone: '+1 (555) 321-6547',
        role: 'Analyst',
        status: 'Pending',
        lastActive: '2023-06-12 16:45',
        department: 'Analytics'
    }
];

const UserManagement = () => {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [editUser, setEditUser] = useState(null);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'Operator',
        department: 'Logistics'
    });
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle refresh data
    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            toast.success('User data refreshed');
        }, 1000);
    };

    // Handle edit user
    const handleEditUser = (user) => {
        setEditUser({ ...user });
        setEditDialogOpen(true);
    };

    // Handle update user
    const handleUpdateUser = async () => {
        setIsUpdating(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setUsers(users.map(user => user.id === editUser.id ? editUser : user));
        setEditUser(null);
        setEditDialogOpen(false);
        setIsUpdating(false);
        toast.success('User updated successfully');
    };

    // Handle delete user
    const handleDeleteUser = async (userId) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setUsers(users.filter(user => user.id !== userId));
        toast.success('User deleted successfully');
    };

    // Handle add new user
    const handleAddUser = async () => {
        setIsAdding(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const newId = `USR-${Math.floor(1000 + Math.random() * 9000)}`;
        setUsers([...users, { 
            id: newId, 
            ...newUser,
            status: 'Active',
            lastActive: new Date().toISOString()
        }]);
        setNewUser({
            name: '',
            email: '',
            phone: '',
            role: 'Operator',
            department: 'Logistics'
        });
        setAddDialogOpen(false);
        setIsAdding(false);
        toast.success('New user added successfully');
    };

    // Handle change user status
    const handleChangeStatus = async (userId, newStatus) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const updatedUsers = users.map(user => {
            if (user.id === userId) {
                return {
                    ...user,
                    status: newStatus
                };
            }
            return user;
        });

        setUsers(updatedUsers);
        toast.success(`User status changed to ${newStatus}`);
    };

    // Get status badge
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Active':
                return <Badge className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">{status}</Badge>;
            case 'Inactive':
                return <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">{status}</Badge>;
            case 'Pending':
                return <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">{status}</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    // Get role badge
    const getRoleBadge = (role) => {
        switch (role) {
            case 'Admin':
                return <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">{role}</Badge>;
            case 'Manager':
                return <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">{role}</Badge>;
            case 'Supervisor':
                return <Badge className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">{role}</Badge>;
            default:
                return <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">{role}</Badge>;
        }
    };

    // Calculate user statistics
    const activeUsers = users.filter(user => user.status === 'Active').length;
    const inactiveUsers = users.filter(user => user.status === 'Inactive').length;
    const pendingUsers = users.filter(user => user.status === 'Pending').length;
    const adminUsers = users.filter(user => user.role === 'Admin').length;

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        User Management
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage system users, roles, and permissions
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        onClick={handleRefresh} 
                        disabled={refreshing}
                        className="group"
                    >
                        <RotateCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform'}`} />
                        Refresh
                    </Button>
                    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="group">
                                <UserPlus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                Add User
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <UserPlus className="h-5 w-5 text-primary" />
                                    Add New User
                                </DialogTitle>
                                <DialogDescription>
                                    Enter the details of the new system user
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        value={newUser.phone}
                                        onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="role">Role</Label>
                                        <select
                                            id="role"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={newUser.role}
                                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Supervisor">Supervisor</option>
                                            <option value="Operator">Operator</option>
                                            <option value="Analyst">Analyst</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <select
                                            id="department"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={newUser.department}
                                            onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                                        >
                                            <option value="Management">Management</option>
                                            <option value="Operations">Operations</option>
                                            <option value="Warehouse">Warehouse</option>
                                            <option value="Logistics">Logistics</option>
                                            <option value="Analytics">Analytics</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleAddUser} disabled={isAdding}>
                                    {isAdding ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Adding...
                                        </>
                                    ) : 'Add User'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <UserCheck className="h-4 w-4 text-green-500" />
                            Active Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeUsers}</div>
                        <p className="text-xs text-muted-foreground">Currently active in system</p>
                        <div className="mt-4 h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-green-500 rounded-full" 
                                style={{ width: `${(activeUsers / users.length) * 100}%` }}
                            ></div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <UserX className="h-4 w-4 text-gray-500" />
                            Inactive Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{inactiveUsers}</div>
                        <p className="text-xs text-muted-foreground">Disabled accounts</p>
                        <div className="mt-4 h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gray-500 rounded-full" 
                                style={{ width: `${(inactiveUsers / users.length) * 100}%` }}
                            ></div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <User className="h-4 w-4 text-yellow-500" />
                            Pending Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingUsers}</div>
                        <p className="text-xs text-muted-foreground">Awaiting activation</p>
                        <div className="mt-4 h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-yellow-500 rounded-full" 
                                style={{ width: `${(pendingUsers / users.length) * 100}%` }}
                            ></div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Shield className="h-4 w-4 text-purple-500" />
                            Admin Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{adminUsers}</div>
                        <p className="text-xs text-muted-foreground">With full privileges</p>
                        <div className="mt-4 h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-purple-500 rounded-full" 
                                style={{ width: `${(adminUsers / users.length) * 100}%` }}
                            ></div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and filter */}
            <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, email, or user ID..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            Filters
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Users table */}
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        System Users
                    </CardTitle>
                    <CardDescription>
                        Manage all user accounts and their permissions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[120px]">User ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead className="w-[120px]">Role</TableHead>
                                <TableHead className="w-[120px]">Status</TableHead>
                                <TableHead className="w-[140px]">Last Active</TableHead>
                                <TableHead className="w-[150px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id} className="group">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            {user.id}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-sm text-muted-foreground">{user.department}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{user.phone}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{user.lastActive}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Dialog open={editDialogOpen && editUser?.id === user.id} onOpenChange={(open) => {
                                                if (!open) setEditUser(null);
                                                setEditDialogOpen(open);
                                            }}>
                                                <DialogTrigger asChild>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon"
                                                        className="hover:bg-primary/10 hover:text-primary"
                                                        onClick={() => handleEditUser(user)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[500px]">
                                                    <DialogHeader>
                                                        <DialogTitle className="flex items-center gap-2">
                                                            <Edit className="h-5 w-5 text-primary" />
                                                            Edit User
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Update user details and permissions
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    {editUser && (
                                                        <div className="grid gap-4 py-4">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="edit-name">Full Name</Label>
                                                                <Input
                                                                    id="edit-name"
                                                                    value={editUser.name}
                                                                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="edit-email">Email</Label>
                                                                <Input
                                                                    id="edit-email"
                                                                    type="email"
                                                                    value={editUser.email}
                                                                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="edit-phone">Phone</Label>
                                                                <Input
                                                                    id="edit-phone"
                                                                    value={editUser.phone}
                                                                    onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="edit-role">Role</Label>
                                                                    <select
                                                                        id="edit-role"
                                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                                        value={editUser.role}
                                                                        onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                                                                    >
                                                                        <option value="Admin">Admin</option>
                                                                        <option value="Manager">Manager</option>
                                                                        <option value="Supervisor">Supervisor</option>
                                                                        <option value="Operator">Operator</option>
                                                                        <option value="Analyst">Analyst</option>
                                                                    </select>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="edit-department">Department</Label>
                                                                    <select
                                                                        id="edit-department"
                                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                                        value={editUser.department}
                                                                        onChange={(e) => setEditUser({ ...editUser, department: e.target.value })}
                                                                    >
                                                                        <option value="Management">Management</option>
                                                                        <option value="Operations">Operations</option>
                                                                        <option value="Warehouse">Warehouse</option>
                                                                        <option value="Logistics">Logistics</option>
                                                                        <option value="Analytics">Analytics</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="edit-status">Status</Label>
                                                                <select
                                                                    id="edit-status"
                                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={editUser.status}
                                                                    onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
                                                                >
                                                                    <option value="Active">Active</option>
                                                                    <option value="Inactive">Inactive</option>
                                                                    <option value="Pending">Pending</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <DialogFooter>
                                                        <Button onClick={handleUpdateUser} disabled={isUpdating}>
                                                            {isUpdating ? (
                                                                <>
                                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                    Updating...
                                                                </>
                                                            ) : 'Update User'}
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="hover:bg-destructive/10 hover:text-destructive"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            {user.status === 'Active' ? (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="hover:bg-gray-100 hover:text-gray-700"
                                                    onClick={() => handleChangeStatus(user.id, 'Inactive')}
                                                >
                                                    <UserX className="h-4 w-4" />
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="hover:bg-green-100 hover:text-green-700"
                                                    onClick={() => handleChangeStatus(user.id, 'Active')}
                                                >
                                                    <UserCheck className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        Recent User Activity
                    </CardTitle>
                    <CardDescription>Latest actions performed by system users</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            {
                                user: 'Alex Johnson (Admin)',
                                action: 'Updated inventory settings',
                                time: '10 minutes ago',
                                icon: <Shield className="h-5 w-5 text-purple-500" />
                            },
                            {
                                user: 'Maria Garcia (Manager)',
                                action: 'Approved new dispatch order',
                                time: '25 minutes ago',
                                icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
                            },
                            {
                                user: 'Sarah Chen (Operator)',
                                action: 'Processed 12 stock items',
                                time: '1 hour ago',
                                icon: <Package className="h-5 w-5 text-blue-500" />
                            },
                            {
                                user: 'James Wilson (Supervisor)',
                                action: 'Completed warehouse audit',
                                time: '3 hours ago',
                                icon: <ClipboardCheck className="h-5 w-5 text-cyan-500" />
                            },
                            {
                                user: 'David Kim (Analyst)',
                                action: 'Generated monthly report',
                                time: '5 hours ago',
                                icon: <BarChart2 className="h-5 w-5 text-orange-500" />
                            }
                        ].map((activity, index) => (
                            <div 
                                key={index} 
                                className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                            >
                                <div className="p-2 rounded-lg bg-accent">
                                    {activity.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <p className="font-medium">{activity.user}</p>
                                        <span className="text-sm text-muted-foreground">{activity.time}</span>
                                    </div>
                                    <p className="text-sm">{activity.action}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserManagement;
