import { lazy } from "react"

const Home = lazy(() => import("./Home"))
const Container = lazy(() => import("./Container"))
const Hero = lazy(() => import("./Hero"))
const Notfound = lazy(() => import("./Notfound"))
const Lists = lazy(() => import("./Lists"))
const ListPrev = lazy(() => import("./sub-components/ListPrev"))

export { Home, Container, Hero, Notfound, Lists, ListPrev }
