/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async"

function Meta({title, description, keywords}) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}></meta>
            <meta name="keywords" content={keywords}></meta>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: "Welcome to proshop",
    description: "we sell the best products for cheap",
    keywords: "electronic, buy electronics, cheap electronics"
}

export default Meta
