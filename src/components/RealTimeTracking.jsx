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
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Truck,
    AlertTriangle,
    Clock,
    RotateCw,
    Phone
} from "lucide-react";
import { toast } from 'sonner';

// Mock data for active deliveries
const activeDeliveries = [
    {
        id: 'DEL-1234',
        orderId: 'DO-1001',
        destination: 'PDS Store #42',
        address: '123 Main St, City A',
        driver: { id: 'D-001', name: 'John Smith', phone: '555-1234' },
        vehicle: { id: 'V-001', type: 'Truck', licensePlate: 'ABC-1234' },
        departureTime: '08:30 AM',
        estimatedArrival: '10:45 AM',
        status: 'In Transit',
        progress: 65,
        currentLocation: { lat: 34.0522, lng: -118.2437 },
        route: [
            { lat: 34.0522, lng: -118.2437, timestamp: '08:30 AM' },
            { lat: 34.0548, lng: -118.2642, timestamp: '08:45 AM' },
            { lat: 34.0595, lng: -118.2786, timestamp: '09:15 AM' },
            { lat: 34.0639, lng: -118.2912, timestamp: '09:45 AM' },
            { lat: 34.0689, lng: -118.3037, timestamp: '10:15 AM' }
        ],
        alerts: []
    },
    {
        id: 'DEL-1235',
        orderId: 'DO-1002',
        destination: 'PDS Store #17',
        address: '456 Oak Ave, City B',
        driver: { id: 'D-002', name: 'Maria Garcia', phone: '555-5678' },
        vehicle: { id: 'V-002', type: 'Van', licensePlate: 'DEF-5678' },
        departureTime: '09:15 AM',
        estimatedArrival: '11:30 AM',
        status: 'In Transit',
        progress: 40,
        currentLocation: { lat: 34.1478, lng: -118.1445 },
        route: [
            { lat: 34.1478, lng: -118.1445, timestamp: '09:15 AM' },
            { lat: 34.1512, lng: -118.1567, timestamp: '09:30 AM' },
            { lat: 34.1563, lng: -118.1689, timestamp: '10:00 AM' }
        ],
        alerts: [
            { type: 'Route Deviation', message: 'Vehicle deviated from planned route', timestamp: '09:45 AM', severity: 'Medium' }
        ]
    },
    {
        id: 'DEL-1236',
        orderId: 'DO-1003',
        destination: 'PDS Store #08',
        address: '789 Pine Rd, City C',
        driver: { id: 'D-004', name: 'Sarah Johnson', phone: '555-3456' },
        vehicle: { id: 'V-003', type: 'Truck', licensePlate: 'GHI-9012' },
        departureTime: '08:45 AM',
        estimatedArrival: '10:15 AM',
        status: 'Delayed',
        progress: 75,
        currentLocation: { lat: 34.0224, lng: -118.2851 },
        route: [
            { lat: 34.0224, lng: -118.2851, timestamp: '08:45 AM' },
            { lat: 34.0276, lng: -118.2967, timestamp: '09:00 AM' },
            { lat: 34.0328, lng: -118.3083, timestamp: '09:30 AM' },
            { lat: 34.0380, lng: -118.3199, timestamp: '10:00 AM' }
        ],
        alerts: [
            { type: 'Traffic Delay', message: 'Heavy traffic on main route', timestamp: '09:30 AM', severity: 'Low' }
        ]
    }
];

// Mock data for completed deliveries
const completedDeliveries = [
    {
        id: 'DEL-1230',
        orderId: 'DO-0997',
        destination: 'PDS Store #15',
        driver: { id: 'D-005', name: 'Robert Taylor', phone: '555-7890' },
        vehicle: { id: 'V-005', type: 'Truck', licensePlate: 'MNO-7890' },
        departureTime: '08:00 AM',
        arrivalTime: '09:45 AM',
        status: 'Delivered',
        completionTime: '10:15 AM'
    },
    {
        id: 'DEL-1231',
        orderId: 'DO-0998',
        destination: 'PDS Store #29',
        driver: { id: 'D-001', name: 'John Smith', phone: '555-1234' },
        vehicle: { id: 'V-001', type: 'Truck', licensePlate: 'ABC-1234' },
        departureTime: '09:30 AM',
        arrivalTime: '11:15 AM',
        status: 'Delivered',
        completionTime: '11:45 AM'
    }
];

const RealTimeTracking = () => {
    const [deliveries, setDeliveries] = useState(activeDeliveries);
    const [selectedDelivery, setSelectedDelivery] = useState(activeDeliveries[0]);
    const [refreshing, setRefreshing] = useState(false);

    // Handle refresh data
    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            toast.success('Tracking data refreshed');
        }, 1000);
    };

    // Handle resolve alert
    const handleResolveAlert = (deliveryId, alertIndex) => {
        const updatedDeliveries = deliveries.map(delivery => {
            if (delivery.id === deliveryId) {
                const updatedAlerts = [...delivery.alerts];
                updatedAlerts.splice(alertIndex, 1);
                return {
                    ...delivery,
                    alerts: updatedAlerts
                };
            }
            return delivery;
        });

        setDeliveries(updatedDeliveries);

        // Update selected delivery if it's the one being modified
        if (selectedDelivery && selectedDelivery.id === deliveryId) {
            const updated = updatedDeliveries.find(d => d.id === deliveryId);
            setSelectedDelivery(updated);
        }

        toast.success('Alert resolved successfully');
    };

    // Get status badge
    const getStatusBadge = (status) => {
        switch (status) {
            case 'In Transit':
                return <Badge className="bg-blue-500">{status}</Badge>;
            case 'Delayed':
                return <Badge className="bg-yellow-500">{status}</Badge>;
            case 'Delivered':
                return <Badge className="bg-green-500">{status}</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Real-Time Tracking</h2>
                <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
                    <RotateCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                    Refresh Data
                </Button>
            </div>

            <Tabs defaultValue="active">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="active">Active Deliveries</TabsTrigger>
                    <TabsTrigger value="completed">Completed Deliveries</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Active Deliveries</CardTitle>
                                <CardDescription>Currently in transit</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {deliveries.map((delivery) => (
                                        <div
                                            key={delivery.id}
                                            className={`p-4 rounded-md border cursor-pointer ${selectedDelivery?.id === delivery.id ? 'border-primary bg-accent' : 'border-border'}`}
                                            onClick={() => setSelectedDelivery(delivery)}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Truck className="h-5 w-5" />
                                                    <span className="font-medium">{delivery.id}</span>
                                                </div>
                                                {getStatusBadge(delivery.status)}
                                            </div>
                                            <p className="text-sm">{delivery.destination}</p>
                                            <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    <span>ETA: {delivery.estimatedArrival}</span>
                                                </div>
                                                <div>
                                                    {delivery.alerts.length > 0 && (
                                                        <div className="flex items-center gap-1 text-yellow-500">
                                                            <AlertTriangle className="h-4 w-4" />
                                                            <span>{delivery.alerts.length} {delivery.alerts.length === 1 ? 'alert' : 'alerts'}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-2 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full"
                                                    style={{ width: `${delivery.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Delivery Map</CardTitle>
                                <CardDescription>
                                    {selectedDelivery ? `Tracking ${selectedDelivery.id} to ${selectedDelivery.destination}` : 'Select a delivery to track'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {selectedDelivery ? (
                                    <div className="space-y-6">
                                        {/* Map placeholder - in a real app, this would be an actual map component */}
                                        <div className="aspect-video bg-accent rounded-md flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')]"></div>
                                            <div className="text-center z-10">
                                                <p className="text-lg font-medium">Interactive Map</p>
                                                <p className="text-sm text-muted-foreground">Showing real-time location for {selectedDelivery.id}</p>
                                                <p className="mt-2">Current coordinates: {selectedDelivery.currentLocation.lat.toFixed(4)}, {selectedDelivery.currentLocation.lng.toFixed(4)}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="text-lg font-medium mb-4">Delivery Details</h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Order ID:</span>
                                                        <span className="font-medium">{selectedDelivery.orderId}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Destination:</span>
                                                        <span className="font-medium">{selectedDelivery.destination}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Address:</span>
                                                        <span className="font-medium">{selectedDelivery.address}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Departure:</span>
                                                        <span className="font-medium">{selectedDelivery.departureTime}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">ETA:</span>
                                                        <span className="font-medium">{selectedDelivery.estimatedArrival}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Status:</span>
                                                        <span>{getStatusBadge(selectedDelivery.status)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Progress:</span>
                                                        <span className="font-medium">{selectedDelivery.progress}%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-medium mb-4">Transport Details</h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Driver:</span>
                                                        <span className="font-medium">{selectedDelivery.driver.name}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Driver ID:</span>
                                                        <span className="font-medium">{selectedDelivery.driver.id}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Contact:</span>
                                                        <span className="font-medium flex items-center gap-1">
                                                            <Phone className="h-3 w-3" />
                                                            {selectedDelivery.driver.phone}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Vehicle:</span>
                                                        <span className="font-medium">{selectedDelivery.vehicle.type} ({selectedDelivery.vehicle.id})</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">License Plate:</span>
                                                        <span className="font-medium">{selectedDelivery.vehicle.licensePlate}</span>
                                                    </div>
                                                    <div className="mt-4">
                                                        <Button variant="outline" className="w-full">
                                                            Contact Driver
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {selectedDelivery.alerts.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-medium mb-4">Active Alerts</h3>
                                                <div className="space-y-3">
                                                    {selectedDelivery.alerts.map((alert, index) => (
                                                        <div key={index} className="p-4 rounded-md bg-yellow-500/10 border border-yellow-500">
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex items-start gap-3">
                                                                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                                                                    <div>
                                                                        <p className="font-medium">{alert.type}</p>
                                                                        <p className="text-sm">{alert.message}</p>
                                                                        <p className="text-xs text-muted-foreground mt-1">
                                                                            Reported at {alert.timestamp} • Severity: {alert.severity}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleResolveAlert(selectedDelivery.id, index)}
                                                                >
                                                                    Resolve
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <h3 className="text-lg font-medium mb-4">Route History</h3>
                                            <div className="space-y-3">
                                                {selectedDelivery.route.map((point, index) => (
                                                    <div key={index} className="flex items-center gap-3">
                                                        <div className="relative">
                                                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                                                            {index < selectedDelivery.route.length - 1 && (
                                                                <div className="absolute top-3 left-1.5 w-0.5 h-6 bg-primary -ml-px"></div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm">
                                                                Location: {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Timestamp: {point.timestamp}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-[400px]">
                                        <p className="text-muted-foreground">Select a delivery to view its location</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="completed" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Completed Deliveries</CardTitle>
                            <CardDescription>Successfully delivered orders</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Delivery ID</TableHead>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Destination</TableHead>
                                        <TableHead>Driver</TableHead>
                                        <TableHead>Vehicle</TableHead>
                                        <TableHead>Departure</TableHead>
                                        <TableHead>Arrival</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {completedDeliveries.map((delivery) => (
                                        <TableRow key={delivery.id}>
                                            <TableCell className="font-medium">{delivery.id}</TableCell>
                                            <TableCell>{delivery.orderId}</TableCell>
                                            <TableCell>{delivery.destination}</TableCell>
                                            <TableCell>{delivery.driver.name}</TableCell>
                                            <TableCell>{delivery.vehicle.id} ({delivery.vehicle.type})</TableCell>
                                            <TableCell>{delivery.departureTime}</TableCell>
                                            <TableCell>{delivery.arrivalTime}</TableCell>
                                            <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Delivery Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">On-Time Deliveries</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">92%</div>
                        <p className="text-xs text-muted-foreground">+2% from last week</p>
                        <div className="mt-4 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Average Delivery Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1h 45m</div>
                        <p className="text-xs text-muted-foreground">-10 minutes from last week</p>
                        <div className="mt-4 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Route Deviations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8%</div>
                        <p className="text-xs text-muted-foreground">+1% from last week</p>
                        <div className="mt-4 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 rounded-full" style={{ width: '8%' }}></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RealTimeTracking;