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
    TrendingUp,
    ChevronRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import PropTypes from 'prop-types';

const Dashboard = () => {
    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Dashboard Overview
                </h2>
                <div className="text-sm text-muted-foreground flex items-center">
                    Last updated: Today, 10:24 AM <RefreshCw className="h-4 w-4 ml-2" />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Stock Items"
                    value="1,284"
                    description="+12% from last month"
                    icon={<Package className="h-5 w-5" />}
                    color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    trend="up"
                />
                <StatsCard
                    title="Pending Dispatches"
                    value="32"
                    description="8 urgent dispatches"
                    icon={<Truck className="h-5 w-5" />}
                    color="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                    trend="down"
                />
                <StatsCard
                    title="Active Alerts"
                    value="7"
                    description="3 high priority"
                    icon={<AlertTriangle className="h-5 w-5" />}
                    color="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    trend="up"
                />
                <StatsCard
                    title="On-time Deliveries"
                    value="94%"
                    description="+2% from last week"
                    icon={<CheckCircle className="h-5 w-5" />}
                    color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    trend="up"
                />
            </div>

            {/* Warehouse Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span>Warehouse Capacity</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                                Live
                            </span>
                        </CardTitle>
                        <CardDescription>Current storage utilization</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-medium">Zone A - General Storage</p>
                                        <p className="text-2xl font-bold">78%</p>
                                    </div>
                                    <div className="flex items-center text-green-500 text-sm">
                                        <TrendingUp className="h-4 w-4 mr-1" />
                                        <span>2.3%</span>
                                    </div>
                                </div>
                                <Progress value={78} className="h-2 bg-gray-200 dark:bg-gray-800" indicatorColor="bg-blue-500" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-medium">Zone B - Cold Storage</p>
                                        <p className="text-2xl font-bold">92%</p>
                                    </div>
                                    <div className="flex items-center text-red-500 text-sm">
                                        <TrendingUp className="h-4 w-4 mr-1" />
                                        <span>5.1%</span>
                                    </div>
                                </div>
                                <Progress value={92} className="h-2 bg-gray-200 dark:bg-gray-800" indicatorColor="bg-orange-500" />
                                <p className="text-xs text-red-500">Approaching capacity limit</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-medium">Zone C - Hazardous Materials</p>
                                        <p className="text-2xl font-bold">45%</p>
                                    </div>
                                    <div className="flex items-center text-green-500 text-sm">
                                        <TrendingUp className="h-4 w-4 mr-1" />
                                        <span>1.2%</span>
                                    </div>
                                </div>
                                <Progress value={45} className="h-2 bg-gray-200 dark:bg-gray-800" indicatorColor="bg-purple-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle>Upcoming Deliveries</CardTitle>
                        <CardDescription>Next 24 hours</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { id: 'DEL-1234', destination: 'PDS Store #42', time: '10:30 AM', status: 'In Transit', eta: 'On time' },
                                { id: 'DEL-1235', destination: 'PDS Store #17', time: '1:15 PM', status: 'Scheduled', eta: 'Preparing' },
                                { id: 'DEL-1236', destination: 'PDS Store #08', time: '3:45 PM', status: 'Loading', eta: '2 items remaining' },
                                { id: 'DEL-1237', destination: 'PDS Store #23', time: '5:00 PM', status: 'Scheduled', eta: 'Not started' },
                            ].map((delivery) => (
                                <div 
                                    key={delivery.id} 
                                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer group"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-2 rounded-lg ${
                                            delivery.status === 'In Transit' ? 'bg-blue-100 dark:bg-blue-900/50' :
                                            delivery.status === 'Loading' ? 'bg-yellow-100 dark:bg-yellow-900/50' :
                                            'bg-green-100 dark:bg-green-900/50'
                                        }`}>
                                            {delivery.status === 'In Transit' ? <Truck className="h-5 w-5 text-blue-600 dark:text-blue-300" /> :
                                             delivery.status === 'Loading' ? <Package className="h-5 w-5 text-yellow-600 dark:text-yellow-300" /> :
                                             <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-300" />}
                                        </div>
                                        <div>
                                            <p className="font-medium group-hover:text-primary">{delivery.id}</p>
                                            <p className="text-sm text-muted-foreground">{delivery.destination}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{delivery.eta}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                            <p className="text-sm font-medium">{delivery.time}</p>
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                delivery.status === 'In Transit' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' :
                                                delivery.status === 'Loading' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300' :
                                                'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300'
                                            }`}>
                                                {delivery.status}
                                            </span>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Latest warehouse operations</CardDescription>
                        </div>
                        <button className="text-sm text-primary hover:underline">View all activity</button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { 
                                time: '09:42 AM', 
                                action: 'Stock updated', 
                                details: 'Batch ID: B-7829 quantity adjusted to 145 units', 
                                user: 'Maria Johnson',
                                icon: <Package className="h-5 w-5 text-blue-500" />
                            },
                            { 
                                time: '09:15 AM', 
                                action: 'Vehicle dispatched', 
                                details: 'Truck T-103 dispatched with order #ORD-5678', 
                                user: 'David Chen',
                                icon: <Truck className="h-5 w-5 text-green-500" />
                            },
                            { 
                                time: '08:50 AM', 
                                action: 'New stock received', 
                                details: 'Received 500 units of Product SKU-1234', 
                                user: 'Sarah Williams',
                                icon: <CheckCircle className="h-5 w-5 text-purple-500" />
                            },
                            { 
                                time: '08:30 AM', 
                                action: 'Alert resolved', 
                                details: 'Temperature alert in Cold Storage Zone resolved', 
                                user: 'Robert Taylor',
                                icon: <AlertTriangle className="h-5 w-5 text-orange-500" />
                            },
                            { 
                                time: '08:15 AM', 
                                action: 'Dispatch planned', 
                                details: 'Created dispatch plan for 12 orders', 
                                user: 'James Wilson',
                                icon: <Clock className="h-5 w-5 text-cyan-500" />
                            },
                        ].map((activity, index) => (
                            <div 
                                key={index} 
                                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group"
                            >
                                <div className="p-2 rounded-lg bg-accent">
                                    {activity.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <p className="font-medium group-hover:text-primary">{activity.action}</p>
                                        <span className="text-sm text-muted-foreground">{activity.time}</span>
                                    </div>
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

const StatsCard = ({ title, value, description, icon, color, trend }) => {
    return (
        <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className={`p-2 rounded-lg ${color}`}>
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <div className="flex items-center">
                    <p className="text-xs text-muted-foreground">{description}</p>
                    {trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 ml-1 text-green-500" />
                    ) : (
                        <TrendingUp className="h-3 w-3 ml-1 text-red-500 transform rotate-180" />
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    color: PropTypes.string.isRequired,
    trend: PropTypes.oneOf(['up', 'down']).isRequired,
};

export default Dashboard;
