import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote, updateAnecdote } from "../requests";

export const useAnecdotes = () => {
  const queryClient = useQueryClient();
  // For fetching data
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // For creating data
  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
  });

  // For updating data
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (anecdoteToAdd) =>
      createAnecdoteMutation.mutate(anecdoteToAdd),
    updateAnecdote: (anecdoteToUpdate) =>
      updateAnecdoteMutation.mutate(anecdoteToUpdate),
  };
};
