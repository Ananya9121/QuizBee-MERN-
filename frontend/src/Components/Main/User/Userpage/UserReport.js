import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../../../App";
import Header from "../../../Shared/Header";
import GraphOne from "./GraphOne";
import UserReportStyle from "./UserReport.module.css";
import { useNavigate } from "react-router-dom";

function UserReport() {
  const token = localStorage.getItem("token");
  const UserName = localStorage.getItem("username");
  const navigate = useNavigate();


  const [userResult, setUseResult] = useState({});
  const [graphData, setGraphdata] = useState([]);
  const fetchAPI = async (url) => {
    try {
      let response = await axios.get(
        url
        , {
        headers: { Authorization: `Bearer ${token}` }, }
      );
      const obj = response.data[0];
      setUseResult((prev) => ({
        ...prev,
        ...obj,
      }));
      return response.data[0];
    } catch (e) {
      alert(e.message);
    }
  };


  const handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("UserName");
    navigate("/");
    window.location.reload();
  };

  const graphfunc = (data) => {

    const graph = data.finalAnswer.map((data) => {
      return {
        Question_no: data.Question_no,
        Score: data.score,
      };
    });
    setGraphdata(graph);
  };


const rando=async()=>{
  let url = `${config.endpoint}/user/result`;
  let userres = await fetchAPI(url);
  graphfunc(userres)
};

  useEffect( () => {
    if (!token) return;

    rando();
    

  }, []);



  return (
    <>
      <Header />
      <div className={UserReportStyle.report}>
      
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
        <div>
          <span style={{ fontWeight: "500" }}>Username : </span>{" "}
          {userResult.username}
        </div>
        <br />
        <div>
          <span style={{ fontWeight: "500" }}>Totalscore : </span>{" "}
          {userResult.Totalscore}
        </div>
      </div>
      <div className={UserReportStyle.graph}>Graph</div>
      {graphData.length && <GraphOne data={graphData}/>}
    </>
  );
}

export default UserReport;
