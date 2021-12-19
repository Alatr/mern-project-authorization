import { ComponentType } from "react";

import Login from "./pages/Login";
import Event from "./pages/Event";
import NoMatch from "./pages/NoMatch";

export interface IRoute {
  path: string;
  component: ComponentType;
}

export enum RouteNames {
  LOGIN = "login",
  EVENTS = "/",
  NO_MATCH = "*",
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, component: Login },
  { path: RouteNames.NO_MATCH, component: NoMatch },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.EVENTS, component: Event },
];
