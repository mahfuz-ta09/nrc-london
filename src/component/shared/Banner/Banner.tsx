import '../../../css/shared/Banner/Banner.css'

const Banner = () => {
    return (
        <div className="banner-container">
            <div className="banner-content">
                <div className="banner-part">
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam eos enim minus omnis vitae dolore.</h4>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptas temporibus alias adipisci, assumenda officiis cupiditate facilis, consectetur reprehenderit voluptatem corporis rem reiciendis doloremque quas!</p>
                    <div className="banner-buttons">
                        <button className='banner-button'>Student?</button>
                        <button className='banner-button'>Recruitment Partner?</button>
                        <button className='banner-button'>Represent University?</button>
                    </div>
                </div>
            </div>


            <div className='banner-bottom'>
                <h1 className='banner-bottom-text'>Home</h1>
            </div>
        </div>
    )
}

export default Banner