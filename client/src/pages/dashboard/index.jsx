// IMPORT COMPONENTS
import Layout from './components/layout';
 
export default function Page() {
  return (
    <h1>Hello, Dashboard Home Page!</h1>
  )
}
 
Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}