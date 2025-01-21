import Footer from '@/component/shared/Footer/Footer'
import Process from '@/component/shared/Process/Process'
import '@/css/Services/Services.css'

const page = () => {
    return (
      <div className='services-container'>
        <div className="services-banner">
          <div className="services-banner-content wdth">
            <h1>Comprehensive Services for Success</h1>
            <p>Explore your limits with us</p>
            <button>Contact</button>
          </div>
        </div>
        
        <div className="service-content wdth">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quaerat nam similique officiis corporis quas voluptatem aspernatur adipisci, magni enim sit quam nihil expedita, velit ab. Quo aut facilis id saepe repellat blanditiis dolores unde aliquam assumenda, ea quisquam quidem, odit dolor delectus enim suscipit magni commodi? Numquam, labore laboriosam.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quaerat nam similique officiis corporis quas voluptatem aspernatur adipisci, magni enim sit quam nihil expedita, velit ab. Quo aut facilis id saepe repellat blanditiis dolores unde aliquam assumenda, ea quisquam quidem, odit dolor delectus enim suscipit magni commodi? Numquam, labore laboriosam.</p>

            <div className="services">
              
              <div className="services-btn-grp">
                <button className='services-btn'>Partner University</button>
                <button className='services-btn'>Student recruitement</button>
                <button className='services-btn'>Marketting Services</button>
              </div>

              <ul className="services-item">
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, cum autem itaque accusamus eos reprehenderit excepturi error ducimus tempora mollitia?</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, cum autem itaque accusamus eos reprehenderit excepturi error ducimus tempora mollitia?</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, cum autem itaque accusamus eos reprehenderit excepturi error ducimus tempora mollitia?</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, cum autem itaque accusamus eos reprehenderit excepturi error ducimus tempora mollitia?</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, cum autem itaque accusamus eos reprehenderit excepturi error ducimus tempora mollitia?</li>
              </ul>

            </div>
        </div>
        
        <div className="specialties">
          <div className="area-specialties wdth">
            <div className="specialties-card">sdfasdf</div>
            <div className="specialties-card">sfdasfd</div>
            <div className="specialties-card">sdfasdf</div>
            <div className="specialties-card">sdfsd</div>
          </div>
          <Process />
        </div>
        <Footer />
      </div>
    )
}


export default page