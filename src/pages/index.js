import * as React from "react"
import { graphql } from "gatsby"
import { useState } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

function IndexPage({data}){ 
  const [filter, setFilter] = useState()
  return(
  <Layout>
    <Seo title="Home" />
    <h1>Improv Games List</h1>
    {filter
      ? <>
          <p>Filtered by: {filter}</p>
          <button onClick={()=>setFilter()}>Clear Filter</button>
        </>
      : null
    }
    {data
      .allGoogleSheet
      .nodes[0]
      .Main
      .filter(node=>filter ? node.category.includes(filter) : true)
      .map(node=>
      (<div key={node.id} className="card">
        <h2>{node.name}</h2>
        
        <p>
          <strong>Categories: </strong> 
          {node.category.split(",").map(item=>
              <button onClick={()=>setFilter(item.trim())}>
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
        ? <p><strong>See also:</strong> {node.seeAlso}</p>
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