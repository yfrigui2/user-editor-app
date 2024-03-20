import { useFetchUsers } from "../hooks/users";
import { UserCard } from "./UserCard";

export function UserList() {
  const { data: users, isError, isLoading } = useFetchUsers();

  return (
    <>
      <h1>Users</h1>
      <div className="profilesContainer">
        {isError && (
          <div>Oops! Something went wrong. Please try again later</div>
        )}
        {/* TODO: better loading state */}
        {isLoading && <div>Loading...</div>}
        {users && !isLoading && !isError && (
          <ul style={{ listStyleType: "none" }}>
            {users.map((user) => (
              <UserCard user={user} key={user.id} />
            ))}
          </ul>
        )}
        <div />
      </div>
    </>
  );
}
