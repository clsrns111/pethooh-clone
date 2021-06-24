import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import SlideEvent from "./SlideEvent";
import Hot from "./Hot";
import News from "./News";
import { withRouter } from "react-router-dom";
function Home() {
  return (
    <div>
      {" "}
      <SlideEvent />
      <Hot />
      <News />
    </div>
  );
}

export default withRouter(Home);
