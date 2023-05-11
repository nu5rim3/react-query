import { useRoutes } from 'react-router-dom';

// project import
import AuthRoutes from './AuthRoutes';
import UnAuthRoutes from './UnAuthRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([AuthRoutes, UnAuthRoutes]);
}