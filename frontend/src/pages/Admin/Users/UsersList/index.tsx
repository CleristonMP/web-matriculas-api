import UsersCrudCard from "../UsersCrudCard";

const UsersList = () => {
  const mockData = [
    {
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
    },
    {
      id: 2,
      name: "Alex",
      lastName: "Green",
      email: "alex@gmail.com",
      roles: [
        {
          id: 2,
          authority: "ROLE_OPERATOR",
        },
      ],
    },
    {
      id: 3,
      name: "Bob",
      lastName: "Brown",
      email: "bob@gmail.com",
      roles: [
        {
          id: 2,
          authority: "ROLE_OPERATOR",
        },
      ],
    },
  ];

  return (
    <div className="container mb-2 py-lg-3">
      <div className="container mb-3 text-center text-lg-start px-xl-5">
        <a href="link">
          <button className="btn btn-primary text-white h-50px btn-crud-add">
            ADICIONAR
          </button>
        </a>
      </div>
      <div className="container">
        <div className="row justify-content-sm-between px-xl-5">
          {mockData.map((user) => (
            <UsersCrudCard user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
