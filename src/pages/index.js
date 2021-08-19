import * as React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <Seo title="Home" />
    <h1>Improv Games List</h1>
    {data.allGoogleSheet.nodes[0].Main.map(node=>
      (<div key={node.id} className="card">
        <h2>{node.name}</h2>
        <p><strong>Categories:</strong> {node.category}</p>
        <p><strong>Players:</strong> {node.players}</p>
        <p><strong>Description:</strong> {node.description}</p>
        <p><strong>How to play:</strong> {node.howToPlay}</p>
        <p><strong>Notes:</strong> {node.notes}</p>
      </div>)
    ) 
    }
    
    
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </p>
  </Layout>
)

export default IndexPage


export const query = graphql`
query AllGames{
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
      }
    }
  }
}
`