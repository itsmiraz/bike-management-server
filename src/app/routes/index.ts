import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/Auth/Auth.route';
import { BikeRoutes } from '../modules/bike/bike.route';
import { SalesRoutes } from '../modules/sales/sales.router';

const router = Router();

const ModuleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/bike',
    route: BikeRoutes,
  },
  {
    path: '/sale',
    route: SalesRoutes,
  },
];

ModuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
