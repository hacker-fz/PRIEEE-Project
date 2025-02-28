import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Package,
    Truck,
    AlertTriangle,
    CheckCircle,
    Clock,
    TrendingUp
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import PropTypes from 'prop-types';

const Dashboard = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Stock Items"
                    value="1,284"
                    description="+12% from last month"
                    icon={<Package className="h-6 w-6" />}
                    color="bg-blue-500/10 text-blue-500"
                />
                <StatsCard
                    title="Pending Dispatches"
                    value="32"
                    description="8 urgent dispatches"
                    icon={<Truck className="h-6 w-6" />}
                    color="bg-orange-500/10 text-orange-500"
                />
                <StatsCard
                    title="Active Alerts"
                    value="7"
                    description="3 high priority"
                    icon={<AlertTriangle className="h-6 w-6" />}
                    color="bg-red-500/10 text-red-500"
                />
                <StatsCard
                    title="On-time Deliveries"
                    value="94%"
                    description="+2% from last week"
                    icon={<CheckCircle className="h-6 w-6" />}
                    color="bg-green-500/10 text-green-500"
                />
            </div>

            {/* Warehouse Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Warehouse Capacity</CardTitle>
                        <CardDescription>Current storage utilization</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium">Zone A - General Storage</p>
                                    <p className="text-2xl font-bold">78%</p>
                                </div>
                                <TrendingUp className="h-5 w-5 text-green-500" />
                            </div>
                            <Progress value={78} className="h-2" />

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium">Zone B - Cold Storage</p>
                                    <p className="text-2xl font-bold">92%</p>
                                </div>
                                <TrendingUp className="h-5 w-5 text-red-500" />
                            </div>
                            <Progress value={92} className="h-2" />

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium">Zone C - Hazardous Materials</p>
                                    <p className="text-2xl font-bold">45%</p>
                                </div>
                                <TrendingUp className="h-5 w-5 text-green-500" />
                            </div>
                            <Progress value={45} className="h-2" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Deliveries</CardTitle>
                        <CardDescription>Next 24 hours</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { id: 'DEL-1234', destination: 'PDS Store #42', time: '10:30 AM', status: 'In Transit' },
                                { id: 'DEL-1235', destination: 'PDS Store #17', time: '1:15 PM', status: 'Scheduled' },
                                { id: 'DEL-1236', destination: 'PDS Store #08', time: '3:45 PM', status: 'Loading' },
                                { id: 'DEL-1237', destination: 'PDS Store #23', time: '5:00 PM', status: 'Scheduled' },
                            ].map((delivery) => (
                                <div key={delivery.id} className="flex items-center justify-between p-3 rounded-md bg-accent">
                                    <div>
                                        <p className="font-medium">{delivery.id}</p>
                                        <p className="text-sm text-muted-foreground">{delivery.destination}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1" />
                                        <span className="text-sm">{delivery.time}</span>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${delivery.status === 'In Transit' ? 'bg-blue-500/10 text-blue-500' :
                                        delivery.status === 'Loading' ? 'bg-yellow-500/10 text-yellow-500' :
                                            'bg-green-500/10 text-green-500'
                                        }`}>
                                        {delivery.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest warehouse operations</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { time: '09:42 AM', action: 'Stock updated', details: 'Batch ID: B-7829 quantity adjusted to 145 units', user: 'Maria Johnson' },
                            { time: '09:15 AM', action: 'Vehicle dispatched', details: 'Truck T-103 dispatched with order #ORD-5678', user: 'David Chen' },
                            { time: '08:50 AM', action: 'New stock received', details: 'Received 500 units of Product SKU-1234', user: 'Sarah Williams' },
                            { time: '08:30 AM', action: 'Alert resolved', details: 'Temperature alert in Cold Storage Zone resolved', user: 'Robert Taylor' },
                            { time: '08:15 AM', action: 'Dispatch planned', details: 'Created dispatch plan for 12 orders', user: 'James Wilson' },
                        ].map((activity, index) => (
                            <div key={index} className="flex items-start space-x-4 p-3 rounded-md hover:bg-accent">
                                <div className="text-sm text-muted-foreground min-w-[80px]">{activity.time}</div>
                                <div>
                                    <p className="font-medium">{activity.action}</p>
                                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                                    <p className="text-xs text-muted-foreground mt-1">by {activity.user}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const StatsCard = ({ title, value, description, icon, color }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className={`p-2 rounded-full ${color}`}>
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
};

// ✅ Add PropTypes Validation
StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    color: PropTypes.string.isRequired,
};

export default Dashboard;