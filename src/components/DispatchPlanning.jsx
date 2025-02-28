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
import { drivers, initialDispatchOrders, vehicles } from '@/constants';

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
            <h2 className="text-3xl font-bold tracking-tight primary-text-gradient">Dispatch Planning</h2>

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