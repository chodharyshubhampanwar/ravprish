import { useQuery, useMutation, useQueryClient } from "react-query";
import { userService } from "../services/userService";
import { User } from "../types/auth";

export const useUser = (firebaseId: string | null | undefined) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading, error, isError } = useQuery<User | null>({
    queryKey: ["user", firebaseId],
    queryFn: () => (firebaseId ? userService.getUser(firebaseId) : Promise.resolve(null)),
    enabled: !!firebaseId,
  });

  const createUser = useMutation({
    mutationFn: userService.createUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["user", newUser.uid], newUser);
    },
  });

  // const getUser = useMutation({
  //   mutationFn: userService.getUser,
  //   onSuccess: (user) => {
  //     queryClient.setQueryData(["user", user.uid], user);
  //   },
  // });

  return {
    supabaseUserId: user?.id || null,
    isLoading,
    createUser,
    error: error as Error | null,
    isError,
  };
};


