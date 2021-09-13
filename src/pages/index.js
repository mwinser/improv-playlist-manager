import * as React from "react"
import { graphql } from "gatsby"
import { useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Playlist from "../components/playlist"
import GameCard from "../components/gameCard"

function IndexPage({ data }) {
  const [tagFilter, setTagFilter] = useState()
  const [searchFilter, setSearchFilter] = useState()
  const [numberPlayersFilter, setNumberPlayersFilter] = useState()

  function ToggleTagFilter(category) {
    if (tagFilter && tagFilter.includes(category)) {
      setTagFilter(prevFilter => {
        if (prevFilter.length >= 2) {
          return prevFilter.filter(item => item !== category)
        } else {
          return null
        }
      })
    } else if (tagFilter) {
      setTagFilter(prevFilter => [...prevFilter, category])
    } else {
      setTagFilter([category])
    }
  }

  function ClearFilters() {
    setNumberPlayersFilter("")
    setSearchFilter("")
    setTagFilter()
  }

  const filteredList = data.allGoogleSheet.nodes[0].Main.filter(node => {
    //filter by category
    if (tagFilter) {
      let allTags = node.category.split(",")
      //return true if all tags of item include tags of filter
      return (
        allTags.filter(item => tagFilter.includes(item.trim())).length ===
        tagFilter.length
      )
    }
    return true
  })
    //filter by title search
    .filter(node => {
      if (searchFilter) {
        var regex = new RegExp(searchFilter, "i")
        return regex.test(node.name)
      }
      return true
    })
    //filter by minimum players
    .filter(node =>
      numberPlayersFilter
        ? node.minimumPlayers <= numberPlayersFilter &&
          node.maximumPlayers >= numberPlayersFilter
        : true
    )

  return (
    <Layout>
      <Seo title="Home" />
      <div className="games-list">
        <h1>Improv Games List</h1>
        <div className="flex-row">
          <button onClick={() => ClearFilters()}>Clear all filters</button>
          <div className="flex-row">
            # Players: 
            <input
              min={2}
              max={6}
              type="number"
              placeholder="#"
              value={numberPlayersFilter}
              onChange={e => setNumberPlayersFilter(e.target.value)}
            />
          </div>
          <div className="flex-row">
            Search:  
            <input
              type="text"
              size={15}
              placeholder="Title"
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
            />
          </div>
        </div>

        {tagFilter ? (
          <p>Tags Filtered by: {JSON.stringify(tagFilter)}</p>
        ) : null}

        {filteredList.length > 0 
          ? filteredList.map(node => <GameCard key={node.id} node={node} ToggleTagFilter={ToggleTagFilter}/> )
          : <h3>No games meet the search criteria</h3>
        }
      </div>
      <div className="right-panel">
        <Playlist />
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query AllGames {
    allGoogleSheet {
      nodes {
        Main {
          id
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
