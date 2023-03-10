import React, { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("@pages/Home"));
const Policy = lazy(() =>
  import("@components/footer/legal_pages/policy/Policy")
);
const Cookies = lazy(() =>
  import("@components/footer/legal_pages/cookies/Cookies")
);
const TermsOfServices = lazy(() =>
  import("@components/footer/legal_pages/termsofservices/TermsOfServices")
);
const CategoryVideo = lazy(() =>
  import("@components/category_video/CategoryVideo")
);
const RegisterForm = lazy(() => import("@pages/RegisterForm"));
const VideoPage = lazy(() => import("@pages/VideoPage"));
const Profile = lazy(() => import("@pages/Profile"));
const Admin = lazy(() => import("@pages/Admin"));
const Page404 = lazy(() => import("@pages/Page404"));
const Navbar = lazy(() => import("@components/navbar/Navbar"));
const Footer = lazy(() => import("@components/footer/Footer"));
const LoginPopUp = lazy(() => import("@components/loginPopUp/LoginPopUp"));

function App() {
  const [controlPopUpLogIn, setControlPopUpLogIn] = useState(false);

  function handlePopUpLogIn() {
    setControlPopUpLogIn(!controlPopUpLogIn);
  }

  return (
    <div className="App dark-theme">
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="spinner" />
            <p>Loading</p>
          </div>
        }
      >
        <Navbar
          handlePopUpLogIn={() => {
            handlePopUpLogIn();
          }}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/termsofservices" element={<TermsOfServices />} />
          <Route path="/categories/:id" element={<CategoryVideo />} />
          <Route path="/registration" element={<RegisterForm />} />
          <Route path="/videos/:idVid" element={<VideoPage />} />
          <Route path="/profile" element={<Profile id={1} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
        <Footer />
        {controlPopUpLogIn && <LoginPopUp />}
      </Suspense>
    </div>
  );
}

export default App;
