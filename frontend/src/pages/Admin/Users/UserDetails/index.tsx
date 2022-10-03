import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "types/user";

type UrlParams = {
  userId: string;
};

const UserDetails = () => {
  const { userId } = useParams<UrlParams>();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const mockData: User = {
      id: 1,
      name: "Maria",
      lastName: "Silva",
      email: "maria@gmail.com",
      roles: [
        {
          id: 1,
          authority: "ROLE_ADMIN",
        },
        {
          id: 2,
          authority: "ROLE_OPERATOR",
        },
      ],
    };

    setUser(mockData);
  }, []);

  return (
    <div className="container mt-3 mb-5 py-lg-3">
      <div className="card base-card">
        <div className="card-body">
          <h5 className="card-title">{`${user?.name} ${user?.lastName}`}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{user?.email}</h6>
          {user?.roles.map((role) => (
            <p className="card-text">{role.authority}</p>
          ))}

          <a href="link" className="card-link">
            Card link
          </a>
          <a href="link" className="card-link">
            Another link
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
