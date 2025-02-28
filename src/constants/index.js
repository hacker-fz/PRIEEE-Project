export const initialStockData = [
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


export const completedDeliveries = [
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


// Mock data for active deliveries
export const activeDeliveries = [
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

// Mock data for dispatch orders
export const initialDispatchOrders = [
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
export const vehicles = [
    { id: 'V-001', type: 'Truck', capacity: '5 tons', status: 'Available', licensePlate: 'ABC-1234' },
    { id: 'V-002', type: 'Van', capacity: '2 tons', status: 'Available', licensePlate: 'DEF-5678' },
    { id: 'V-003', type: 'Truck', capacity: '8 tons', status: 'Available', licensePlate: 'GHI-9012' },
    { id: 'V-004', type: 'Van', capacity: '1.5 tons', status: 'In Maintenance', licensePlate: 'JKL-3456' },
    { id: 'V-005', type: 'Truck', capacity: '10 tons', status: 'Available', licensePlate: 'MNO-7890' }
];

// Mock data for drivers
export const drivers = [
    { id: 'D-001', name: 'John Smith', phone: '555-1234', status: 'Available', license: 'DL-123456' },
    { id: 'D-002', name: 'Maria Garcia', phone: '555-5678', status: 'Available', license: 'DL-234567' },
    { id: 'D-003', name: 'David Chen', phone: '555-9012', status: 'On Leave', license: 'DL-345678' },
    { id: 'D-004', name: 'Sarah Johnson', phone: '555-3456', status: 'Available', license: 'DL-456789' },
    { id: 'D-005', name: 'Robert Taylor', phone: '555-7890', status: 'Available', license: 'DL-567890' }
];
