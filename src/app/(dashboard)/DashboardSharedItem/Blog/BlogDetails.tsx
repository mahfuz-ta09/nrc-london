
type DetailType = {
    detail :{
        isOPen: boolean,
        slug : string,
    }
    setDetail: React.Dispatch<React.SetStateAction<any>>
}

const BlogDetails = ({detail , setDetail}:DetailType) => {
    return (
        <div className={ detail.isOPen ? 'modal-container openmoda-container' : 'modal-container'}>
            <div id='modal-body-id' className='modal-body'>
                <h1 style={{color:"black"}}>Blog details by slug: {detail?.slug}</h1>
                <button
                    onClick={() => setDetail((prev:any) => ({ ...prev, slug: '', isOPen: false }))}
                    className="cancel-btn"
                >
                    X
                </button>
                    
            </div>
        </div>
    )
}

export default BlogDetails
