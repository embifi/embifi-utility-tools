import "./App.css";
import GlobalContextProvider from "./Context/GlobalContext";
import Scheduler from "./Pages/Scheduler/Scheduler";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateApplication from "./Pages/CreateSteps/CreateApplication";
import CreateUser from "./Pages/CreateUser";
import CreateAgent from "./Pages/CreateAgent";
import CreateAnchor from "./Pages/CreateAnchor";
import CreateOem from "./Pages/CreateOem";

import UpdateApplication from "./Pages/updateStep/UpdateApplication";
import HomeScreen from "./Pages/HomeScreen";
import AadhaarOcr from "./Pages/OCR/AadhaarOcr";
import DocumentUploader from "./Pages/DocumentUpload/DocumentUploader";
import ViewDocuments from "./Pages/DocumentUpload/ViewDocuments";
import UpdateAnchor from "./Pages/UpdateAnchor/UpdateAnchor";
import UserContextProvider from "./Context/UserContext";
import ViewApplication from "./Pages/ViewApplication/ViewApplication";
import Login from "./Pages/Auth/Login";
import ProtectedRoute from "./Pages/Auth/ProtectedRoute";
import PublicRoute from "./Pages/Auth/PublicRoute";
import SelectApplication from "./Pages/ViewApplication/SelectApplication";
import Collection from "./Pages/Collection/Collection";
import B2CValidations from "./Pages/CRE/b2cValidation";
import UpdateStage from "./Pages/UpdateStage/UpdateStage";

function App() {
  return (
    <UserContextProvider>
      <GlobalContextProvider>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Router>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route exact path="/login" element={<Login />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route exact path="/" element={<HomeScreen />} />
              <Route exact path="/generate-schedule" element={<Scheduler />} />
              <Route exact path="/create-app" element={<CreateApplication />} />
              <Route exact path="/update-app" element={<UpdateApplication />} />
              <Route
                exact
                path="/update-app/:app_id"
                element={<UpdateApplication />}
              />
              <Route exact path="/aadhaar-ocr" element={<AadhaarOcr />} />
              <Route
                exact
                path="/view-application"
                element={<SelectApplication />}
              />
              <Route
                exact
                path="/view-application/:app_id"
                element={<ViewApplication />}
              />
              <Route
                exact
                path="/b2c-validations"
                element={<B2CValidations />}
              />
              <Route exact path="/update-anchor" element={<UpdateAnchor />} />
              <Route exact path="/update-stage" element={<UpdateStage />} />
              <Route
                exact
                path="/update-stage/:app_id"
                element={<UpdateStage />}
              />
              <Route exact path="/create-user" element={<CreateUser />} />
              <Route exact path="/create-agent" element={<CreateAgent />} />
              <Route exact path="/create-anchor" element={<CreateAnchor />} />
              <Route exact path="/create-oem" element={<CreateOem />} />

              <Route
                exact
                path="/upload-documents"
                element={<DocumentUploader />}
              />
              <Route
                exact
                path="/upload-documents/:app_id"
                element={<DocumentUploader />}
              />
              <Route exact path="/view-documents" element={<ViewDocuments />} />
              <Route
                exact
                path="/view-documents/:app_id"
                element={<ViewDocuments />}
              />
              <Route
                exact
                path="/update-collection/"
                element={<Collection />}
              />
              <Route
                exact
                path="/update-collection/:app_id"
                element={<Collection />}
              />
            </Route>
          </Routes>
        </Router>
      </GlobalContextProvider>
    </UserContextProvider>
  );
}

export default App;
