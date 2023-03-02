import { Link } from "react-router-dom"

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome!</h1>
            </header>
            <main>
                <p>Hello</p>
                <p>&nbsp;</p>
           
            </main>
            <footer>
                <Link to="/welcome">Go to home</Link>
            </footer>
        </section>

    )
    return content
}
export default Public