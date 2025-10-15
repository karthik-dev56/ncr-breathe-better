import { Link, useLocation } from "react-router-dom";
import { Wind, Map, TrendingUp, AlertCircle, FileText, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Dashboard", icon: Wind },
    { path: "/map", label: "Map", icon: Map },
    { path: "/forecast", label: "Forecast", icon: TrendingUp },
    { path: "/report", label: "Report", icon: AlertCircle },
    { path: "/ai-assistant", label: "AI Assistant", icon: MessageSquare },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Wind className="w-8 h-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-primary">Delhi-NCR</span>
              <span className="text-xs text-muted-foreground">Air Quality Intelligence</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10">
              <Link to="/admin">Admin</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10">
              <Link to="/policy-maker">Policy</Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="hover:scale-105 transition-transform">
              <Link to="/citizen">
                <User className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
