import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../../../App";
import userStyle from "./User.module.css";
import Header from "../../../Shared/Header";
import { useNavigate } from "react-router-dom";

function User() {
  const token = localStorage.getItem("token");
  const UserName = localStorage.getItem("username");
  const navigate = useNavigate();

  const [quizQuestion, setQuizquestion] = useState([]);
  const [dificultyLevelQuestion, setDificultyLevelQuestion] = useState(5);

  const [userResponse, setUserresponse] = useState({
    username: "",
    Useranswer: [],
    Totalscore: 0,
  });

  const fetchAPI = async (url) => {
    try {
      let response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizquestion(response.data);
    } catch (e) {
      alert(e.message);
    }
  };

  const postAPI = async (url) => {
    try {
      await axios.post(url, userResponse, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      alert(e.message);
    }
  };

  const handleUserresponse = async (e) => {
    const userAnswer = e.target.value;

    const findQuestionwithDificultylvel = quizQuestion.find(
      (question) => question.Dificulty === dificultyLevelQuestion
    );
    const correctAnswer = Number(findQuestionwithDificultylvel.Correct);

    let userAnswerobj = {
      Question_no: findQuestionwithDificultylvel.Question_no,
      answer: userAnswer,
      score: 0,
    };

    if (userAnswer === correctAnswer) {
      setDificultyLevelQuestion(dificultyLevelQuestion + 1);

      setUserresponse((prev) => ({
        ...prev,
        Useranswer: [...prev.Useranswer, userAnswerobj],
      }));
    } else {
      setDificultyLevelQuestion(dificultyLevelQuestion - 1);

      setUserresponse((prev) => ({
        ...prev,
        Useranswer: [...prev.Useranswer, userAnswerobj],
      }));
    }

    if (dificultyLevelQuestion === 10 || dificultyLevelQuestion === 1) {
      if (
        (dificultyLevelQuestion === 10 && userAnswer === correctAnswer) ||
        (dificultyLevelQuestion === 1 && userAnswer !== correctAnswer)
      ) {
        const url = `${config.endpoint}/user/evaluate`;
        await postAPI(url);
        navigate("/user/result");
      }
    }
  };

  const updateUsername = (UserName) => {
    setUserresponse((prev) => ({
      ...prev,
      username: UserName,
    }));
  };

  const handleNoquestion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("UserName");
    navigate("/admin");
    window.location.reload();
  };

  useEffect(() => {
    // if(!token) return
    let url = `${config.endpoint}/user/test`;
    fetchAPI(url);
    updateUsername(UserName);
  }, []);

  return (
    <>
      <Header />
      <div className={userStyle.main}>
        {quizQuestion.length ?  <>
        <div className={userStyle.fontstyle}>Start the quiz</div>

        {quizQuestion.map((question) => {
          return (
            <>
              {question.Dificulty === dificultyLevelQuestion ? (
                <div key={question.Question_no}>
                  <div className={userStyle.data}></div>
                  <h4>Question {question.Question_no}/10</h4>
                  <h4>Dificulty Level: {question.Dificulty}</h4>

                  <div
                    className="card"
                    style={{ width: "30rem", textAlign: "center" }}
                  >
                    <div className="card-header">{question.Question}</div>
                    <ul
                      className="list-group list-group-flush"
                      onClick={(e) => handleUserresponse(e)}
                    >
                      <li className="list-group-item" value={question.Option1}>
                        {" "}
                        {question.Option1}
                      </li>
                      <li className="list-group-item" value={question.Option2}>
                        {" "}
                        {question.Option2}
                      </li>
                      <li className="list-group-item" value={question.Option3}>
                        {" "}
                        {question.Option3}
                      </li>
                      <li className="list-group-item" value={question.Option4}>
                        {" "}
                        {question.Option4}
                      </li>
                    </ul>
                  </div>
                </div>
              ) : null}
            </>
          );

        })}

        </> : (
          <>
            <div>Opps! Questions not added by Admin.</div>
            <button className="btn btn-outline-secondary"
                      type="button" onClick={handleNoquestion}>
              Logout to go to Admin Page
            </button>
          </>
        )}
       
      </div>
    </>
  );
}

export default User;
