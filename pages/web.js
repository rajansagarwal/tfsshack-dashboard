import Airtable from 'airtable';
import Head from 'next/head';
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const airtable = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    view: 'Grid View',
  });

  const records = await airtable
    .base(process.env.NEXT_PUBLIC_BASE_ID)('Web')
    .select({
      fields: ['Name', 'Details', 'Description', 'Type'],
      view: 'Grid View',
    })
    .all();

  const products = records.map((sig) => {
    return {
      name: sig.get('Name'),
      type: sig.get('Name'),
      status: sig.get('Type'),
      details: sig.get('Details'),
      description: sig.get('Description')
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
}

function Product({ name, description, details, status }) {

  function Colours() {
    if(status == 'Resource') {
        return '#08b445'
    }
    if (status == 'Soon') {
        return '#c89809'
    }
    if (status == 'Closed') {
        return 'red'
    }
}
  return (      
        <div className="col-12 collection">
         <div className="card">
           <div className="tags">
             <h2>{name}</h2>
             <div className="tag" style={{
               backgroundColor: Colours(),
             }}><span className="tag-content">{status}</span></div>
            </div>
             <i>{description}</i>
             <p>{details}</p>
         </div>
         </div>
  );
}

export default function Web({ products }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Turner Fenton Secondary School</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container" style={{ padding: '50px 0 100px 0' }}>

          <h1>Web Development Track</h1>
          <p>A curated list of resources to supercharge your skills in Web Development:</p><br/><br/>
        

<div className="row collection">

        {products.map((sig) => (
          <Product
            key={sig.name}
            name={sig.name}
            description={sig.description}
            details={sig.details}
            status={sig.status}
          />    
        ))}
        </div>

        
      </div>
    </div>
  )
}

