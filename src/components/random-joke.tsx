"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, useEffect } from "react";

// Import custom Button component from the UI directory
import { Button } from "@/components/ui/button";

// Define a TypeScript interface for the joke response
interface JokeResponse {
  setup: string;
  punchline: string;
}

// Default export of the RandomJokeComponent function
export default function RandomJoke() {
  // State hook for managing the current joke
  const [joke, setJoke] = useState<string>("");

  // Effect hook to fetch a joke when the component mounts
  useEffect(() => {
    fetchJoke();
  }, []); // Empty dependency array ensures this runs once on mount

  // Async function to fetch a random joke from the API
  async function fetchJoke(): Promise<void> {
    try {
      // Make a GET request to the joke API
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data: JokeResponse = await response.json();
      // Update state with the fetched joke
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (error) {
      console.error("Error fetching joke:", error); // Log any errors
      // Set an error message if the fetch fails
      setJoke("Failed to fetch joke. Please try again.");
    }
  }

  // JSX return statement rendering the random joke UI
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      {/* Center the joke card within the screen */}
      <div className="bg-amber-500 rounded-2xl shadow-lg p-8 w-full max-w-md border-4 border-[#36136e] ">
        {/* Header with title */}
        <h1 className="text-3xl font-bold mb-4 text-[#36136e]">
          😂 Random Joke 👈
        </h1>
        {/* Display the joke or a loading message */}
        <div className="bg-[#36136e] rounded-lg p-6 mb-6 text-[#f59e0b] text-lg">
          {joke || "Loading..."}
        </div>
        {/* Button to fetch a new joke */}
        <Button
          onClick={fetchJoke}
          className="bg-[#f59e0b] border-2 border-[#36136e]  hover:bg-[#35250e] border:none text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
        >
          😂 Get New Joke 😂
        </Button>
      </div>
    </div>
  );
}