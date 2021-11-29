import * as React from "react"
import { useContext } from "react"
import { Context } from "../context"




export default function GameCard(props) {
    const { playlist, toggleGameInPlaylist } = useContext(Context)
    const {node} = props
    return (
      <div className="card" id={node.name}>
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
          <strong>Categories:</strong> {" " + node.category}
        </p>

        <p>
          <strong>Players:</strong> {node.players}
        </p>

        <p>
          <strong>Description:</strong> {node.description}
        </p>

        {node.howToPlay ? (
          <p>
            <strong>How to play:</strong> {node.howToPlay}
          </p>
        ) : null}
        
        {node.example ? <blockquote>{node.example}</blockquote> : null}

        {node.notes ? (
          <p>
            <strong>Notes:</strong> {node.notes}
          </p>
        ) : null}

        {node.seeAlso ? (
          <p>
            <strong>See also:</strong> 
            <a 
            onClick={()=>props.clearFilters()}
            href={`#${node.seeAlso}`}
            style={{color: "unset"}}
            >
              {node.seeAlso}
            </a>
          </p>
        ) : null}
      </div>
    )
}
