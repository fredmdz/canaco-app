import "react-native-gesture-handler";
import dayjs from "dayjs";
import "dayjs/locale/es";
import isBetween from "dayjs/plugin/isBetween";

dayjs.locale("es");
dayjs.extend(isBetween);

import Navigation from "./navigations/Navigations";

export default function App() {
  return <Navigation />;
}
