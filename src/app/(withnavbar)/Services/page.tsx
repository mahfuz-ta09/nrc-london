'use client'
import Footer from '@/component/shared/Footer/Footer'
import Process from '@/component/shared/Process/Process'
import '@/css/Services/Services.css'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
    
    return (
      <div className='services-container'>
        <div className="services-banner">
          <div className="services-banner-content wdth">
            <h1>Comprehensive Services for Success</h1>
            <p>Explore your limits with us</p>
            <button onClick={() => router.push('/Contact')}>Contact</button>
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
          <h1 className='spacialties-header wdth'>Our area of specialization</h1>
          <div className="area-specialties wdth">
            <div className="specialties-card">
              <img className='sp-card-img' src="https://i.ibb.co.com/WW6r7v8/Untitled-design-removebg-preview.png" alt="" />
              <h1>Lorem, ipsum dolor.</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, sint.</p>
            </div>
            <div className="specialties-card">
              <img className='sp-card-img' src="https://i.ibb.co.com/WW6r7v8/Untitled-design-removebg-preview.png" alt="" />
              <h1>Lorem, ipsum dolor.</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, sint.</p>
            </div>
            <div className="specialties-card">
              <img className='sp-card-img' src="https://i.ibb.co.com/WW6r7v8/Untitled-design-removebg-preview.png" alt="" />
              <h1>Lorem, ipsum dolor.</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, sint.</p>
            </div>
            <div className="specialties-card">
              <img className='sp-card-img' src="https://i.ibb.co.com/WW6r7v8/Untitled-design-removebg-preview.png" alt="" />
              <h1>Lorem, ipsum dolor.</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, sint.</p>
            </div>
          </div>
          <Process />
        </div>
        <Footer />
      </div>
    )
}


export default page