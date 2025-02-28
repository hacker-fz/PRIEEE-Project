import { cn } from '@/lib/utils';

const sidebar = ({ activeTab, setActiveTab, navItems }) => {
    return (
        <div className="h-full bg-card border-r border-border flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-border">
                <h2 className="text-2xl font-bold primary-text-gradient">WMS Admin</h2>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                            "w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors",
                            activeTab === item.id
                                ? "primary-gradient text-primary-foreground font-bold"
                                : "hover:bg-accent"
                        )}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                    <p>© 2025 WMS Admin</p>
                    <p>Version 1.0.0</p>
                </div>
            </div>
        </div>
    )
}

export default sidebar