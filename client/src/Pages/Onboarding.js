import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Onboarding = () => {

  let navigate = useNavigate();

  const [cookie, setCookie, removeCookie] = useCookies()

  const [formData, setFormData] = useState({
    user_id: cookie.UserId,
    firstName: '',
    lastName: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    gender_identity: 'woman',
    show_gender: true,
    mySkill: '',
    skills: '',
    about: '',
    image: '',
    matches: []
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(' https://find-your-buddy-app.herokuapp.com/user', { formData })

      const success = response.status === 200;

      if(success) navigate('/dashboard')
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  };

  console.log(formData);

  return (
    <>
      <Navbar minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>CREATE AN ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              required={true}
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              required={true}
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
                placeholder="DD"
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
                placeholder="MM"
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
                placeholder="YYYY"
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender_identity"
                type="radio"
                name="gender_identity"
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === 'man'}
              />
              <label htmlFor="man-gender_identity">Man</label>
              <input
                id="woman-gender_identity"
                type="radio"
                name="gender_identity"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === 'woman'}
              />
              <label htmlFor="woman-gender_identity">Woman</label>
              <input
                id="more-gender_identity"
                type="radio"
                name="gender_identity"
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === 'more'}
              />
              <label htmlFor="more-gender_identity">More</label>
            </div>

            <label htmlFor="show-gender">Show gender on my profile</label>
            <div className="multiple-input-container">
            <input
              id="show_gender"
              type="checkbox"
              name="show_gender"
              checked={formData.show_gender}
              onChange={handleChange}
            />
            </div>

            <label htmlFor="mySkill">My Skill</label>
            <input
              id="mySkill"
              type="text"
              name="mySkill"
              onChange={handleChange}
              required={true}
              value={formData.mySkill}
            />

            <label htmlFor="skills">Show Me</label>
            <input
              id="skills"
              type="text"
              name="skills"
              onChange={handleChange}
              required={true}
              placeholder="Skills"
              value={formData.skills}
            />

            <label htmlFor="about">About Me</label>
            <input
              id="about"
              type="text"
              name="about"
              placeholder="About Me"
              onChange={handleChange}
              required={true}
              value={formData.about}
            />
            <input type="submit" />
          </section>

          <section>
            <label htmlFor="url">Profile Picture</label>
            <input
              type="url"
              name="image"
              id="image"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              {formData.image && <img src={formData.image} alt='profile pic preview' />}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default Onboarding;
