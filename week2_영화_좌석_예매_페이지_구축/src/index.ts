import { initPage } from "./pages/initializer_page";
import { connectLoginPageEventListeners } from "./pages/login_page";
import { connectResevePageEventListeners } from "./pages/reserve_page";

initPage();
connectLoginPageEventListeners();
connectResevePageEventListeners();
