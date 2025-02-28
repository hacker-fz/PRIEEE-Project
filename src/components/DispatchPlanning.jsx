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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Truck,
    Package,
    Calendar,
    User,
    CheckCircle2,
} from "lucide-react";
import { toast } from 'sonner';

// Mock data for dispatch orders
const initialDispatchOrders = [
    {
        id: 'DO-1001',
        destination: 'PDS Store #42',
        address: '123 Main St, City A',
        items: [
            { batchId: 'B-7829', productName: 'Rice (25kg)', quantity: 20 },
            { batchId: 'B-7830', productName: 'Wheat Flour (10kg)', quantity: 15 }
        ],
        scheduledDate: '2025-06-15',
        status: 'Pending',
        priority: 'High',
        vehicle: null,
        driver: null
    },
    {
        id: 'DO-1002',
        destination: 'PDS Store #17',
        address: '456 Oak Ave, City B',
        items: [
            { batchId: 'B-7831', productName: 'Sugar (5kg)', quantity: 30 },
            { batchId: 'B-7834', productName: 'Lentils (5kg)', quantity: 25 }
        ],
        scheduledDate: '2025-06-16',
        status: 'Pending',
        priority: 'Medium',
        vehicle: null,
        driver: null
    },
    {
        id: 'DO-1003',
        destination: 'PDS Store #08',
        address: '789 Pine Rd, City C',
        items: [
            { batchId: 'B-7832', productName: 'Cooking Oil (5L)', quantity: 40 },
            { batchId: 'B-7835', productName: 'Salt (1kg)', quantity: 50 }
        ],
        scheduledDate: '2025-06-15',
        status: 'Pending',
        priority: 'High',
        vehicle: null,
        driver: null
    },
    {
        id: 'DO-1004',
        destination: 'PDS Store #23',
        address: '101 Elm St, City D',
        items: [
            { batchId: 'B-7836', productName: 'Tea (500g)', quantity: 60 },
            { batchId: 'B-7838', productName: 'Pasta (500g)', quantity: 45 }
        ],
        scheduledDate: '2025-06-17',
        status: 'Pending',
        priority: 'Low',
        vehicle: null,
        driver: null
    },
    {
        id: 'DO-1005',
        destination: 'PDS Store #11',
        address: '202 Cedar Ln, City E',
        items: [
            { batchId: 'B-7833', productName: 'Milk Powder (1kg)', quantity: 35 },
            { batchId: 'B-7837', productName: 'Canned Beans (400g)', quantity: 70 }
        ],
        scheduledDate: '2025-06-16',
        status: 'Pending',
        priority: 'Medium',
        vehicle: null,
        driver: null
    }
];

// Mock data for vehicles
const vehicles = [
    { id: 'V-001', type: 'Truck', capacity: '5 tons', status: 'Available', licensePlate: 'ABC-1234' },
    { id: 'V-002', type: 'Van', capacity: '2 tons', status: 'Available', licensePlate: 'DEF-5678' },
    { id: 'V-003', type: 'Truck', capacity: '8 tons', status: 'Available', licensePlate: 'GHI-9012' },
    { id: 'V-004', type: 'Van', capacity: '1.5 tons', status: 'In Maintenance', licensePlate: 'JKL-3456' },
    { id: 'V-005', type: 'Truck', capacity: '10 tons', status: 'Available', licensePlate: 'MNO-7890' }
];

// Mock data for drivers
const drivers = [
    { id: 'D-001', name: 'John Smith', phone: '555-1234', status: 'Available', license: 'DL-123456' },
    { id: 'D-002', name: 'Maria Garcia', phone: '555-5678', status: 'Available', license: 'DL-234567' },
    { id: 'D-003', name: 'David Chen', phone: '555-9012', status: 'On Leave', license: 'DL-345678' },
    { id: 'D-004', name: 'Sarah Johnson', phone: '555-3456', status: 'Available', license: 'DL-456789' },
    { id: 'D-005', name: 'Robert Taylor', phone: '555-7890', status: 'Available', license: 'DL-567890' }
];

const DispatchPlanning = () => {
    const [dispatchOrders, setDispatchOrders] = useState(initialDispatchOrders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState(null);

    // Handle assign vehicle and driver
    const handleAssignResources = () => {
        if (!selectedOrder || !selectedVehicle || !selectedDriver) {
            toast.error('Please select an order, vehicle, and driver');
            return;
        }

        // Update the dispatch order with vehicle and driver
        const updatedOrders = dispatchOrders.map(order => {
            if (order.id === selectedOrder.id) {
                return {
                    ...order,
                    vehicle: selectedVehicle,
                    driver: selectedDriver,
                    status: 'Assigned'
                };
            }
            return order;
        });

        setDispatchOrders(updatedOrders);
        setSelectedOrder(null);
        setSelectedVehicle(null);
        setSelectedDriver(null);
        toast.success('Resources assigned successfully');
    };

    // Handle dispatch order
    const handleDispatchOrder = (orderId) => {
        const updatedOrders = dispatchOrders.map(order => {
            if (order.id === orderId) {
                return {
                    ...order,
                    status: 'Dispatched'
                };
            }
            return order;
        });

        setDispatchOrders(updatedOrders);
        toast.success('Order dispatched successfully');
    };

    // Get priority badge
    const getPriorityBadge = (priority) => {
        switch (priority) {
            case 'High':
                return <Badge className="bg-red-500">{priority}</Badge>;
            case 'Medium':
                return <Badge className="bg-yellow-500">{priority}</Badge>;
            case 'Low':
                return <Badge className="bg-green-500">{priority}</Badge>;
            default:
                return <Badge>{priority}</Badge>;
        }
    };

    // Get status badge
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending':
                return <Badge variant="outline" className="border-yellow-500 text-yellow-500">{status}</Badge>;
            case 'Assigned':
                return <Badge variant="outline" className="border-blue-500 text-blue-500">{status}</Badge>;
            case 'Dispatched':
                return <Badge variant="outline" className="border-green-500 text-green-500">{status}</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Dispatch Planning</h2>

            <Tabs defaultValue="pending">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="pending">Pending Orders</TabsTrigger>
                    <TabsTrigger value="assigned">Assigned Orders</TabsTrigger>
                    <TabsTrigger value="dispatched">Dispatched Orders</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Dispatch Orders</CardTitle>
                            <CardDescription>Orders waiting for vehicle and driver assignment</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Destination</TableHead>
                                        <TableHead>Scheduled Date</TableHead>
                                        <TableHead>Items</TableHead>
                                        <TableHead>Priority</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dispatchOrders
                                        .filter(order => order.status === 'Pending')
                                        .map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-medium">{order.id}</TableCell>
                                                <TableCell>{order.destination}</TableCell>
                                                <TableCell>{order.scheduledDate}</TableCell>
                                                <TableCell>{order.items.length} items</TableCell>
                                                <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                                                <TableCell>{getStatusBadge(order.status)}</TableCell>
                                                <TableCell className="text-right">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => setSelectedOrder(order)}
                                                            >
                                                                Assign Resources
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[600px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Assign Vehicle and Driver</DialogTitle>
                                                                <DialogDescription>
                                                                    Select a vehicle and driver for dispatch order {selectedOrder?.id}
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-6 py-4">
                                                                <div className="space-y-4">
                                                                    <h3 className="text-lg font-medium">Order Details</h3>
                                                                    {selectedOrder && (
                                                                        <div className="grid grid-cols-2 gap-4">
                                                                            <div>
                                                                                <p className="text-sm text-muted-foreground">Destination</p>
                                                                                <p className="font-medium">{selectedOrder.destination}</p>
                                                                                <p className="text-sm">{selectedOrder.address}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm text-muted-foreground">Scheduled Date</p>
                                                                                <p className="font-medium">{selectedOrder.scheduledDate}</p>
                                                                            </div>
                                                                            <div className="col-span-2">
                                                                                <p className="text-sm text-muted-foreground">Items</p>
                                                                                <ul className="text-sm">
                                                                                    {selectedOrder.items.map((item, index) => (
                                                                                        <li key={index}>
                                                                                            {item.quantity} x {item.productName} ({item.batchId})
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className="space-y-4">
                                                                    <h3 className="text-lg font-medium">Select Vehicle</h3>
                                                                    <div className="grid grid-cols-1 gap-4">
                                                                        {vehicles
                                                                            .filter(vehicle => vehicle.status === 'Available')
                                                                            .map((vehicle) => (
                                                                                <div
                                                                                    key={vehicle.id}
                                                                                    className={`p-4 rounded-md border cursor-pointer ${selectedVehicle?.id === vehicle.id ? 'border-primary bg-accent' : 'border-border'}`}
                                                                                    onClick={() => setSelectedVehicle(vehicle)}
                                                                                >
                                                                                    <div className="flex items-center justify-between">
                                                                                        <div className="flex items-center gap-3">
                                                                                            <Truck className="h-5 w-5" />
                                                                                            <div>
                                                                                                <p className="font-medium">{vehicle.id} - {vehicle.type}</p>
                                                                                                <p className="text-sm text-muted-foreground">
                                                                                                    Capacity: {vehicle.capacity} | License: {vehicle.licensePlate}
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                        {selectedVehicle?.id === vehicle.id && (
                                                                                            <CheckCircle2 className="h-5 w-5 text-primary" />
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-4">
                                                                    <h3 className="text-lg font-medium">Select Driver</h3>
                                                                    <div className="grid grid-cols-1 gap-4">
                                                                        {drivers
                                                                            .filter(driver => driver.status === 'Available')
                                                                            .map((driver) => (
                                                                                <div
                                                                                    key={driver.id}
                                                                                    className={`p-4 rounded-md border cursor-pointer ${selectedDriver?.id === driver.id ? 'border-primary bg-accent' : 'border-border'}`}
                                                                                    onClick={() => setSelectedDriver(driver)}
                                                                                >
                                                                                    <div className="flex items-center justify-between">
                                                                                        <div className="flex items-center gap-3">
                                                                                            <User className="h-5 w-5" />
                                                                                            <div>
                                                                                                <p className="font-medium">{driver.name} ({driver.id})</p>
                                                                                                <p className="text-sm text-muted-foreground">
                                                                                                    Phone: {driver.phone} | License: {driver.license}
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                        {selectedDriver?.id === driver.id && (
                                                                                            <CheckCircle2 className="h-5 w-5 text-primary" />
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <DialogFooter>
                                                                <Button onClick={handleAssignResources}>Assign Resources</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="assigned" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Assigned Dispatch Orders</CardTitle>
                            <CardDescription>Orders with assigned vehicles and drivers ready for dispatch</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Destination</TableHead>
                                        <TableHead>Scheduled Date</TableHead>
                                        <TableHead>Vehicle</TableHead>
                                        <TableHead>Driver</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dispatchOrders
                                        .filter(order => order.status === 'Assigned')
                                        .map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-medium">{order.id}</TableCell>
                                                <TableCell>{order.destination}</TableCell>
                                                <TableCell>{order.scheduledDate}</TableCell>
                                                <TableCell>{order.vehicle?.id} ({order.vehicle?.type})</TableCell>
                                                <TableCell>{order.driver?.name}</TableCell>
                                                <TableCell>{getStatusBadge(order.status)}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={() => handleDispatchOrder(order.id)}
                                                    >
                                                        Dispatch Now
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="dispatched" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dispatched Orders</CardTitle>
                            <CardDescription>Orders that have been dispatched and are in transit</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Destination</TableHead>
                                        <TableHead>Scheduled Date</TableHead>
                                        <TableHead>Vehicle</TableHead>
                                        <TableHead>Driver</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dispatchOrders
                                        .filter(order => order.status === 'Dispatched')
                                        .map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-medium">{order.id}</TableCell>
                                                <TableCell>{order.destination}</TableCell>
                                                <TableCell>{order.scheduledDate}</TableCell>
                                                <TableCell>{order.vehicle?.id} ({order.vehicle?.type})</TableCell>
                                                <TableCell>{order.driver?.name}</TableCell>
                                                <TableCell>{getStatusBadge(order.status)}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        Track Delivery
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Resource Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Truck className="h-5 w-5" />
                            Vehicle Fleet Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {vehicles.map((vehicle) => (
                                <div key={vehicle.id} className="flex items-center justify-between p-3 rounded-md bg-accent">
                                    <div>
                                        <p className="font-medium">{vehicle.id} - {vehicle.type}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Capacity: {vehicle.capacity} | License: {vehicle.licensePlate}
                                        </p>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={vehicle.status === 'Available' ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}
                                    >
                                        {vehicle.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Driver Availability
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {drivers.map((driver) => (
                                <div key={driver.id} className="flex items-center justify-between p-3 rounded-md bg-accent">
                                    <div>
                                        <p className="font-medium">{driver.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            ID: {driver.id} | Phone: {driver.phone}
                                        </p>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={driver.status === 'Available' ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}
                                    >
                                        {driver.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Dispatch Calendar */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Dispatch Calendar
                    </CardTitle>
                    <CardDescription>Upcoming scheduled dispatches</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {['2025-06-15', '2025-06-16', '2025-06-17'].map((date) => (
                            <div key={date} className="space-y-2">
                                <h3 className="font-medium">{date}</h3>
                                <div className="space-y-2">
                                    {dispatchOrders
                                        .filter(order => order.scheduledDate === date)
                                        .map((order) => (
                                            <div key={order.id} className="flex items-center justify-between p-3 rounded-md bg-accent">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-full ${order.priority === 'High' ? 'bg-red-500/10 text-red-500' :
                                                        order.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                                                            'bg-green-500/10 text-green-500'
                                                        }`}>
                                                        <Package className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{order.id} - {order.destination}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {order.items.length} items | Status: {order.status}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {getPriorityBadge(order.priority)}
                                                    {getStatusBadge(order.status)}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DispatchPlanning;