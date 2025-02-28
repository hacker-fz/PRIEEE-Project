import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
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
    AlertTriangle
} from "lucide-react";
import { toast } from 'sonner';

// Mock data for stock items
const initialStockData = [
    { id: 1, batchId: 'B-7829', productName: 'Rice (25kg)', category: 'Grains', quantity: 145, expiryDate: '2025-12-15', location: 'Zone A, Rack 12', status: 'In Stock' },
    { id: 2, batchId: 'B-7830', productName: 'Wheat Flour (10kg)', category: 'Grains', quantity: 230, expiryDate: '2025-10-20', location: 'Zone A, Rack 14', status: 'In Stock' },
    { id: 3, batchId: 'B-7831', productName: 'Sugar (5kg)', category: 'Sweeteners', quantity: 180, expiryDate: '2026-01-10', location: 'Zone A, Rack 15', status: 'In Stock' },
    { id: 4, batchId: 'B-7832', productName: 'Cooking Oil (5L)', category: 'Oils', quantity: 120, expiryDate: '2025-08-05', location: 'Zone B, Rack 3', status: 'Low Stock' },
    { id: 5, batchId: 'B-7833', productName: 'Milk Powder (1kg)', category: 'Dairy', quantity: 90, expiryDate: '2025-06-30', location: 'Zone B, Rack 5', status: 'Low Stock' },
    { id: 6, batchId: 'B-7834', productName: 'Lentils (5kg)', category: 'Pulses', quantity: 200, expiryDate: '2026-02-15', location: 'Zone A, Rack 18', status: 'In Stock' },
    { id: 7, batchId: 'B-7835', productName: 'Salt (1kg)', category: 'Condiments', quantity: 300, expiryDate: '2027-01-01', location: 'Zone A, Rack 20', status: 'In Stock' },
    { id: 8, batchId: 'B-7836', productName: 'Tea (500g)', category: 'Beverages', quantity: 150, expiryDate: '2025-09-12', location: 'Zone B, Rack 8', status: 'In Stock' },
    { id: 9, batchId: 'B-7837', productName: 'Canned Beans (400g)', category: 'Canned Goods', quantity: 25, expiryDate: '2025-05-20', location: 'Zone C, Rack 2', status: 'Critical Stock' },
    { id: 10, batchId: 'B-7838', productName: 'Pasta (500g)', category: 'Grains', quantity: 175, expiryDate: '2025-11-30', location: 'Zone A, Rack 16', status: 'In Stock' },
];

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

    // Filter stock data based on search term
    const filteredStock = stockData.filter(item =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle edit item
    const handleEditItem = (item) => {
        setEditItem({ ...item });
    };

    // Handle update item
    const handleUpdateItem = () => {
        setStockData(stockData.map(item => item.id === editItem.id ? editItem : item));
        setEditItem(null);
        toast.success('Stock item updated successfully');
    };

    // Handle delete item
    const handleDeleteItem = (id) => {
        setStockData(stockData.filter(item => item.id !== id));
        toast.success('Stock item deleted successfully');
    };

    // Handle add new item
    const handleAddItem = () => {
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
        toast.success('New stock item added successfully');
    };

    // Get status badge color
    const getStatusBadge = (status) => {
        switch (status) {
            case 'In Stock':
                return <Badge className="bg-green-500">{status}</Badge>;
            case 'Low Stock':
                return <Badge className="bg-yellow-500">{status}</Badge>;
            case 'Critical Stock':
                return <Badge className="bg-red-500">{status}</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Stock Management</h2>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Stock
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Add New Stock Item</DialogTitle>
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
                            <Button onClick={handleAddItem}>Add Stock Item</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Search and filter */}
            <Card>
                <CardContent className="p-6">
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
            <Card>
                <CardHeader>
                    <CardTitle>Stock Inventory</CardTitle>
                    <CardDescription>
                        Manage your warehouse stock inventory, update quantities, and track expiry dates.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Batch ID</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Expiry Date</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredStock.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.batchId}</TableCell>
                                    <TableCell>{item.productName}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>
                                        {item.expiryDate}
                                        {new Date(item.expiryDate) < new Date(new Date().setMonth(new Date().getMonth() + 3)) && (
                                            <AlertTriangle className="inline ml-2 h-4 w-4 text-yellow-500" />
                                        )}
                                    </TableCell>
                                    <TableCell>{item.location}</TableCell>
                                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[500px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Stock Item</DialogTitle>
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
                                                        <Button onClick={handleUpdateItem}>Update Stock</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <Button
                                                variant="ghost"
                                                size="icon"
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
            <Card>
                <CardHeader>
                    <CardTitle>Stock Alerts</CardTitle>
                    <CardDescription>Items requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {stockData
                            .filter(item => item.status === 'Low Stock' || item.status === 'Critical Stock' || new Date(item.expiryDate) < new Date(new Date().setMonth(new Date().getMonth() + 3)))
                            .map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 rounded-md bg-accent">
                                    <div className="flex items-center gap-4">
                                        <AlertTriangle className={`h-5 w-5 ${item.status === 'Critical Stock' ? 'text-red-500' : 'text-yellow-500'}`} />
                                        <div>
                                            <p className="font-medium">{item.productName} ({item.batchId})</p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.status === 'Low Stock' || item.status === 'Critical Stock'
                                                    ? `${item.status}: Only ${item.quantity} units remaining`
                                                    : `Expires soon: ${item.expiryDate}`}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">Take Action</Button>
                                </div>
                            ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StockManagement;