import { useEffect, useState } from "react";
import axios from "axios";

export default function FetchUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      await axios
        .get("/api/v1/auth-service/users/profile")
        .then((res: any) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
    fetchUser();
  }, []);

  return {
    user,
    isLoading,
    setUser,
  };
}
