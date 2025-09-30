"use client";
import { useRouter } from "next/navigation";

const CentreContent = () => {
  const router = useRouter();

  return (
    <div className="responsive-container-block bigContainer">
      <div className="responsive-container-block Container bottomContainer">
        <div className="ultimateImg">
          <img
            className="mainImg"
            src="https://i.ibb.co.com/W4JyRN28/home-class.jpg"
            alt="About NRC Educational Consultants"
          />
          <div className="purpleBox">
            <p className="purpleText">
              Empowering students with expert guidance for a successful study abroad journey.
            </p>
          </div>
        </div>

        <div className="allText bottomText">
          <p className="text-blk subHeadingText">
            Welcome to NRC Educational Consultants Ltd., your trusted partner in global education.
          </p>

          <p className="text-blk des">
            Established in 2022 as MKN Pvt. Ltd. and re-registered in 2025 as NRC Education Group
            Limited (Global trading name: NRC Educational Consultants), we have grown into a leading
            educational consultancy firm specializing in study abroad opportunities.
          </p>

          <p className="text-blk des">
            Our founder, Mr. Kamrul Islam, is a graduate in Business Management from Bath Spa
            University, UK, and brings over a decade of hands-on experience in the education sector.
            Having once been an international student himself, Kamrul's own journey of coming to the
            UK and successfully completing his studies serves as a powerful source of insight and
            inspiration for our institution. His firsthand understanding of the challenges and
            opportunities faced by students abroad enables our team to offer personalized support,
            practical advice, and dedicated guidance at every step of the study abroad journey.
          </p>

          <p className="text-blk des">
            <strong>Our Achievements:</strong>
          </p>

          <ul className="text-blk des">
            <li>Over 500 students successfully placed in top institutions worldwide</li>
            <li>Collaborations with more than 100 agents globally</li>
            <li>
              Strong partnerships with reputable institutions, ensuring a wide range of study options
              for our students
            </li>
          </ul>

          <p className="text-blk des">
            At NRC Educational Consultants Ltd., we are committed to delivering exceptional service,
            expertise, and results. Join us in shaping the future of international education.
          </p>

          <button onClick={() => router.push("/services")} className="explore">
            View Services
          </button>
          <button style={{ marginTop: "20px" }} onClick={() => router.push("/contact")} className="explore">
            Contact Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CentreContent;
