import * as React from "react"
import { useContext } from "react"
import { Context } from "../context"




export default function GameCard(props) {
    const { playlist, toggleGameInPlaylist } = useContext(Context)
    const {node, ToggleTagFilter} = props
    return (
      <div className="card">
        <div className="flex-row">
          <h2>{node.name}</h2>
          <button onClick={() => toggleGameInPlaylist(node.name)}>
            {playlist && playlist.includes(node.name)
              ? `Remove from `
              : `Add to `}{" "}
            Playlist
          </button>
        </div>

        <p>
          <strong>Categories: </strong>
          {node.category.split(",").map(item => (
            <button
              key={item + " button"}
              onClick={() => ToggleTagFilter(item.trim())}
            >
              {item.trim()}
            </button>
          ))}
        </p>
        <p>
          <strong>Players:</strong> {node.players}
        </p>
        <p>
          <strong>Description:</strong> {node.description}
        </p>
        <p>
          <strong>How to play:</strong> {node.howToPlay}
        </p>
        {node.example ? <blockquote>{node.example}</blockquote> : null}

        {node.notes ? (
          <p>
            <strong>Notes:</strong> {node.notes}
          </p>
        ) : null}
        {node.seeAlso ? (
          <p>
            <strong>See also:</strong> {node.seeAlso}{" "}
          </p>
        ) : null}
      </div>
    )
}
