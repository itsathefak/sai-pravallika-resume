"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shuffle, RotateCcw, Trophy, Timer, Eye, EyeOff, Settings } from "lucide-react"
import useSound from "use-sound"

const PUZZLE_IMAGE = "/images/puzzle-forest.jpg"

interface Tile {
  id: number
  currentPos: number
  correctPos: number
}

export default function PuzzleGame() {
  const [grid, setGrid] = useState<Tile[]>([])
  const [completed, setCompleted] = useState(false)
  const [moves, setMoves] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [time, setTime] = useState(0)
  const [showInstructions, setShowInstructions] = useState(true)
  const [difficulty, setDifficulty] = useState("medium") // easy, medium, hard
  const [showPreview, setShowPreview] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const puzzleContainerRef = useRef(null)
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.3 })
  const [playSuccess] = useSound("/sounds/success.mp3", { volume: 0.5 })

  const getGridSize = () => {
    switch (difficulty) {
      case "easy":
        return 3 // 3x3
      case "medium":
        return 4 // 4x4
      case "hard":
        return 5 // 5x5
      default:
        return 4
    }
  }

  useEffect(() => {
    initializePuzzle()
  }, [difficulty])

  useEffect(() => {
    let interval
    if (isPlaying && !completed && startTime) {
      interval = setInterval(() => {
        setTime(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, completed, startTime])

  const initializePuzzle = () => {
    const gridSize = getGridSize()
    const totalTiles = gridSize * gridSize

    const orderedGrid = Array.from({ length: totalTiles - 1 }, (_, i) => ({
      id: i + 1,
      currentPos: i,
      correctPos: i,
    }))

    orderedGrid.push({
      id: 0, // 0 represents empty tile
      currentPos: totalTiles - 1,
      correctPos: totalTiles - 1,
    })

    // Shuffle the puzzle immediately to make it playable
    const shuffledGrid = createShuffledPuzzle(orderedGrid, gridSize)
    setGrid(shuffledGrid)
    setCompleted(false)
    setStartTime(Date.now())
    setTime(0)
    setMoves(0)
    setIsPlaying(true)
  }

  const resetPuzzle = () => {
    const gridSize = getGridSize()
    const totalTiles = gridSize * gridSize

    const orderedGrid = Array.from({ length: totalTiles - 1 }, (_, i) => ({
      id: i + 1,
      currentPos: i,
      correctPos: i,
    }))

    orderedGrid.push({
      id: 0, // 0 represents empty tile
      currentPos: totalTiles - 1,
      correctPos: totalTiles - 1,
    })

    setGrid(orderedGrid)
    setCompleted(false)
    setStartTime(null)
    setTime(0)
    setMoves(0)
    setIsPlaying(false)
    setShowInstructions(true)
  }

  const createShuffledPuzzle = (orderedGrid: Tile[], gridSize: number) => {
    const shuffled = [...orderedGrid]
    const numMoves = gridSize * gridSize * 15
    let emptyPos = shuffled.findIndex((tile) => tile.id === 0)

    for (let i = 0; i < numMoves; i++) {
      const possibleMoves = getValidMoves(emptyPos, gridSize)
      if (possibleMoves.length > 0) {
        const randomMoveIndex = Math.floor(Math.random() * possibleMoves.length)
        const tileToMove = possibleMoves[randomMoveIndex]
        ;[shuffled[emptyPos], shuffled[tileToMove]] = [shuffled[tileToMove], shuffled[emptyPos]]

        shuffled[emptyPos].currentPos = emptyPos
        shuffled[tileToMove].currentPos = tileToMove

        emptyPos = tileToMove
      }
    }

    return shuffled
  }

  const shufflePuzzle = () => {
    playClick()
    const gridSize = getGridSize()
    const shuffled = createShuffledPuzzle(grid, gridSize)

    setGrid(shuffled)
    setCompleted(false)
    setStartTime(Date.now())
    setTime(0)
    setMoves(0)
    setIsPlaying(true)
    setShowInstructions(false)
  }

  const getValidMoves = (emptyPos: number, gridSize: number): number[] => {
    const validMoves: number[] = []
    const row = Math.floor(emptyPos / gridSize)
    const col = emptyPos % gridSize

    if (row > 0) validMoves.push(emptyPos - gridSize)
    if (row < gridSize - 1) validMoves.push(emptyPos + gridSize)
    if (col > 0) validMoves.push(emptyPos - 1)
    if (col < gridSize - 1) validMoves.push(emptyPos + 1)

    return validMoves
  }

  const handleTileClick = (tileIndex: number) => {
    if (completed) return

    const gridSize = getGridSize()
    const emptyTileIndex = grid.findIndex((tile) => tile.id === 0)
    const validMoves = getValidMoves(emptyTileIndex, gridSize)

    if (validMoves.includes(tileIndex)) {
      playClick()

      const newGrid = [...grid]
      ;[newGrid[tileIndex], newGrid[emptyTileIndex]] = [newGrid[emptyTileIndex], newGrid[tileIndex]]

      newGrid[tileIndex].currentPos = tileIndex
      newGrid[emptyTileIndex].currentPos = emptyTileIndex

      setGrid(newGrid)
      setMoves(moves + 1)

      const isSolved = newGrid.every((tile) => tile.currentPos === tile.correctPos)
      if (isSolved) {
        setCompleted(true)
        setIsPlaying(false)
        playSuccess()
      }
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const gridSize = getGridSize()

  return (
    <section className="section-container bg-transparent">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h2 className="section-title">Interactive Challenge</h2>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className="glass rounded-2xl p-8 border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Environmental Sliding Puzzle</h3>
              <p className="text-slate-300 mb-6">
                Solve this nature-themed sliding puzzle! Rearrange the tiles to complete the beautiful forest landscape.
              </p>

              <div className="flex justify-center gap-8 mb-6">
                <div className="flex items-center gap-2 text-purple-300">
                  <Timer size={20} />
                  <span className="font-mono text-lg">{formatTime(time)}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300">
                  <span className="font-semibold text-lg">Moves: {moves}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-300">
                  <Settings size={20} />
                  <span className="font-semibold">
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} ({gridSize}×{gridSize})
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <select
                  value={difficulty}
                  onChange={(e) => {
                    playClick()
                    setDifficulty(e.target.value)
                  }}
                  className="px-4 py-2 bg-white/10 border border-purple-400/30 text-white rounded-full transition-all duration-300 hover:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="easy" className="bg-gray-800">
                    Easy (3×3)
                  </option>
                  <option value="medium" className="bg-gray-800">
                    Medium (4×4)
                  </option>
                  <option value="hard" className="bg-gray-800">
                    Hard (5×5)
                  </option>
                </select>

                <motion.button
                  onClick={() => {
                    playClick()
                    setShowPreview(!showPreview)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-2 border-2 border-blue-400 text-blue-300 rounded-full transition-all duration-300 hover:border-blue-400/80 font-medium"
                >
                  {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </motion.button>

                <motion.button
                  onClick={shufflePuzzle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full transition-all duration-300 shadow-lg font-medium"
                >
                  <Shuffle size={20} />
                  New Game
                </motion.button>

                <motion.button
                  onClick={resetPuzzle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-2 border-2 border-purple-400 text-purple-300 rounded-full transition-all duration-300 hover:border-purple-400/80 font-medium"
                >
                  <RotateCcw size={20} />
                  Reset
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8 overflow-hidden"
                >
                  <div className="bg-black/30 p-4 rounded-lg border border-purple-400/20">
                    <p className="text-sm mb-4 text-center text-purple-300">Complete Image Preview</p>
                    <div className="relative w-full max-w-[300px] h-[300px] mx-auto rounded-lg overflow-hidden border-2 border-purple-400/30">
                      <img
                        src={PUZZLE_IMAGE || "/placeholder.svg"}
                        alt="Forest landscape preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showInstructions && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[150]"
                  onClick={() => setShowInstructions(false)}
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="bg-surface border border-purple-400/30 p-8 rounded-xl max-w-md text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h4 className="text-xl font-bold mb-4 text-white">How to Play</h4>
                    <p className="mb-6 text-slate-300 leading-relaxed">
                      Click on tiles adjacent to the empty space to move them. Rearrange all tiles to complete the
                      beautiful forest landscape!
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="flex flex-col items-center">
                        <div className="bg-purple-500/20 p-3 rounded-lg mb-2">
                          <Timer size={24} className="text-purple-400" />
                        </div>
                        <span className="text-xs text-slate-400">Track time</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-emerald-500/20 p-3 rounded-lg mb-2">
                          <Eye size={24} className="text-emerald-400" />
                        </div>
                        <span className="text-xs text-slate-400">Preview image</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-pink-500/20 p-3 rounded-lg mb-2">
                          <Settings size={24} className="text-pink-400" />
                        </div>
                        <span className="text-xs text-slate-400">Choose difficulty</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-medium"
                      onClick={() => {
                        playClick()
                        setShowInstructions(false)
                      }}
                    >
                      Got it!
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative mx-auto w-fit" ref={puzzleContainerRef}>
              <div
                className="grid gap-1 bg-white/5 p-4 rounded-xl border border-purple-400/20"
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  width: "400px",
                  height: "400px",
                }}
              >
                {grid.map((tile, index) => (
                  <motion.div
                    key={`${tile.id}-${index}`}
                    className={`
                      relative rounded-lg overflow-hidden border border-purple-400/20
                      ${tile.id === 0 ? "bg-transparent border-transparent" : "cursor-pointer bg-white/5 hover:border-purple-400/60"}
                    `}
                    onClick={() => handleTileClick(index)}
                    whileHover={tile.id !== 0 ? { scale: 1.02 } : {}}
                    transition={{ duration: 0.1 }}
                  >
                    {tile.id !== 0 && (
                      <>
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `url(${PUZZLE_IMAGE})`,
                            backgroundSize: `${gridSize * 100}%`,
                            backgroundPosition: `${(tile.correctPos % gridSize) * (100 / (gridSize - 1))}% ${Math.floor(tile.correctPos / gridSize) * (100 / (gridSize - 1))}%`,
                          }}
                        />
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                          {tile.id}
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {completed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                      className="bg-surface border border-purple-400/30 p-8 rounded-xl text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="mb-4"
                      >
                        <Trophy size={50} className="text-yellow-400 mx-auto" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2 text-white">Puzzle Completed!</h3>
                      <p className="text-slate-300 mb-4">Congratulations! You solved the environmental puzzle!</p>
                      <div className="bg-white/5 p-4 rounded-lg mb-6 border border-purple-400/20">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-purple-300 font-bold text-lg">{formatTime(time)}</div>
                            <div className="text-slate-400 text-sm">Time</div>
                          </div>
                          <div>
                            <div className="text-emerald-300 font-bold text-lg">{moves}</div>
                            <div className="text-slate-400 text-sm">Moves</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-medium"
                          onClick={shufflePuzzle}
                        >
                          Play Again
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="border-2 border-purple-400 text-purple-300 px-6 py-3 rounded-full font-medium hover:border-purple-400/80"
                          onClick={() => {
                            playClick()
                            const nextDifficulty =
                              difficulty === "easy" ? "medium" : difficulty === "medium" ? "hard" : "easy"
                            setDifficulty(nextDifficulty)
                          }}
                        >
                          Try {difficulty === "easy" ? "Medium" : difficulty === "medium" ? "Hard" : "Easy"}
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-center mt-6">
              <p className="text-slate-400 text-sm">
                🌱 This puzzle features a beautiful forest scene representing environmental sustainability and nature
                conservation
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
