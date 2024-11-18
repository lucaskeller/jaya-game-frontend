import { useEffect, useState } from "react"
import { useGameContext } from "../../context/GameContext"
import axiosInstance from "../../utils/axiosInstance"
import { GroupedUser } from "./types"
import { Game } from "../../types"

const Results = () => {
  const { score } = useGameContext()
  const [ranking, setRanking] = useState<GroupedUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axiosInstance.get('/games?populate=game_user&_limit=-1');
        const games: Game[] = response.data.data;
  
        const grouped = games.reduce((acc: { [key: string]: GroupedUser }, game: Game) => {
          const user = game.game_user;
          if (user) {
            const email = user.email;
            if (!acc[email]) {
              acc[email] = {
                email,
                gameCount: 0,
                totalScore: 0,
              };
            }
            acc[email].gameCount += 1;
            acc[email].totalScore += game.score;
          }
          return acc;
        }, {});
  
        const sortedRanking = Object.values(grouped).sort((a: GroupedUser, b: GroupedUser) => b.totalScore - a.totalScore);
  
        setRanking(sortedRanking);
      } catch (err) {
        console.error('Erro ao buscar jogos:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchGames();
  }, []);
  

  const handleRestart = () => {
    window.location.href = '/'
  }

  return (
      <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Results</h1>
        </div>
      </header>
      <main className="p-4">
        <div className="mx-auto max-w-7xl mb-5">
          {!!score && (
            <p className="mb-2 text-2xl">
              Your score on this match is: <span className="font-bold text-red-500">{score}</span>
            </p>
          )}
          <button
            className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600`}
            onClick={() => handleRestart()}
          >
            Start a new game
          </button>
        </div>
        <h2 className="mb-2">Ranking:</h2>
        {loading && (
          <p>Loading...</p>
        )}
        {!loading && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Played</th>
                  <th className="px-4 py-2 border">Score</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((user, i) => (
                  <tr key={user.email} className="border-t">
                    <td className="px-4 py-2 border">{i + 1}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.gameCount}</td>
                    <td className="px-4 py-2 border">{user.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      </>
  )
}

export default Results