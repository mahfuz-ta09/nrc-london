import '@/css/Dashboard/DashBoardSharedItem/DashboardSharedCss.css'

const stFile = () => {
    return (
      <div className="dash-item-container dashItem-container">
        <div className="dashItem-header">
          <div className="header-button-container">
            <button className='save-button'>Add Student</button>
          </div>
          <h1 className='header-title'>my students</h1>
        </div>
      </div>
    )
}

export default stFile
