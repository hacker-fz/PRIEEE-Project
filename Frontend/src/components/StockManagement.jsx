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
    AlertTriangle,
    ChevronRight,
    Loader2,
    Package,
    CalendarDays,
    MapPin,
    Boxes,
    Gauge
} from "lucide-react";
import { toast } from 'sonner';
import { initialStockData } from '@/constants';

const StockManagement = () => {
    const [stockData, setStockData] = useState(initialStockData);
    const [searchTerm, setSearchTerm] = useState('');
    const [editItem, setEditItem] = useState(null);
    const [newItem, setNewItem] = useState({
        batchId: '',
        productName: '',
        category: '',
        quantity: '',
        expiryDate: '',
        location: '',
        status: 'In Stock'
    });
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const filteredStock = stockData.filter(item =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditItem = (item) => {
        setEditItem({ ...item });
        setEditDialogOpen(true);
    };

    const handleUpdateItem = async () => {
        setIsUpdating(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setStockData(stockData.map(item => item.id === editItem.id ? editItem : item));
        setEditItem(null);
        setEditDialogOpen(false);
        setIsUpdating(false);
        toast.success('Stock item updated successfully');
    };

    const handleDeleteItem = async (id) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setStockData(stockData.filter(item => item.id !== id));
        toast.success('Stock item deleted successfully');
    };

    const handleAddItem = async () => {
        setIsAdding(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const newId = Math.max(...stockData.map(item => item.id)) + 1;
        setStockData([...stockData, { id: newId, ...newItem }]);
        setNewItem({
            batchId: '',
            productName: '',
            category: '',
            quantity: '',
            expiryDate: '',
            location: '',
            status: 'In Stock'
        });
        setAddDialogOpen(false);
        setIsAdding(false);
        toast.success('New stock item added successfully');
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'In Stock':
                return <Badge className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">{status}</Badge>;
            case 'Low Stock':
                return <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">{status}</Badge>;
            case 'Critical Stock':
                return <Badge className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">{status}</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    const isExpiringSoon = (expiryDate) => {
        const expiry = new Date(expiryDate);
        const threeMonthsFromNow = new Date();
        threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
        return expiry < threeMonthsFromNow;
    };

    // Calculate summary metrics
    const totalItems = stockData.length;
    const lowStockItems = stockData.filter(item => item.status === 'Low Stock').length;
    const criticalStockItems = stockData.filter(item => item.status === 'Critical Stock').length;
    const expiringSoonItems = stockData.filter(item => isExpiringSoon(item.expiryDate)).length;

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Stock Management
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage your warehouse inventory and track stock levels
                    </p>
                </div>

                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="group">
                            <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                            Add New Stock
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-primary" />
                                Add New Stock Item
                            </DialogTitle>
                            <DialogDescription>
                                Enter the details of the new stock item to add to inventory.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="batchId">Batch ID</Label>
                                    <Input
                                        id="batchId"
                                        value={newItem.batchId}
                                        onChange={(e) => setNewItem({ ...newItem, batchId: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="productName">Product Name</Label>
                                    <Input
                                        id="productName"
                                        value={newItem.productName}
                                        onChange={(e) => setNewItem({ ...newItem, productName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        value={newItem.category}
                                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        value={newItem.quantity}
                                        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiryDate">Expiry Date</Label>
                                    <Input
                                        id="expiryDate"
                                        type="date"
                                        value={newItem.expiryDate}
                                        onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={newItem.location}
                                        onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddItem} disabled={isAdding}>
                                {isAdding ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Adding...
                                    </>
                                ) : 'Add Stock Item'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                        <Boxes className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalItems}</div>
                        <p className="text-xs text-muted-foreground">All inventory items</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{lowStockItems}</div>
                        <p className="text-xs text-muted-foreground">Items below optimal levels</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Critical Stock</CardTitle>
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{criticalStockItems}</div>
                        <p className="text-xs text-muted-foreground">Urgent replenishment needed</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                        <CalendarDays className="h-5 w-5 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{expiringSoonItems}</div>
                        <p className="text-xs text-muted-foreground">Within next 3 months</p>
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
                                placeholder="Search by product name, batch ID, or category..."
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

            {/* Stock table */}
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-primary" />
                        Stock Inventory
                    </CardTitle>
                    <CardDescription>
                        Manage your warehouse stock inventory, update quantities, and track expiry dates.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[120px]">Batch ID</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="w-[100px]">Quantity</TableHead>
                                <TableHead className="w-[120px]">Expiry Date</TableHead>
                                <TableHead className="w-[120px]">Location</TableHead>
                                <TableHead className="w-[120px]">Status</TableHead>
                                <TableHead className="w-[120px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredStock.map((item) => (
                                <TableRow key={item.id} className="group">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Boxes className="h-4 w-4 text-muted-foreground" />
                                            {item.batchId}
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.productName}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-xs">
                                            {item.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Gauge className="h-4 w-4 text-muted-foreground" />
                                            {item.quantity}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                            {item.expiryDate}
                                            {isExpiringSoon(item.expiryDate) && (
                                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            {item.location}
                                        </div>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Dialog open={editDialogOpen && editItem?.id === item.id} onOpenChange={(open) => {
                                                if (!open) setEditItem(null);
                                                setEditDialogOpen(open);
                                            }}>
                                                <DialogTrigger asChild>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon"
                                                        className="hover:bg-primary/10 hover:text-primary"
                                                        onClick={() => handleEditItem(item)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[500px]">
                                                    <DialogHeader>
                                                        <DialogTitle className="flex items-center gap-2">
                                                            <Edit className="h-5 w-5 text-primary" />
                                                            Edit Stock Item
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Update the details of the stock item.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    {editItem && (
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="edit-batchId">Batch ID</Label>
                                                                    <Input
                                                                        id="edit-batchId"
                                                                        value={editItem.batchId}
                                                                        onChange={(e) => setEditItem({ ...editItem, batchId: e.target.value })}
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="edit-productName">Product Name</Label>
                                                                    <Input
                                                                        id="edit-productName"
                                                                        value={editItem.productName}
                                                                        onChange={(e) => setEditItem({ ...editItem, productName: e.target.value })}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="edit-category">Category</Label>
                                                                    <Input
                                                                        id="edit-category"
                                                                        value={editItem.category}
                                                                        onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="edit-quantity">Quantity</Label>
                                                                    <Input
                                                                        id="edit-quantity"
                                                                        type="number"
                                                                        value={editItem.quantity}
                                                                        onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="edit-expiryDate">Expiry Date</Label>
                                                                    <Input
                                                                        id="edit-expiryDate"
                                                                        type="date"
                                                                        value={editItem.expiryDate}
                                                                        onChange={(e) => setEditItem({ ...editItem, expiryDate: e.target.value })}
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="edit-location">Location</Label>
                                                                    <Input
                                                                        id="edit-location"
                                                                        value={editItem.location}
                                                                        onChange={(e) => setEditItem({ ...editItem, location: e.target.value })}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="edit-status">Status</Label>
                                                                <select
                                                                    id="edit-status"
                                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={editItem.status}
                                                                    onChange={(e) => setEditItem({ ...editItem, status: e.target.value })}
                                                                >
                                                                    <option value="In Stock">In Stock</option>
                                                                    <option value="Low Stock">Low Stock</option>
                                                                    <option value="Critical Stock">Critical Stock</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <DialogFooter>
                                                        <Button onClick={handleUpdateItem} disabled={isUpdating}>
                                                            {isUpdating ? (
                                                                <>
                                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                    Updating...
                                                                </>
                                                            ) : 'Update Stock'}
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="hover:bg-destructive/10 hover:text-destructive"
                                                onClick={() => handleDeleteItem(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Stock Alerts */}
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        Stock Alerts
                    </CardTitle>
                    <CardDescription>Items requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {stockData
                            .filter(item => item.status === 'Low Stock' || item.status === 'Critical Stock' || isExpiringSoon(item.expiryDate))
                            .map((item) => (
                                <div 
                                    key={item.id} 
                                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${
                                            item.status === 'Critical Stock' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                                            item.status === 'Low Stock' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                                            'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                                        }`}>
                                            <AlertTriangle className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.productName} ({item.batchId})</p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.status === 'Low Stock' || item.status === 'Critical Stock'
                                                    ? `${item.status}: Only ${item.quantity} units remaining`
                                                    : `Expires soon: ${item.expiryDate}`}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                                        Take Action <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StockManagement;
