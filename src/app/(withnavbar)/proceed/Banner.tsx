"use client"
import Link from "next/link"

export default function Banner() {
    return (
        <div className="page-banner">
            <div className="banner-content">
            <div className="bread-crumb">
                <Link className="bread-link1" href="/">home</Link>
                <div className="bread-dot"></div>
                <Link className="bread-link2" href="/proceed">student registration form</Link>
            </div>
            <h1>Student Registration</h1>
            <div className="title-decoration"></div>
            <p>
                The world is a book, and those who do not travel read only one page.
                Education abroad helps you read the entire story, one experience at a time.
            </p>
            <Link className="banner-link" href="/proceed">apply now</Link>
            </div>
        </div>
    )
}
