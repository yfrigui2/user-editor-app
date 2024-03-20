import * as Form from "@radix-ui/react-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchUsers, useUpdateUser } from "../hooks/users";

export const EditUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { data: users } = useFetchUsers();
  const userToEdit = users?.find((user) => user.id === Number(userId));
  // TODO: add a toast notification for success/error
  const { mutate } = useUpdateUser({ onSuccess: () => navigate("/") });

  const [name, setName] = useState(userToEdit?.name || "");
  const [email, setEmail] = useState(userToEdit?.email || "");
  const [phone, setPhone] = useState(userToEdit?.phone || "");

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setPhone(userToEdit.phone);
    }
  }, [userToEdit]);

  const handleUpdate = () => {
    mutate({ id: Number(userId), updatedData: { name, email, phone } });
  };

  if (!userToEdit) {
    return <div>User not found</div>;
  }

  // TODO: abstract some of these components into separate files for reusability

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <h1>Edit User</h1>
      <Form.Root
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
        className="FormRoot"
      >
        <Form.Field name="name" className="FormField">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label htmlFor="name" className="FormLabel">
              name
            </Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter a name
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="Input"
            />
          </Form.Control>
        </Form.Field>

        <Form.Field name="email" className="FormField">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label htmlFor="email" className="FormLabel">
              Email
            </Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter an email
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="Input"
            />
          </Form.Control>
        </Form.Field>

        <Form.Field name="phone" className="FormField">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label htmlFor="phone" className="FormLabel">
              Phone
            </Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter a phone number
            </Form.Message>
            {/* Note: I chose not to validate phone number further. I looked into
            using regex to validate, or using a library such as libphonenumber-js.
            However, I ran into issues with existing phone numbers with extensions
            parsing as invalid (eg 010-692-6593 x09125). Given time constraints and
            my lack of understanding of phone number validation, I decided to leave
            it as is.
            */}
          </div>
          <Form.Control asChild>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="Input"
            />
          </Form.Control>
        </Form.Field>
        {/* TODO: add a loading state to this button */}
        <button type="submit">Update User</button>
      </Form.Root>
    </div>
  );
};
