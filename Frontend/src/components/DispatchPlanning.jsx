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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Truck,
    Package,
    Calendar,
    User,
    CheckCircle2,
    ChevronRight,
    Clock,
    AlertTriangle,
    Loader2,
    MapPin
} from "lucide-react";
import { toast } from 'sonner';
import { drivers, initialDispatchOrders, vehicles } from '@/constants';

const DispatchPlanning = () => {
    const [dispatchOrders, setDispatchOrders] = useState(initialDispatchOrders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [isAssigning, setIsAssigning] = useState(false);
    const [isDispatching, setIsDispatching] = useState(false);

    const handleAssignResources = async () => {
        if (!selectedOrder || !selectedVehicle || !selectedDriver) {
            toast.error('Please select an order, vehicle, and driver');
            return;
        }

        setIsAssigning(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const updatedOrders = dispatchOrders.map(order => {
            if (order.id === selectedOrder.id) {
                return {
                    ...order,
                    vehicle: selectedVehicle,
                    driver: selectedDriver,
                    status: 'Assigned',
                    assignedAt: new Date().toISOString()
                };
            }
            return order;
        });

        setDispatchOrders(updatedOrders);
        setSelectedOrder(null);
        setSelectedVehicle(null);
        setSelectedDriver(null);
        setIsAssigning(false);
        toast.success('Resources assigned successfully');
    };

    const handleDispatchOrder = async (orderId) => {
        setIsDispatching(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        const updatedOrders = dispatchOrders.map(order => {
            if (order.id === orderId) {
                return {
                    ...order,
                    status: 'Dispatched',
                    dispatchedAt: new Date().toISOString()
                };
            }
            return order;
        });

        setDispatchOrders(updatedOrders);
        setIsDispatching(false);
        toast.success('Order dispatched successfully');
    };

    const getPriorityBadge = (priority) => {
        switch (priority) {
            case 'High':
                return <Badge className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">{priority}</Badge>;
            case 'Medium':
                return <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">{priority}</Badge>;
            case 'Low':
                return <Badge className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">{priority}</Badge>;
            default:
                return <Badge>{priority}</Badge>;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending':
                return <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400">{status}</Badge>;
            case 'Assigned':
                return <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400">{status}</Badge>;
            case 'Dispatched':
                return <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400">{status}</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getVehicleStatusBadge = (status) => {
        return (
            <Badge
                variant="outline"
                className={status === 'Available' ? 
                    'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400' : 
                    'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
                }
            >
                {status}
            </Badge>
        );
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Dispatch Planning
                </h2>
                <div className="text-sm text-muted-foreground flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Last updated: Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
            </div>

            <Tabs defaultValue="pending">
                <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                    <TabsTrigger value="pending" className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Pending
                    </TabsTrigger>
                    <TabsTrigger value="assigned" className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        Assigned
                    </TabsTrigger>
                    <TabsTrigger value="dispatched" className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Dispatched
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-6">
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-5 w-5 text-yellow-500" />
                                        Pending Dispatch Orders
                                    </CardTitle>
                                    <CardDescription>Orders waiting for vehicle and driver assignment</CardDescription>
                                </div>
                                <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400">
                                    {dispatchOrders.filter(o => o.status === 'Pending').length} orders
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="w-[120px]">Order ID</TableHead>
                                        <TableHead>Destination</TableHead>
                                        <TableHead className="w-[140px]">Scheduled</TableHead>
                                        <TableHead className="w-[100px]">Items</TableHead>
                                        <TableHead className="w-[120px]">Priority</TableHead>
                                        <TableHead className="w-[120px]">Status</TableHead>
                                        <TableHead className="w-[150px] text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dispatchOrders
                                        .filter(order => order.status === 'Pending')
                                        .map((order) => (
                                            <TableRow key={order.id} className="group">
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <Package className="h-4 w-4 text-muted-foreground" />
                                                        {order.id}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                                        {order.destination}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        {order.scheduledDate}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="bg-gray-50 dark:bg-gray-900/20">
                                                        {order.items.length} items
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                                                <TableCell>{getStatusBadge(order.status)}</TableCell>
                                                <TableCell className="text-right">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="group-hover:bg-primary/10 group-hover:text-primary"
                                                                onClick={() => setSelectedOrder(order)}
                                                            >
                                                                Assign Resources
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-hidden flex flex-col">
                                                            <DialogHeader>
                                                                <DialogTitle className="flex items-center gap-2">
                                                                    <Package className="h-5 w-5 text-primary" />
                                                                    Assign Resources
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    Select a vehicle and driver for dispatch order {selectedOrder?.id}
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="flex-1 overflow-y-auto pr-2">
                                                                <div className="space-y-6 py-4">
                                                                    <div className="space-y-3 rounded-lg border p-4">
                                                                        <h3 className="text-lg font-medium flex items-center gap-2">
                                                                            <Package className="h-5 w-5" />
                                                                            Order Details
                                                                        </h3>
                                                                        {selectedOrder && (
                                                                            <div className="grid grid-cols-2 gap-4">
                                                                                <div className="space-y-1">
                                                                                    <p className="text-sm text-muted-foreground">Destination</p>
                                                                                    <p className="font-medium">{selectedOrder.destination}</p>
                                                                                    <p className="text-sm">{selectedOrder.address}</p>
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <p className="text-sm text-muted-foreground">Scheduled Date</p>
                                                                                    <p className="font-medium">{selectedOrder.scheduledDate}</p>
                                                                                </div>
                                                                                <div className="col-span-2 space-y-1">
                                                                                    <p className="text-sm text-muted-foreground">Items</p>
                                                                                    <ul className="text-sm space-y-1">
                                                                                        {selectedOrder.items.map((item, index) => (
                                                                                            <li key={index} className="flex items-center gap-2">
                                                                                                <span className="font-medium">{item.quantity}x</span>
                                                                                                <span>{item.productName}</span>
                                                                                                <Badge variant="outline" className="text-xs">{item.batchId}</Badge>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    <div className="space-y-3 rounded-lg border p-4">
                                                                        <h3 className="text-lg font-medium flex items-center gap-2">
                                                                            <Truck className="h-5 w-5" />
                                                                            Select Vehicle
                                                                        </h3>
                                                                        <div className="grid grid-cols-1 gap-3">
                                                                            {vehicles
                                                                                .filter(vehicle => vehicle.status === 'Available')
                                                                                .map((vehicle) => (
                                                                                    <div
                                                                                        key={vehicle.id}
                                                                                        className={`p-3 rounded-md border cursor-pointer transition-colors ${
                                                                                            selectedVehicle?.id === vehicle.id ? 
                                                                                            'border-primary bg-primary/5' : 
                                                                                            'border-border hover:bg-accent/50'
                                                                                        }`}
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

                                                                    <div className="space-y-3 rounded-lg border p-4">
                                                                        <h3 className="text-lg font-medium flex items-center gap-2">
                                                                            <User className="h-5 w-5" />
                                                                            Select Driver
                                                                        </h3>
                                                                        <div className="grid grid-cols-1 gap-3">
                                                                            {drivers
                                                                                .filter(driver => driver.status === 'Available')
                                                                                .map((driver) => (
                                                                                    <div
                                                                                        key={driver.id}
                                                                                        className={`p-3 rounded-md border cursor-pointer transition-colors ${
                                                                                            selectedDriver?.id === driver.id ? 
                                                                                            'border-primary bg-primary/5' : 
                                                                                            'border-border hover:bg-accent/50'
                                                                                        }`}
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
                                                            </div>
                                                            <DialogFooter className="pt-4 border-t">
                                                                <Button 
                                                                    onClick={handleAssignResources}
                                                                    disabled={isAssigning || !selectedVehicle || !selectedDriver}
                                                                >
                                                                    {isAssigning ? (
                                                                        <>
                                                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                                            Assigning...
                                                                        </>
                                                                    ) : 'Assign Resources'}
                                                                </Button>
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
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Truck className="h-5 w-5 text-blue-500" />
                                        Assigned Dispatch Orders
                                    </CardTitle>
                                    <CardDescription>Orders with assigned vehicles and drivers ready for dispatch</CardDescription>
                                </div>
                                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400">
                                    {dispatchOrders.filter(o => o.status === 'Assigned').length} orders
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="w-[120px]">Order ID</TableHead>
                                        <TableHead>Destination</TableHead>
                                        <TableHead className="w-[140px]">Scheduled</TableHead>
                                        <TableHead>Vehicle</TableHead>
                                        <TableHead>Driver</TableHead>
                                        <TableHead className="w-[120px]">Status</TableHead>
                                        <TableHead className="w-[150px] text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dispatchOrders
                                        .filter(order => order.status === 'Assigned')
                                        .map((order) => (
                                            <TableRow key={order.id} className="group">
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <Package className="h-4 w-4 text-muted-foreground" />
                                                        {order.id}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                                        {order.destination}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        {order.scheduledDate}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Truck className="h-4 w-4 text-muted-foreground" />
                                                        {order.vehicle?.id} ({order.vehicle?.type})
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                        {order.driver?.name}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{getStatusBadge(order.status)}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        className="group-hover:bg-primary/90"
                                                        onClick={() => handleDispatchOrder(order.id)}
                                                        disabled={isDispatching}
                                                    >
                                                        {isDispatching ? (
                                                            <>
                                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                                Dispatching...
                                                            </>
                                                        ) : 'Dispatch Now'}
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
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        Dispatched Orders
                                    </CardTitle>
                                    <CardDescription>Orders that have been dispatched and are in transit</CardDescription>
                                </div>
                                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400">
                                    {dispatchOrders.filter(o => o.status === 'Dispatched').length} orders
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="w-[120px]">Order ID</TableHead>
                                        <TableHead>Destination</TableHead>
                                        <TableHead className="w-[140px]">Dispatched At</TableHead>
                                        <TableHead>Vehicle</TableHead>
                                        <TableHead>Driver</TableHead>
                                        <TableHead className="w-[120px]">Status</TableHead>
                                        <TableHead className="w-[150px] text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dispatchOrders
                                        .filter(order => order.status === 'Dispatched')
                                        .map((order) => (
                                            <TableRow key={order.id} className="group">
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <Package className="h-4 w-4 text-muted-foreground" />
                                                        {order.id}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                                        {order.destination}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                                        {new Date(order.dispatchedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Truck className="h-4 w-4 text-muted-foreground" />
                                                        {order.vehicle?.id} ({order.vehicle?.type})
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                        {order.driver?.name}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{getStatusBadge(order.status)}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="group-hover:bg-primary/10 group-hover:text-primary"
                                                    >
                                                        Track Delivery <ChevronRight className="h-4 w-4 ml-1" />
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
                <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Truck className="h-5 w-5 text-blue-500" />
                            Vehicle Fleet Status
                        </CardTitle>
                        <CardDescription>Current availability of your vehicle fleet</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {vehicles.map((vehicle) => (
                                <div 
                                    key={vehicle.id} 
                                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Truck className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">{vehicle.id} - {vehicle.type}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Capacity: {vehicle.capacity} | License: {vehicle.licensePlate}
                                            </p>
                                        </div>
                                    </div>
                                    {getVehicleStatusBadge(vehicle.status)}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-purple-500" />
                            Driver Availability
                        </CardTitle>
                        <CardDescription>Current status of your driver team</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {drivers.map((driver) => (
                                <div 
                                    key={driver.id} 
                                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <User className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">{driver.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                ID: {driver.id} | Phone: {driver.phone}
                                            </p>
                                        </div>
                                    </div>
                                    {getVehicleStatusBadge(driver.status)}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Dispatch Calendar */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-orange-500" />
                        Dispatch Calendar
                    </CardTitle>
                    <CardDescription>Upcoming scheduled dispatches for the next 3 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {['2025-06-15', '2025-06-16', '2025-06-17'].map((date) => (
                            <div key={date} className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <h3 className="font-medium">{date}</h3>
                                </div>
                                <div className="space-y-2">
                                    {dispatchOrders
                                        .filter(order => order.scheduledDate === date)
                                        .map((order) => (
                                            <div 
                                                key={order.id} 
                                                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-full ${order.priority === 'High' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                                                        order.priority === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                                                            'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
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
