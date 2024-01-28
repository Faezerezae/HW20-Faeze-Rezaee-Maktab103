import React, { useEffect, useState } from 'react';
import { UserInfo, IUserInfoReponse } from '../utils/userInfo';

export function Tasks() {
  const [userInfo, setUserInfo] = useState<IUserInfoReponse | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user:any = await UserInfo();
      setUserInfo(user);
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      <p className="font-bold capitalize">{userInfo?.username}</p>
    </>
  );
}