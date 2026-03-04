import Sidebar from "./Sidebar";
import Header from "./Header";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">

            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-screen w-65">
                <Sidebar />
            </div>

            {/* Right Section */}
            <div className="flex flex-col flex-1 ml-65">

                {/* Header */}
                <div className="fixed top-0 left-65 right-0 z-50 bg-gray-100">
                    <Header />
                </div>

                {/* Scrollable Page */}
                <div className="flex-1 overflow-y-auto pt-20.5 px-6">
                    {children}
                </div>

            </div>

        </div>
    );
};

export default Layout;