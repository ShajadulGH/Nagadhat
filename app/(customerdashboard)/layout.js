import CustomerLeftSideNavbar from "../components/customerDashboard/CustomerLeftSideNavbar";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

export default async function DashboardLayout({ children }) {
    
    return (
        <PrivateRoute>
            <section className="customer-dashboard-section-area">
                <div className="container">
                    <div className="row">
                        <aside className="col-xl-3 d-none d-xl-block">
                            <CustomerLeftSideNavbar />
                        </aside>

                        {/* customer dashboard right side */}
                        <div className="col-xl-9">
                           {children} 
                        </div>
                        
                    </div>
                </div>
            </section>
        </PrivateRoute>
    )
}