import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { auth, pastSubs } from '../../../state';
import { Loader } from '../../common';
import RenderProfile from './RenderProfile';

const Profile: React.FC = () => {
  // pull list of users top 5 stories from recoil state && the API call getRecentSubsByChild()
  const [list, setList] = useRecoilState(pastSubs.list);
  // pull users email from state and update the users email from the API call udpateEmail()
  const [email, setEmail] = useRecoilState(auth.email);

  //
  useEffect(() => {
    Submissions.getMySubmissions()
      .then((subList) => {
        setList(subList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   Users.udpateEmail()
  //     .then((userEmail) => {
  //       setEmail(userEmail);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return list ? <RenderProfile picList={list} /> : <Loader />;
};

export default Profile;
