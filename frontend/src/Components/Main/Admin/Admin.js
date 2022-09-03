import axios from "axios";
import React, { useState,useEffect } from "react";
import adminStyle from "./Admin.module.css";
import { Link, useHistory } from "react-router-dom";
import { config } from "../../../App";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Header from "../../Shared/Header";

const res = [];
let questioncount = 1;
const Admin = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [questionNumber, setQuestionnumber] = useState(1);
  const [questionDetails, setQuestiondetails] = useState([
    {
      Question_no: 1,
      Question: "",
      Option1: "",
      Option2: "",
      Option3: "",
      Option4: "",
      Dificulty: 0,
      Correct: "",
    },
  ]);

  const [isQuestionsubmitted, setisQuestionsubmitted] = useState(false);

 


  const handleSubmit = async (e) => {
    try {
      let url = `${config.endpoint}/admin`;
      const copydata = {
        ...questionDetails,
        ...{ Question_no: questioncount },
      };
      questioncount = questioncount + 1;

      res.push(copydata);

      setQuestiondetails([
        {
          Question_no: 1,
          Question: "",
          Option1: "",
          Option2: "",
          Option3: "",
          Option4: "",
          Dificulty: 0,
          Correct: "",
        },
      ]);
      setQuestionnumber((prevcount) => prevcount + 1);


      if (questionNumber >= 10) {
        await axios.post(url, res);
        setisQuestionsubmitted(true);
        enqueueSnackbar("Question List has been Submitted", {
          variant: "success",
        });
      }
    } catch (err) {
      enqueueSnackbar("Unable to send Question data", { variant: "error" });
    }
  };
  const handleChange = (e) => {
    let [key, value] = [e.target.name, e.target.value];
    setQuestiondetails({ ...questionDetails, [key]: value });
  };

  const handleChangesubmit = (e) => {
    setQuestiondetails({ ...questionDetails, Dificulty: e.target.value });
  };

  const handleChangeMain = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className={adminStyle.main}>
        <div className={adminStyle.containerwidth}>
          {isQuestionsubmitted ? (
            <div className={adminStyle.submitted}>
              <h2>Question has been submitted!</h2>
              <br />
              <p>You can now proceed for test provided to users</p>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleChangeMain}
              >
                Go to main page
              </button>
            </div>
          ) : (
            <div>
              <p className={adminStyle.fontstyle}>Questionnaire!</p>
              <p className={adminStyle.rightview}>
                Question {questionNumber}/10
              </p>
              <br />
              <div style={{ padding: "0 5rem" }}>
                <form>
                  <div className="row mb-3">
                    <label
                      htmlFor="colFormLabel"
                      className="col-sm-2 col-form-label"
                    >
                      Question
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        id="colFormLabel"
                        placeholder="Enter the question"
                        onChange={(e) => handleChange(e)}
                        value={questionDetails.Question ?? ""}
                        type="text"
                        name="Question"
                      ></input>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="colFormLabeloption1"
                      className="col-sm-2 col-form-label"
                    >
                      Option 1
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        id="colFormLabeloption1"
                        placeholder="Enter the option"
                        type="text"
                        onChange={(e) => handleChange(e)}
                        value={questionDetails.Option1 ?? ""}
                        name="Option1"
                      ></input>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="colFormLabeloption2"
                      className="col-sm-2 col-form-label"
                    >
                      Option 2
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        id="colFormLabeloption2"
                        placeholder="Enter the option"
                        type="text"
                        onChange={(e) => handleChange(e)}
                        value={questionDetails.Option2 ?? ""}
                        name="Option2"
                      ></input>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="colFormLabeloption3"
                      className="col-sm-2 col-form-label"
                    >
                      Option 3
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        id="colFormLabeloption3"
                        placeholder="Enter the option"
                        type="text"
                        onChange={(e) => handleChange(e)}
                        value={questionDetails.Option3 ?? ""}
                        name="Option3"
                      ></input>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="colFormLabeloption4"
                      className="col-sm-2 col-form-label"
                    >
                      Option 4
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        id="colFormLabeloption4"
                        type="text"
                        placeholder="Enter the option"
                        onChange={(e) => handleChange(e)}
                        value={questionDetails.Option4 ?? ""}
                        name="Option4"
                      ></input>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="colFormLabeloption4"
                      className="col-sm-2 col-form-label"
                    >
                      Correct Option
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        id="colFormLabeloption4"
                        type="text"
                        placeholder="Enter the Corrrect option"
                        onChange={(e) => handleChange(e)}
                        value={questionDetails.Correct ?? ""}
                        name="Correct"
                      ></input>
                    </div>
                  </div>

                  <div>
                    <br />
                    <div className="row mb-3">
                      <label
                        htmlFor="colFormLabeloptiondl"
                        className="col-sm-2 col-form-label"
                      >
                        Dificulty Level
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          id="colFormLabeloptiondl"
                          aria-label="Default select example"
                          name="Dificulty"
                          value={questionDetails.Dificulty ?? ""}
                          onChange={(e) => handleChangesubmit(e)}
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <br />
                  <div className={adminStyle.centrealign}>
                    {questionNumber >= 10 ? (
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
