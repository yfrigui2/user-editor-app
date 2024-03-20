import { useMutation, useQuery, useQueryClient } from "react-query";

// TODO: separate API calls into a separate file

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

// Fetch users function
const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(USERS_API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

// Update user function
const updateUser = async (
  userId: number,
  updatedData: Partial<User>
): Promise<User> => {
  const response = await fetch(`${USERS_API_URL}/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
};

export const useFetchUsers = () => {
  return useQuery<User[]>(["users"], fetchUsers);
};

export const useUpdateUser = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation(
    (user: { id: number; updatedData: Partial<User> }) =>
      updateUser(user.id, user.updatedData),
    {
      onSuccess: () => {
        // Invalidate and refetch the users list after a successful update
        queryClient.invalidateQueries(["users"]);
        onSuccess?.();
      },
    }
  );
};
