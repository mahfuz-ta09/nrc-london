"use client"
import Link from "next/link"

export default function Banner() {
    return (
      <div className="page-banner">
        <div className="banner-content">
          <div className="bread-crumb">
            <Link className="bread-link1" href="/">Home</Link>
            <div className="bread-dot" />
            <Link className="bread-link2" href="/recruitment-partner/become-agent">Become an agent</Link>
          </div>

          <h1>Join Our Global Education Network</h1>
            <div className="title-decoration"></div>

          <p>
            “Empower students. Build opportunities. Become a trusted partner in shaping global education journeys.”
          </p>

          <Link className="banner-link" href="#agentForm">Apply Now</Link>
        </div>
      </div>
    )
}
