import '../styles/_styles.css'
import '../styles/style.css'
import '../styles/lineIcons/css/simple-line-icons.css'
import Head from 'next/head'
import 'funuicss/css/fun.css'
export default function App({ Component, pageProps }) {
  return (
  <div>
    <Head>
    <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
        <title>Ghana Statistical Service</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" />
   <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet" />
   <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.csss" rel="stylesheet" />
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" />
    </Head>
<div className="">

<Component {...pageProps} />
</div>
  </div>
      )
}
