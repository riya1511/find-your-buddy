import axios from 'axios'
import React, { useState, useEffect } from 'react'

const MatchesDisplay = ({ matches, setClickedUser }) => {

  const [matchedProfiles, setMatchedProfiles] = useState(null)

  const matchedUserIds = matches.map(({ user_id }) => user_id); 

  const getMatches = async () => {
    try {
      const response = await axios.get('https://find-your-buddy-app.herokuapp.com/users', {
        params: { userIds: JSON.stringify(matchedUserIds) }
      })

      setMatchedProfiles(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMatches()
  }, [matches])

  

  // console.log(matchedProfiles);

  return (
    <div className='matches_display'>
      {matchedProfiles?.map((match, _index) => (
        <div className='match-card' key={_index} onClick={() => setClickedUser(match)}>
          <div className='image_container'>
            <img src={match?.image} alt={`${match.firstName} profile`} />
          </div>
          <h3>{match?.firstName}</h3>
        </div>
      ))}
    </div>
  )
}

export default MatchesDisplay