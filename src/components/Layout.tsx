import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex bg-gray-100 overflow-hidden">

            {/* Sidebar */}
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            {/* Main Section */}
            <div className="flex flex-col flex-1">

                {/* Header */}
                <div className="fixed top-0 right-0 left-0 md:left-65 z-40 bg-gray-100">
                    <Header onMenuClick={() => setSidebarOpen(true)} />
                </div>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto pt-20 px-6">
                    {children}
                </main>

            </div>

        </div>
    );
};

export default Layout;