import * as React from "react"
import { graphql } from "gatsby"
import { useState, useContext } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Playlist from "../components/playlist"
import GameCard from "../components/gameCard"
import { Context } from "../context"

function IndexPage({ data }) {
  const [catFilter, setCatFilter] = useState()
  const [searchFilter, setSearchFilter] = useState()
  const [numberPlayersFilter, setNumberPlayersFilter] = useState()
  const { playlist, toggleGameInPlaylist } = useContext(Context)
  
  const fullGamesList = data.allGoogleSheet.nodes[0].Main
  
  //get full categories list
  const categorySet = new Set()
  fullGamesList.map(game=>game.category.split(",").forEach(cat=>categorySet.add(cat.trim())))
  const categoryList = [...categorySet].filter(item=>item!=="").sort()

  

  function RandomPlaylist(number) {
    var randomList = []
    while (randomList.length<number) {
        var gameToAdd = filteredList[~~(Math.random()*filteredList.length)].name
        if (!playlist.includes(gameToAdd)) randomList.push(gameToAdd)
    }
    randomList.forEach(game=>toggleGameInPlaylist(game))
  }

  function ClearFilters() {
    setNumberPlayersFilter("")
    setSearchFilter("")
    setCatFilter()
  }

  function ScrollToTop() {
    document.documentElement.scrollTop = 0
  }

  const filteredList = fullGamesList.filter(node => {
    //filter by category
    if (catFilter) {
      let allTags = node.category.split(",")
      //return true if all tags of item include tags of filter
      return (
        allTags.filter(item => catFilter.includes(item.trim())).length ===
        catFilter.length
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
          <div style={{display: "flex", flexDirection: "column"}}>
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
                size={10}
                placeholder="Title"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
              />
            </div>
            <div className="flex-row">
              Category:  
              <select 
                onChange={e => e.target.value==="" ? setCatFilter() : setCatFilter([e.target.value])}
                value={catFilter || "None"}
              >
                <option value="">None</option>
                {categoryList.map(cat=><option value={cat} key={"cat:" + cat}>{cat}</option>)}

              </select>
            </div>
          </div>
          <button onClick={()=> RandomPlaylist(1)}> Add Random Game</button>
        </div>



        {filteredList.length > 0 
          ? filteredList.map(node => <GameCard key={node.id} node={node} clearFilters={()=>ClearFilters()} /> )
          : <h3>No games meet the search criteria</h3>
        }
      </div>
      <div className="right-panel">
        <div className="back-to-top">
          <button onClick={ScrollToTop}>
            Back to Top
          </button>
        </div>
        <Playlist clearFilters={()=>ClearFilters()}/>
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
