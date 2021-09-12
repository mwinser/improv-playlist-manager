import * as React from "react"
import { graphql } from "gatsby"
import { useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Context } from "../context"
import { useContext } from "react"
import Playlist from "../components/playlist"

function IndexPage({data}){ 
  const [tagFilter, setTagFilter] = useState()
  const [searchFilter, setSearchFilter] = useState()
  const [numberPlayersFilter, setNumberPlayersFilter] = useState()
  const {playlist, toggleGameInPlaylist} = useContext(Context)


  function ToggleTagFilter(category) {
    if (tagFilter && tagFilter.includes(category)){
      setTagFilter(prevFilter=>{
        if (prevFilter.length>=2) {
          return prevFilter.filter(item=>item !== category)
        } else {
          return null
        }
        
      })
    } else if (tagFilter) {
      setTagFilter(prevFilter=>[...prevFilter,category])
    } else {
      setTagFilter([category])
    }
  }

  function ClearFilters() {
    setNumberPlayersFilter("")
    setSearchFilter("")
    setTagFilter()
  }


  
  return(
  <Layout>
    <Seo title="Home" />
    <div className="games-list">
      <h1>Improv Games List</h1>
      <div className="flex-row">
      <button onClick={()=>ClearFilters()}>Clear all filters</button>
        <input
          min={2}
          max={6}
          type="number"
          placeholder="#Players"
          value={numberPlayersFilter}
          onChange={e=>setNumberPlayersFilter(e.target.value)}
        />
        <input
          type="text"
          size={15}
          placeholder="Search by Title"
          value={searchFilter}
          onChange={e=>setSearchFilter(e.target.value)}
        />
        <p>Games Selected: {playlist && playlist.length}</p>
      </div>
      
      {tagFilter
        ?
          <p>Tags Filtered by: {JSON.stringify(tagFilter)}</p>
        : null
      }
      {data
        .allGoogleSheet
        .nodes[0]
        .Main
        .filter(node=> { //filter by category
          if (tagFilter) {
            let allTags = node.category.split(",")
            //return true if all tags of item include tags of filter
            return allTags.filter(item=>tagFilter.includes(item.trim())).length === tagFilter.length
          }
          return true
        })
        //filter by title search
        .filter(node=> {
          if (searchFilter)  {
            var regex = new RegExp(searchFilter, "i")
            return regex.test(node.name)
          }
          return true
        })
        //filter by minimum players
        .filter(node=> numberPlayersFilter ? node.minimumPlayers <= numberPlayersFilter && node.maximumPlayers >= numberPlayersFilter : true)
        //list all data as cards
        .map(node=> 
        (<div key={node.id} className="card">
          <div className="flex-row">
            <h2>{node.name}</h2>
            <button onClick={()=>toggleGameInPlaylist(node.name)}>
              {playlist && playlist.includes(node.name) ? `Remove from ` : `Add to `} Playlist
            </button>
          </div>
          
          
          <p>
            <strong>Categories: </strong> 
            {node.category.split(",").map(item=>
                <button key={item + " button"} onClick={()=>ToggleTagFilter(item.trim())}>
                  {item.trim()}
                </button>

              )
            }
          </p>
          <p><strong>Players:</strong> {node.players}</p>
          <p><strong>Description:</strong> {node.description}</p>
          <p><strong>How to play:</strong> {node.howToPlay}</p>
          {node.example
          ? <blockquote>{node.example}</blockquote>
          : null
          }
          
          {node.notes 
          ? <p><strong>Notes:</strong> {node.notes}</p>
          : null
          }
          {node.seeAlso 
          ? <p><strong>See also:</strong> {node.seeAlso} </p>
          : null
          }
        </div>)
      ) 
      }
    </div>
    <div className="right-panel">
      <Playlist/>
    </div>
    
    
  </Layout>
)
}

export default IndexPage



export const query = graphql`
query AllGames{
  allGoogleSheet {
    nodes {
      Main {
        name
        howToPlay
        description
        category
        notes
        players
        maximumPlayers
        minimumPlayers
        example
        seeAlso
      }
    }
  }
}
`