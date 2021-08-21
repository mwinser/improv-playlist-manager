import * as React from "react"
import { graphql } from "gatsby"
import { useState } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

function IndexPage({data}){ 
  const [filter, setFilter] = useState()
  
  function ToggleFilter(category) {
    if (filter && filter.includes(category)){
      setFilter(prevFilter=>{
        if (prevFilter.length>=2) {
          return prevFilter.filter(item=>item !== category)
        } else {
          return null
        }
        
      })
    } else if (filter) {
      setFilter(prevFilter=>[...prevFilter,category])
    } else {
      setFilter([category])
    }
  }
  
  return(
  <Layout>
    <Seo title="Home" />
    <h1>Improv Games List</h1>
    {filter
      ? <>
          <p>Filtered by: {JSON.stringify(filter)}</p>
          <button onClick={()=>setFilter()}>Clear Filter</button>
        </>
      : null
    }
    {data
      .allGoogleSheet
      .nodes[0]
      .Main
      .filter(node=> {
        if (filter) {
          let allTags = node.category.split(",")
          return allTags.filter(item=>filter.includes(item.trim())).length === filter.length
        }
        return true

      })
      .map(node=>
      (<div key={node.id} className="card">
        <h2>{node.name}</h2>
        
        <p>
          <strong>Categories: </strong> 
          {node.category.split(",").map(item=>
              <button onClick={()=>ToggleFilter(item.trim())}>
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
        example
        seeAlso
      }
    }
  }
}
`