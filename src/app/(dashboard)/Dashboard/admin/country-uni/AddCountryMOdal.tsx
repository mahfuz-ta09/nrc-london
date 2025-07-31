
type Props = {
  isOpen: boolean
  countryTest: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setCountryTast: React.Dispatch<React.SetStateAction<string>>
}

const AddCountryMOdal = ({ isOpen , setIsOpen , countryTest , setCountryTast }:Props) => {
  return (
        <div className={isOpen?"country-mod cntry-open":"cntry-close"}>
            <button className="close-modal" onClick={()=>{setIsOpen(false);setCountryTast('')}}>X</button>
            <div className="add-uni-container">
                <h5>{countryTest} Country</h5>
                
                <form className="country-submit-form">
                    <label htmlFor="country">Country Name</label>
                    <input type="text" className="cntry-name-in"/>

                    <div className="form-flag">
                        <div className="flag-input">
                            <label htmlFor="heritage">Country Heritage Image</label>
                            <input type="file" id="heritage" />
                        </div>
                        <div className="flag-input">
                            <label htmlFor="flag">Country Flag</label>
                            <input type="file" id="flag" />
                        </div>
                    </div>

                    <label htmlFor="serial">Order you want to show in landing page:</label>
                    <input type="number"  className="cntry-name-in"/>

                    <div className="country-add-btn-grp">
                        <button type="button">Add Another</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>

            </div>
        </div>
  )
}

export default AddCountryMOdal