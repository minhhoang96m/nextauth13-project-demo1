import PostFeed from '../components/posts/PostFeed'
import Header from "../components/layout/Header"
import Form from "../components/Form"

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What is happening" />
      <PostFeed />
    </>
  )
}
