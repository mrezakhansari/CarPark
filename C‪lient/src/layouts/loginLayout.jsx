import React,{useEffect,useState} from "react";

const LoginLayout = ({ children,updateWidth, ...rest }) => {

   // const [state, setstate] = useState({
   //    width: window.innerWidth,
   //    sidebarState: "close",
   //    sidebarSize: '',
   //    layout: ''
   // })

   useEffect(() => {
      if (window !== "undefined") {
         window.addEventListener("resize", updateWidth, false);
      }
      return () => {
         if (window !== "undefined") {
            window.removeEventListener("resize", updateWidth, false);
         }
      }
   }, [])

  return (
          <div className="bg-gallery-1" 
          >
            <main className="main" style={{maxWidth:"100%",maxHeight:"100%",overflowX:"hidden"}}>
              {children}
            </main>
          </div>
  );
};

export default LoginLayout;
