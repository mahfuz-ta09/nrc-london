'use client'
import { useState, useEffect } from "react";
import type { StudentFileForm } from "../type";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useGetAllCountryBaseQuery } from "@/redux/endpoints/countryBaseUni/countryBaseUniversity";

interface Country {
    _id: string;
    country: string;
    slug: string;
    currency: string;
}

interface University {
    universityId: string;
    universityName: string;
    location: {
      city: string;
      state: string;
    };
    tuitionFees: {
      currency: string;
      lowFee: number;
      highFee: number;
    };
    qualifications: string[];
}

interface Subject {
    id: string;
    subjectName: string;
    programLevel: string;
    degree: string;
    duration: {
      value: number;
      unit: string;
    };
    cost: number;
    intakes: string;
    programType: string;
    faculty: string;
    modeOfStudy: string;
    qualifications: Record<string, string>;
    accreditation: string;
}

interface MatchedSubject extends Subject {
    matchScore: number;
    matchReasons: string[];
}

const ApplicationInfo = () => {
    const { data:countries, isLoading: countryLoading } = useGetAllCountryBaseQuery()
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [selectedUniversity, setSelectedUniversity] = useState<string>("");
    const { register, control, watch, setValue } = useFormContext<StudentFileForm>();
    const { fields, append, remove } = useFieldArray({control,name: "universityApplications"});
    const [currentApplicationIndex, setCurrentApplicationIndex] = useState<number | null>(null);
    
    // const [countries, setCountries] = useState<Country[]>([]);
    const [universities, setUniversities] = useState<University[]>([]);
    const [matchedSubjects, setMatchedSubjects] = useState<MatchedSubject[]>([]);
    
    const [showSubjectModal, setShowSubjectModal] = useState(false);
    const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);
    const [isLoadingCountries, setIsLoadingCountries] = useState(false);
    const [isLoadingUniversities, setIsLoadingUniversities] = useState(false);
    
    const studentData:any = watch();


    useEffect(() => {
      // fetchCountries();
    }, []);
    console.log(studentData)
    // const fetchCountries = async () => {
    //   try {
    //     setIsLoadingCountries(true);
    //     // Replace with your actual API call
    //     const response = await fetch(
    //       'http://localhost:7373/app/v1/application/countries',{
    //         method: 'GET',
    //         credentials: "include",
    //       });
    //     const data = await response.json();
    //     setCountries(data.data || []);
    //   } catch (error) {
    //     console.error('Error fetching countries:', error);
    //   } finally {
    //     setIsLoadingCountries(false);
    //   }
    // };

    const fetchUniversities = async (countryId: string) => {
      try {
        setIsLoadingUniversities(true);
        // Replace with your actual API call
        const response = await fetch(`http://localhost:7373/app/v1/application/universities?countryId=${countryId}`,{
            method: 'GET',
            credentials: "include",
          });
        const data = await response.json();
        setUniversities(data.data?.universityList || []);
      } catch (error) {
        console.error('Error fetching universities:', error);
      } finally {
        setIsLoadingUniversities(false);
      }
    };

    const fetchMatchingSubjects = async (countryId: string, universityId: string) => {
      try {
        setIsLoadingSubjects(true);
        const studentProfile = {
          academicInfo: studentData.academicInfo,
          englishProficiency: studentData.englishProficiency,
        };

        
        const response = await fetch('http://localhost:7373/app/v1/application/subjects/match', {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            countryId,
            universityId,
            studentProfile
          })
        });
        
        const data = await response.json();
        setMatchedSubjects(data.data?.matchedSubjects || []);
        setShowSubjectModal(true);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setIsLoadingSubjects(false);
      }
    };

    const handleCountrySelect = (countryId: string, index: number) => {
        setSelectedCountry(countryId);
        setCurrentApplicationIndex(index);
        setSelectedUniversity("");
        setUniversities([]);
        setMatchedSubjects([]);
        
        const country = countries.find((c:any) => c._id === countryId);
        if (country) {
          setValue(`universityApplications.${index}.destinationCountry`, country.country);
          fetchUniversities(countryId);
        }
    };

    const handleUniversitySelect = (universityId: string, index: number) => {
        setSelectedUniversity(universityId);
        setCurrentApplicationIndex(index);
        
        const university = universities.find(u => u.universityId === universityId);
        if (university) {
          setValue(`universityApplications.${index}.uniName`, university.universityName);
        }
    };

    const handleShowSubjects = () => {
      if (selectedCountry && selectedUniversity && currentApplicationIndex !== null) {
        fetchMatchingSubjects(selectedCountry, selectedUniversity);
      }
    };

    const handleSelectSubject = (subject: MatchedSubject) => {
      if (currentApplicationIndex !== null) {
        setValue(`universityApplications.${currentApplicationIndex}.subject`, subject.subjectName);
        setValue(`universityApplications.${currentApplicationIndex}.program`, subject.degree);
        setValue(`universityApplications.${currentApplicationIndex}.intake`, subject.intakes);
        setValue(`universityApplications.${currentApplicationIndex}.scholarship`, 0);
        
        
        setValue(`universityApplications.${currentApplicationIndex}.subjectData`, JSON.stringify(subject));
        
        setShowSubjectModal(false);
      }
    };

    return (
      <>
        <h3 className="phase-title">Phase 3: Select University</h3>

        {fields.map((field, index) => (
          <div key={field.id} className="university-section">
            
            <div className="input-container">
              <label>Select Destination Country *</label>
              <select
                value={selectedCountry}
                onChange={(e) => handleCountrySelect(e.target.value, index)}
                style={{width: '100%',padding: '10px',borderRadius: '4px',border: '1px solid #d1d5db',fontSize: '14px'}}
                disabled={countryLoading}
              >
                <option value="">
                  {isLoadingCountries ? 'Loading countries...' : '-- Select Country --'}
                </option>
                {countries?.data?.map((country:any) => (
                  <option key={country._id} value={country._id}>
                    {country.country} ({country.currency})
                  </option>
                ))}
              </select>
            </div>

            {selectedCountry && (
              <div className="input-container">
                <label>Select University *</label>
                <select
                  value={selectedUniversity}
                  onChange={(e) => handleUniversitySelect(e.target.value, index)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px'
                  }}
                  disabled={isLoadingUniversities}
                >
                  <option value="">
                    {isLoadingUniversities ? 'Loading universities...' : '-- Select University --'}
                  </option>
                  {universities.map((uni) => (
                    <option key={uni.universityId} value={uni.universityId}>
                      {uni.universityName} - {uni.location.city}
                      {uni.tuitionFees && ` (${uni.tuitionFees.currency} ${uni.tuitionFees.lowFee.toLocaleString()} - ${uni.tuitionFees.highFee.toLocaleString()})`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Browse Subjects Button */}
            {selectedCountry && selectedUniversity && (
              <div className="input-container">
                <button
                  type="button"
                  onClick={handleShowSubjects}
                  disabled={isLoadingSubjects}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: isLoadingSubjects ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {isLoadingSubjects ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin />
                      Matching Subjects...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPlus} />
                      Browse Matching Subjects
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Display Selected Data (Read-only) */}
            <div className="input-container">
              <label>University Name</label>
              <input 
                {...register(`universityApplications.${index}.uniName` as const)} 
                readOnly
                style={{ background: '#f3f4f6', cursor: 'not-allowed' }}
              />
            </div>

            <div className="input-container">
              <label>Destination Country</label>
              <input 
                {...register(`universityApplications.${index}.destinationCountry` as const)} 
                readOnly
                style={{ background: '#f3f4f6', cursor: 'not-allowed' }}
              />
            </div>

            <div className="input-container">
              <label>Program/Degree</label>
              <input 
                {...register(`universityApplications.${index}.program` as const)} 
                readOnly
                style={{ background: '#f3f4f6', cursor: 'not-allowed' }}
              />
            </div>

            <div className="input-container">
              <label>Subject</label>
              <input 
                {...register(`universityApplications.${index}.subject` as const)} 
                readOnly
                style={{ background: '#f3f4f6', cursor: 'not-allowed' }}
              />
            </div>

            <div className="input-container">
              <label>Intake</label>
              <input 
                {...register(`universityApplications.${index}.intake` as const)} 
                readOnly
                style={{ background: '#f3f4f6', cursor: 'not-allowed' }}
              />
            </div>

            <div className="input-container">
              <label>Scholarship Amount (Optional)</label>
              <input
                type="number"
                {...register(`universityApplications.${index}.scholarship` as const)}
                placeholder="Enter scholarship amount if applicable"
              />
            </div>

            <div className="input-container">
              <label>Course Start Date</label>
              <input 
                type="date" 
                {...register(`universityApplications.${index}.courseStartDate` as const)} 
              />
            </div>

            <button
              type="button"
              onClick={() => {
                remove(index);
                if (currentApplicationIndex === index) {
                  setSelectedCountry("");
                  setSelectedUniversity("");
                  setCurrentApplicationIndex(null);
                }
              }}
              className="remove-btn"
              style={{
                background: '#ef4444',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Remove University
            </button>

            <hr style={{ margin: "20px 0", border: 'none', borderTop: '1px solid #e5e7eb' }} />
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            append({
              uniName: "",
              program: "",
              subject: "",
              destinationCountry: "",
              intake: "",
              scholarship: 0,
              courseStartDate: "",
            });
            setSelectedCountry("");
            setSelectedUniversity("");
            setCurrentApplicationIndex(fields.length);
          }}
          className="add-btn"
          style={{
            background: '#10b981',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Another University
        </button>

        {/* Subject Selection Modal */}
        {showSubjectModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto',
              padding: '24px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '16px'
              }}>
                <h2 style={{ margin: 0, color: '#1e293b', fontSize: '20px' }}>
                  Matching Subjects & Programs
                </h2>
                <button
                  onClick={() => setShowSubjectModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#64748b'
                  }}
                >
                  ×
                </button>
              </div>

              {matchedSubjects.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#64748b'
                }}>
                  <p>No matching subjects found based on your profile.</p>
                  <p style={{ fontSize: '14px', marginTop: '10px' }}>
                    Try adjusting your qualifications or contact an advisor.
                  </p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gap: '16px'
                }}>
                  {matchedSubjects.map((subject) => (
                    <div
                      key={subject.id}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#667eea';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      onClick={() => handleSelectSubject(subject)}
                    >
                      {/* Match Score Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: subject.matchScore >= 80 ? '#10b981' : subject.matchScore >= 60 ? '#f59e0b' : '#6b7280',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {subject.matchScore}% Match
                      </div>

                      <h3 style={{
                        margin: '0 0 8px 0',
                        color: '#1e293b',
                        fontSize: '18px',
                        paddingRight: '80px'
                      }}>
                        {subject.subjectName}
                      </h3>

                      <p style={{
                        margin: '0 0 12px 0',
                        color: '#64748b',
                        fontSize: '14px'
                      }}>
                        {subject.degree}
                      </p>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '12px',
                        marginBottom: '12px'
                      }}>
                        <InfoItem label="Program Level" value={subject.programLevel} />
                        <InfoItem label="Duration" value={`${subject.duration.value} ${subject.duration.unit}`} />
                        <InfoItem label="Cost" value={`$${subject.cost.toLocaleString()}`} />
                        <InfoItem label="Mode" value={subject.modeOfStudy} />
                        <InfoItem label="Faculty" value={subject.faculty} />
                        <InfoItem label="Intake" value={subject.intakes} />
                      </div>

                      {/* Match Reasons */}
                      {subject.matchReasons && subject.matchReasons.length > 0 && (
                        <div style={{
                          background: '#f0f9ff',
                          padding: '12px',
                          borderRadius: '6px',
                          marginTop: '12px'
                        }}>
                          <p style={{
                            margin: '0 0 8px 0',
                            color: '#0369a1',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Why this matches:
                          </p>
                          <ul style={{
                            margin: 0,
                            paddingLeft: '20px',
                            color: '#0c4a6e',
                            fontSize: '13px'
                          }}>
                            {subject.matchReasons.map((reason, idx) => (
                              <li key={idx} style={{ marginBottom: '4px' }}>{reason}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Qualifications */}
                      {subject.qualifications && Object.keys(subject.qualifications).length > 0 && (
                        <div style={{ marginTop: '12px' }}>
                          <p style={{
                            margin: '0 0 8px 0',
                            color: '#475569',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            Required Qualifications:
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {Object.entries(subject.qualifications).map(([key, value]) => (
                              <span
                                key={key}
                                style={{
                                  padding: '4px 10px',
                                  background: '#e0e7ff',
                                  borderRadius: '12px',
                                  fontSize: '12px',
                                  color: '#4338ca'
                                }}
                              >
                                {key}: {value}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Select Button */}
                      <button
                        style={{
                          marginTop: '16px',
                          width: '100%',
                          padding: '10px',
                          background: '#667eea',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                        Select This Subject
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  }}>
    <span style={{
      fontSize: '11px',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontWeight: '600'
    }}>
      {label}
    </span>
    <span style={{
      fontSize: '14px',
      color: '#1e293b',
      fontWeight: '500'
    }}>
      {value}
    </span>
  </div>
);

export default ApplicationInfo;