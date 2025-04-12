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
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Truck,
    AlertTriangle,
    Clock,
    RotateCw,
    Phone,
    MapPin,
    CheckCircle2,
    ChevronRight,
    Loader2,
    Gauge,
    User,
    Calendar,
    Navigation
} from "lucide-react";
import { toast } from 'sonner';
import { activeDeliveries, completedDeliveries } from '@/constants';

const RealTimeTracking = () => {
    const [deliveries, setDeliveries] = useState(activeDeliveries);
    const [selectedDelivery, setSelectedDelivery] = useState(activeDeliveries[0]);
    const [refreshing, setRefreshing] = useState(false);
    const [isResolving, setIsResolving] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            toast.success('Tracking data refreshed');
        }, 1000);
    };

    const handleResolveAlert = async (deliveryId, alertIndex) => {
        setIsResolving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
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

        if (selectedDelivery && selectedDelivery.id === deliveryId) {
            const updated = updatedDeliveries.find(d => d.id === deliveryId);
            setSelectedDelivery(updated);
        }

        setIsResolving(false);
        toast.success('Alert resolved successfully');
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'In Transit':
                return <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">{status}</Badge>;
            case 'Delayed':
                return <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">{status}</Badge>;
            case 'Delivered':
                return <Badge className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">{status}</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    // Calculate statistics
    const onTimePercentage = 92;
    const avgDeliveryTime = "1h 45m";
    const routeDeviations = 8;

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Real-Time Tracking
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Monitor and manage all active deliveries in real-time
                    </p>
                </div>
                <Button 
                    variant="outline" 
                    onClick={handleRefresh} 
                    disabled={refreshing}
                    className="group"
                >
                    <RotateCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform'}`} />
                    Refresh Data
                </Button>
            </div>

            {/* Delivery Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            On-Time Deliveries
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{onTimePercentage}%</div>
                        <p className="text-xs text-muted-foreground">+2% from last week</p>
                        <div className="mt-4 h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-green-500 rounded-full" 
                                style={{ width: `${onTimePercentage}%` }}
                            ></div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                            Average Delivery Time
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{avgDeliveryTime}</div>
                        <p className="text-xs text-muted-foreground">-10 minutes from last week</p>
                        <div className="mt-4 h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-blue-500 rounded-full" 
                                style={{ width: '75%' }}
                            ></div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            Route Deviations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{routeDeviations}%</div>
                        <p className="text-xs text-muted-foreground">+1% from last week</p>
                        <div className="mt-4 h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-yellow-500 rounded-full" 
                                style={{ width: `${routeDeviations}%` }}
                            ></div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="active">
                <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                    <TabsTrigger value="active" className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        Active Deliveries
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Completed Deliveries
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-1 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="flex items-center gap-2">
                                        <Truck className="h-5 w-5 text-blue-500" />
                                        Active Deliveries
                                    </CardTitle>
                                    <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400">
                                        {deliveries.length} in transit
                                    </Badge>
                                </div>
                                <CardDescription>Currently being delivered to customers</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {deliveries.map((delivery) => (
                                        <div
                                            key={delivery.id}
                                            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                                                selectedDelivery?.id === delivery.id 
                                                    ? 'border-primary bg-primary/5' 
                                                    : 'border-border hover:bg-accent/50'
                                            }`}
                                            onClick={() => setSelectedDelivery(delivery)}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Truck className="h-5 w-5 text-muted-foreground" />
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
                                                {delivery.alerts.length > 0 && (
                                                    <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                                                        <AlertTriangle className="h-4 w-4" />
                                                        <span>{delivery.alerts.length} alert{delivery.alerts.length !== 1 ? 's' : ''}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-2 h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
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

                        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    Delivery Map
                                </CardTitle>
                                <CardDescription>
                                    {selectedDelivery ? (
                                        <span>
                                            Tracking <span className="font-medium">{selectedDelivery.id}</span> to <span className="font-medium">{selectedDelivery.destination}</span>
                                        </span>
                                    ) : 'Select a delivery to track'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {selectedDelivery ? (
                                    <div className="space-y-6">
                                        {/* Map placeholder */}
                                        <div className="aspect-video bg-accent rounded-lg flex items-center justify-center relative overflow-hidden border">
                                            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')] bg-cover"></div>
                                            <div className="text-center z-10 p-6 bg-background/80 rounded-lg border">
                                                <p className="text-lg font-medium flex items-center justify-center gap-2">
                                                    <Navigation className="h-5 w-5 text-primary" />
                                                    Interactive Map
                                                </p>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Showing real-time location for {selectedDelivery.id}
                                                </p>
                                                <p className="mt-3 text-sm">
                                                    Current coordinates: {selectedDelivery.currentLocation.lat.toFixed(4)}, {selectedDelivery.currentLocation.lng.toFixed(4)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                                    <Package className="h-5 w-5 text-muted-foreground" />
                                                    Delivery Details
                                                </h3>
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
                                                        <div className="flex items-center gap-2">
                                                            <Gauge className="h-4 w-4 text-muted-foreground" />
                                                            <span className="font-medium">{selectedDelivery.progress}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                                    <User className="h-5 w-5 text-muted-foreground" />
                                                    Transport Details
                                                </h3>
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
                                                            <Phone className="h-4 w-4" />
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
                                                        <Button variant="outline" className="w-full group">
                                                            Contact Driver <Phone className="h-4 w-4 ml-2 group-hover:animate-pulse" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {selectedDelivery.alerts.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                                    Active Alerts
                                                </h3>
                                                <div className="space-y-3">
                                                    {selectedDelivery.alerts.map((alert, index) => (
                                                        <div 
                                                            key={index} 
                                                            className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
                                                        >
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
                                                                    disabled={isResolving}
                                                                >
                                                                    {isResolving ? (
                                                                        <>
                                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                            Resolving...
                                                                        </>
                                                                    ) : 'Resolve'}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                                <Navigation className="h-5 w-5 text-muted-foreground" />
                                                Route History
                                            </h3>
                                            <div className="space-y-3">
                                                {selectedDelivery.route.map((point, index) => (
                                                    <div key={index} className="flex items-start gap-3">
                                                        <div className="relative">
                                                            <div className="w-3 h-3 rounded-full bg-primary mt-1"></div>
                                                            {index < selectedDelivery.route.length - 1 && (
                                                                <div className="absolute top-4 left-1.5 w-0.5 h-6 bg-primary -ml-px"></div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm">
                                                                Location: {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                <Calendar className="inline h-3 w-3 mr-1" />
                                                                {point.timestamp}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-[400px] rounded-lg border border-dashed">
                                        <p className="text-muted-foreground">Select a delivery to view tracking details</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="completed" className="space-y-6">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    Completed Deliveries
                                </CardTitle>
                                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400">
                                    {completedDeliveries.length} deliveries
                                </Badge>
                            </div>
                            <CardDescription>Successfully delivered orders</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[120px]">Delivery ID</TableHead>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Destination</TableHead>
                                        <TableHead>Driver</TableHead>
                                        <TableHead>Vehicle</TableHead>
                                        <TableHead className="w-[140px]">Departure</TableHead>
                                        <TableHead className="w-[140px]">Arrival</TableHead>
                                        <TableHead className="w-[120px]">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {completedDeliveries.map((delivery) => (
                                        <TableRow key={delivery.id} className="group">
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Truck className="h-4 w-4 text-muted-foreground" />
                                                    {delivery.id}
                                                </div>
                                            </TableCell>
                                            <TableCell>{delivery.orderId}</TableCell>
                                            <TableCell>{delivery.destination}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    {delivery.driver.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {delivery.vehicle.id} ({delivery.vehicle.type})
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    {delivery.departureTime}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                                                    {delivery.arrivalTime}
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default RealTimeTracking;
