import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act, render, screen, cleanup } from "@testing-library/react";
import AnecdoteList from "../components/AnecdoteList";
import "@testing-library/jest-dom/vitest";
import userEvent from '@testing-library/user-event'

import useAnecdoteStore, {
  useAnecdotes,
  useAnecdoteActions,
} from "./anecdoteStore";

import anecdoteServices from "../services/anecdotes";
import { useNotificationStore } from "./notificationStore";

afterEach(() => {
  cleanup()
})

vi.mock("../services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    deleteAnecdote: vi.fn(),
  },
}));

describe("anecdote store initialization", () => {
  // Before each test, clear the mocks
  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [] });
    vi.clearAllMocks();
  });

  it("the state is initialized with the anecdotes returned by the backend", async () => {
    // First create anecdote samples
    const backendAnecdotes = [
      {
        id: "1",
        content: "This is a test",
        votes: 0,
      },
      {
        id: "2",
        content: "I love JS",
        votes: 9,
      },
    ];

    anecdoteServices.getAll.mockResolvedValue(backendAnecdotes);

    const { result } = renderHook(() => ({
      anecdotes: useAnecdotes(),
      actions: useAnecdoteActions(),
    }));

    // Make sure that it's current length is 0
    expect(result.current.anecdotes).toHaveLength(0);

    // use act()
    await act(async () => {
      await result.current.actions.initialize();
    });

    // Now make sure that after calling act(), it's length is 2 and has the backend anecdotes
    expect(result.current.anecdotes).toHaveLength(2);
    expect(result.current.anecdotes).toEqual(backendAnecdotes);
  });

  it("Anecdotes recieved are ordered by votes in DESC order", async () => {
    const backendAnecdotes = [
      {
        id: 1,
        content: "First anecdote",
        votes: 10,
      },
      {
        id: 2,
        content: "Second anecdote",
        votes: 8,
      },
    ];

    // Now use the
    anecdoteServices.getAll.mockResolvedValue(backendAnecdotes);

    const { result } = renderHook(() => ({
      anecdotes: useAnecdotes(),
      actions: useAnecdoteActions(),
    }));

    // Now use act()
    await act(async () => {
      await result.current.actions.initialize();
    });

    // Now make sure it's length is 2 and the order is correct
    expect(result.current.anecdotes).toHaveLength(2);
    expect(result.current.anecdotes[0].content).toEqual(
      backendAnecdotes[0].content,
    );
    expect(result.current.anecdotes[1].content).toEqual(
      backendAnecdotes[1].content,
    );
  });
});

describe("AnecdoteList filtering", () => {
  beforeEach(() => {
    useAnecdoteStore.setState({
      anecdotes: [],
      stringVariables: {
        filter: "",
        anecdoteContentValue: "",
      },
    });

    useNotificationStore.setState({
      notification: "",
    });

    vi.clearAllMocks();
  });

  it("Only the filtered content is shown in the component", () => {
    // Sample anecdotes
    const anecdotesSample = [
      {
        id: 1,
        content: "This is a test",
        votes: 0,
      },
      {
        id: 2,
        content: "I love JS",
        votes: 1,
      },
      {
        id: 3,
        content: "Testing Zustard",
        votes: 7,
      },
    ];

    useAnecdoteStore.setState({
      anecdotes: anecdotesSample,
      stringVariables: {
        filter: "test",
        anecdoteContentValue: "",
      },
    });

    render(<AnecdoteList />);

    expect(screen.getByText("This is a test")).toBeInTheDocument();
    expect(screen.getByText("Testing Zustard")).toBeInTheDocument();
    expect(screen.queryByText("I love JS")).not.toBeInTheDocument();
  });
});

describe("Simulating vote increase", () => {
  beforeEach(() => {
    useAnecdoteStore.setState({
      anecdotes: [],
      stringVariables: {
        filter: "",
        anecdoteContentValue: "",
      },
    });

    useNotificationStore.setState({
      notification: "",
    });

    vi.clearAllMocks();
  });

  it("Voting for an anecdote does affect the page", async () => {
    const anecdoteSample = {
        id: 1,
        content: "I love zustand",
        votes: 1,
      };

    useAnecdoteStore.setState({
      anecdotes: [anecdoteSample],
      stringVariables: {
        filter: "",
        anecdoteContentValue: "",
      },
    });

    const updatedAnecdote = {
      ...anecdoteSample,
      votes: 2
    }

    anecdoteServices.update.mockResolvedValue(updatedAnecdote)

    const user = userEvent.setup()

    render(<AnecdoteList />)

    await user.click(screen.getByRole('button', { name: /vote/i }))

    expect(await screen.findByText(/has 2/i)).toBeInTheDocument()
  });
});
