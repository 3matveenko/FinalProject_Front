import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"

const RoleStorekeeper = () => {
    const role = localStorage.getItem('role')
    const location = useLocation()

    return (
        role==2||role==3
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}
export default RoleStorekeeper