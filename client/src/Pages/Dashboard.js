import React, { useState, useEffect } from "react";
import ChatContainer from "../Components/ChatContainer";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";
// import TinderCard from "../react-tinder-card";
import axios from "axios";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [skilledUsers, setSkilledUsers] = useState();
  const [lastDirection, setLastDirection] = useState();

  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  const userId = cookie.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSkilledUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/skilled-users", {
        params: { skill: user?.skills },
      });

      setSkilledUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser()

}, [])

useEffect(() => {
    if (user) {
      getSkilledUsers()
    }
}, [user])

  const updateMatches = async ( matchedUserId ) => {
    try {
      await axios.put("http://localhost:8000/addmatch", {
        userId,
        matchedUserId
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId);

  const filteredSkilledUsers = skilledUsers?.filter(
    skilledUser => !matchedUserIds.includes(skilledUser.user_id)
  )

  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />

          <div className="swipe_container">
            <div className="card_container">
              {filteredSkilledUsers?.map((skilledUser) => (
                <TinderCard
                  className="swipe"
                  key={skilledUser.user_id}
                  onSwipe={(dir) => swiped(dir, skilledUser.user_id)}
                  onCardLeftScreen={() => outOfFrame(skilledUser.firstName)}
                >
                  <div
                    style={{
                      backgroundImage: "url(" + skilledUser.image + ")",
                    }}
                    className="card"
                  >
                    <h3>{skilledUser.firstName}</h3>
                  </div>
                </TinderCard>
              ))}
              <div className="swipe-info">
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
