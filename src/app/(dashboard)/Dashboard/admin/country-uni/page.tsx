'use client'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import '@/css/Dashboard/admin/country-uni.css'
import Loader from '@/component/shared/Loader/Loader'
import { faAngleDoubleRight, faCancel, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const page = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    let isDown = false;
    let startX:number;
    let scrollLeft:number;
    
    
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        isDown = true;
        scrollRef.current.classList.add('active');
        startX = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft = scrollRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        if (!scrollRef.current) return;
        isDown = false;
        scrollRef.current.classList.remove('active');
    };

    const handleMouseUp = () => {
        if (!scrollRef.current) return;
        isDown = false;
        scrollRef.current.classList.remove('active');
    };

    const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 0.5;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
      <div className='university-content'>
        
        <div className="header">
          <h1>Manage countries/universites/subjects</h1>
          <button className='header-add-btn'>Add New Country</button>
        </div>

        <div className="country-list-slide"
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}>
                <div className="country-list">
                    <div className="country">
                        <img className='country-bg-img1' src="https://i.ibb.co/ZRqzgZf7/london-Bridge.jpg" alt="" />
                        <img className='country-bg-img2' src="https://i.ibb.co/hJwnY6kj/ukflag.jpg" alt="" />
                        <div className="overlay"></div>
                        <div className="country-details">
                            <p>country name: uk</p>
                            <p>country serial: 1</p>
                            <p>total university listed: 10</p>
                        </div>
                        <div className="country-btn-cont">
                            <button className='country-btn'>edit <FontAwesomeIcon icon={faPen}/></button>
                            <button className='country-btn'>add University</button>
                        </div>
                    </div>
                    <div className="country">
                        <img className='country-bg-img1' src="https://i.ibb.co/ZRqzgZf7/london-Bridge.jpg" alt="" />
                        <img className='country-bg-img2' src="https://i.ibb.co/hJwnY6kj/ukflag.jpg" alt="" />
                        <div className="overlay"></div>
                        <div className="country-details">
                            <p>country name: uk</p>
                            <p>country serial: 1</p>
                            <p>total university listed: 10</p>
                        </div>
                        <div className="country-btn-cont">
                            <button className='country-btn'>edit <FontAwesomeIcon icon={faPen}/></button>
                            <button className='country-btn'>add University</button>
                        </div>
                    </div>
                    <div className="country">
                        <img className='country-bg-img1' src="https://i.ibb.co/ZRqzgZf7/london-Bridge.jpg" alt="" />
                        <img className='country-bg-img2' src="https://i.ibb.co/hJwnY6kj/ukflag.jpg" alt="" />
                        <div className="overlay"></div>
                        <div className="country-details">
                            <p>country name: uk</p>
                            <p>country serial: 1</p>
                            <p>total university listed: 10</p>
                        </div>
                        <div className="country-btn-cont">
                            <button className='country-btn'>edit <FontAwesomeIcon icon={faPen}/></button>
                            <button className='country-btn'>add University</button>
                        </div>
                    </div>
                    <div className="country">
                        <img className='country-bg-img1' src="https://i.ibb.co/ZRqzgZf7/london-Bridge.jpg" alt="" />
                        <img className='country-bg-img2' src="https://i.ibb.co/hJwnY6kj/ukflag.jpg" alt="" />
                        <div className="overlay"></div>
                        <div className="country-details">
                            <p>country name: uk</p>
                            <p>country serial: 1</p>
                            <p>total university listed: 10</p>
                        </div>
                        <div className="country-btn-cont">
                            <button className='country-btn'>edit <FontAwesomeIcon icon={faPen}/></button>
                            <button className='country-btn'>add University</button>
                        </div>
                    </div>
                    <div className="country">
                        <img className='country-bg-img1' src="https://i.ibb.co/ZRqzgZf7/london-Bridge.jpg" alt="" />
                        <img className='country-bg-img2' src="https://i.ibb.co/hJwnY6kj/ukflag.jpg" alt="" />
                        <div className="overlay"></div>
                        <div className="country-details">
                            <p>country name: uk</p>
                            <p>country serial: 1</p>
                            <p>total university listed: 10</p>
                        </div>
                        <div className="country-btn-cont">
                            <button className='country-btn'>edit <FontAwesomeIcon icon={faPen}/></button>
                            <button className='country-btn'>add University</button>
                        </div>
                    </div>
                    <div className="country">
                        <img className='country-bg-img1' src="https://i.ibb.co/ZRqzgZf7/london-Bridge.jpg" alt="" />
                        <img className='country-bg-img2' src="https://i.ibb.co/hJwnY6kj/ukflag.jpg" alt="" />
                        <div className="overlay"></div>
                        <div className="country-details">
                            <p>country name: uk</p>
                            <p>country serial: 1</p>
                            <p>total university listed: 10</p>
                        </div>
                        <div className="country-btn-cont">
                            <button className='country-btn'>edit <FontAwesomeIcon icon={faPen}/></button>
                            <button className='country-btn'>add University</button>
                        </div>
                    </div>
                    <div className="country">
                        <img className='country-bg-img1' src="https://i.ibb.co/ZRqzgZf7/london-Bridge.jpg" alt="" />
                        <img className='country-bg-img2' src="https://i.ibb.co/hJwnY6kj/ukflag.jpg" alt="" />
                        <div className="overlay"></div>
                        <div className="country-details">
                            <p>country name: uk</p>
                            <p>country serial: 1</p>
                            <p>total university listed: 10</p>
                        </div>
                        <div className="country-btn-cont">
                            <button className='country-btn'>edit <FontAwesomeIcon icon={faPen}/></button>
                            <button className='country-btn'>add University</button>
                        </div>
                    </div>
                </div>
        </div>
        {/* <div className={open? "mod-open" : "modal"}>
            <button onClick={()=>setOpen(!open)} className='mod-close'>Close</button>
            
        </div> */}

        <div className="add-country-modal"></div>

      </div>
    )
}

export default page