import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"

const Page404 = () => {
    return(
        <div>
            <ErrorMessage/>
            <Link to='/'>back</Link>
        </div>
    )
}

export default Page404;