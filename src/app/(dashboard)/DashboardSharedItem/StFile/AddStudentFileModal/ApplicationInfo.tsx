'use client'
import { useState } from "react";
import type { StudentFileForm } from "../type";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faSpinner, faChevronDown, faChevronUp, faSearch, faGraduationCap, faMapMarkerAlt, faDollarSign, faClock } from '@fortawesome/free-solid-svg-icons';
import { useGetAllCountryNameQuery } from "@/redux/endpoints/countryBaseUni/countryBaseUniversity";
import { useSearchUniversityMutation } from "@/redux/endpoints/studentfileprocess/proceedEndpoints";
import { programLevels, programOptions, qualificationOptions,  } from "../../Objects/programItem";

interface MatchedSubject {
    id: string;
    subjectName: string;
    programLevel: string;
    degree: string;
    duration: { value: number; unit: string };
    cost: number;
    intakes: string;
    programType: string;
    faculty: string;
    modeOfStudy: string;
    qualifications: Record<string, string>;
    accreditation: string;
    matchScore: number;
    matchReasons: string[];
}

interface UniversityWithSubjects {
    universityId: string;
    universityName: string;
    location: { city: string; state: string };
    tuitionFees: { currency: string; lowFee: number; highFee: number };
    matchedSubjects: MatchedSubject[];
}

const ApplicationInfo = () => {
    const { data: countries, isLoading: countryLoading } = useGetAllCountryNameQuery()
    const { register, control, watch, setValue } = useFormContext<StudentFileForm>();
    const { fields, append, remove } = useFieldArray({ control, name: "universityApplications" });
    const [searchUniversity, {isLoading: assignUniversityLoading }] = useSearchUniversityMutation()
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [preferredProgram, setPreferredProgram] = useState<string>("");
    const [preferredLevel, setPreferredLevel] = useState<string>("");
    const [maxBudget, setMaxBudget] = useState<string>("");
    const [isSearching, setIsSearching] = useState(false);
    const [matchedUniversities, setMatchedUniversities] = useState<UniversityWithSubjects[]>([]);
    const [expandedUniversities, setExpandedUniversities] = useState<Set<string>>(new Set());
    
    const studentData: any = watch();
 

    const handleSearch = async () => {
        if (!selectedCountry) {
            alert("Please select a country");
            return;
        }

        setIsSearching(true);
        try {
            const studentProfile = {
                academicInfo: studentData.academicInfo,
                englishProficiency: studentData.englishProficiency,
                preferredProgram,
                preferredLevel,
                maxBudget: maxBudget ? Number(maxBudget) : undefined
            };

            const response:any = await searchUniversity({ data: { countryId: selectedCountry, studentProfile } }).unwrap();
            // console.log(response)
            setMatchedUniversities(response.data?.universities || []);
        } catch (error) {
            console.error('Error searching:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const toggleUniversity = (universityId: string) => {
        const newExpanded = new Set(expandedUniversities);
        if (newExpanded.has(universityId)) {
            newExpanded.delete(universityId);
        } else {
            newExpanded.add(universityId);
        }
        setExpandedUniversities(newExpanded);
    };

    const handleSelectSubject = (university: UniversityWithSubjects, subject: MatchedSubject) => {
        const country = countries?.data?.find((c: any) => c._id === selectedCountry);
        
        append({
            uniName: university.universityName,
            program: subject.degree,
            subject: subject.subjectName,
            destinationCountry: country?.country || "",
            intake: subject.intakes,
            scholarship: 0,
            courseStartDate: "",
            subjectData: JSON.stringify(subject),
            universityData: JSON.stringify({
                universityId: university.universityId,
                location: university.location,
                tuitionFees: university.tuitionFees
            })
        });

        alert(`${subject.subjectName} at ${university.universityName} added to your applications!`);
    };
    console.log(matchedUniversities,studentData)
    return (
        <>
            <h3 className="phase-title">Phase 3: Select University & Program</h3>

            {/* Search Section */}
            <div style={{
                background: 'linear-gradient(135deg, #1888adff 0%, #004a62 100%)',
                padding: '30px',
                borderRadius: '12px',
                marginBottom: '30px',
                color: 'white'
            }}>
                <h4 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 'bold' }}>
                    Find Your Perfect Program
                </h4>

                <div style={{ display: 'grid', gap: '15px' }}>
                    {/* Country Selection */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                            Select Destination Country *
                        </label>
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: 'none',
                                fontSize: '14px',
                                color: '#1e293b'
                            }}
                            disabled={countryLoading}
                        >
                            <option value="">
                                {countryLoading ? 'Loading countries...' : '-- Select Country --'}
                            </option>
                            {countries?.data?.map((country: any) => (
                                <option key={country._id} value={country._id}>
                                    {country.country}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Student Profile Summary */}
                    {studentData.academicInfo && (
                        <div style={{
                            background: 'rgba(255,255,255,0.15)',
                            padding: '20px',
                            borderRadius: '8px',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <h5 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: '600' }}>
                                Your Academic Profile
                            </h5>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                                {studentData.academicInfo?.highestQualification && (
                                    <ProfileItem 
                                        label="Qualification" 
                                        value={studentData.academicInfo.highestQualification} 
                                    />
                                )}
                                {studentData.academicInfo?.gpa && (
                                    <ProfileItem 
                                        label="GPA" 
                                        value={`${studentData.academicInfo.gpa} / ${studentData.academicInfo.gpaScale || '4.0'}`} 
                                    />
                                )}
                                {studentData.englishProficiency?.testType && (
                                    <ProfileItem 
                                        label="English Test" 
                                        value={`${studentData.englishProficiency.testType}: ${studentData.englishProficiency.overallScore}`} 
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {/* Search Filters */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                Preferred Field
                            </label>
                            <select
                                value={preferredProgram}
                                onChange={(e) => setPreferredProgram(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: '14px',
                                    color: '#1e293b'
                                }}
                            >
                                <option value="">All Fields</option>
                                {programLevels.map(type => (
                                    <option key={type.label} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                Program Level
                            </label>
                            <select
                                value={preferredLevel}
                                onChange={(e) => setPreferredLevel(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: '14px',
                                    color: '#1e293b'
                                }}
                            >
                                <option value="">All Levels</option>
                                {programOptions.map(group => (
                                  <optgroup key={group.label} label={group.label}>
                                  {group.options.map(option => (
                                      <option key={option.value} value={option.value}>
                                        {option.label}
                                      </option>
                                  ))}
                                  </optgroup>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                Maximum Budget ($)
                            </label>
                            <input
                                type="number"
                                value={maxBudget}
                                onChange={(e) => setMaxBudget(e.target.value)}
                                placeholder="e.g., 50000"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: '14px',
                                    color: '#1e293b'
                                }}
                            />
                        </div>
                    </div>

                    {/* Search Button */}
                    <button
                        type="button"
                        onClick={handleSearch}
                        disabled={isSearching || !selectedCountry || assignUniversityLoading}
                        style={{
                            width: '100%',
                            padding: '15px',
                            background: 'white',
                            color: '#667eea',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: isSearching || !selectedCountry ? 'not-allowed' : 'pointer',
                            fontSize: '16px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            transition: 'all 0.2s',
                            opacity: isSearching || !selectedCountry ? 0.6 : 1
                        }}
                    >
                        {isSearching || assignUniversityLoading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin />
                                Searching for matches...
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faSearch} />
                                Search Programs
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Results Section */}
            {matchedUniversities.length > 0 && (
                <div style={{ marginBottom: '30px' }}>
                    <h4 style={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold', 
                        marginBottom: '20px',
                        color: '#1e293b'
                    }}>
                        Found {matchedUniversities.length} Universities with Matching Programs
                    </h4>

                    <div style={{ display: 'grid', gap: '15px' }}>
                        {matchedUniversities.map((university) => (
                            <div
                                key={university.universityId}
                                style={{
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {/* University Header */}
                                <div
                                    onClick={() => toggleUniversity(university.universityId)}
                                    style={{
                                        padding: '20px',
                                        background: '#f8fafc',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = '#f8fafc'}
                                >
                                    <div style={{ flex: 1 }}>
                                        <h5 style={{ 
                                            margin: '0 0 8px 0', 
                                            fontSize: '18px', 
                                            fontWeight: '600',
                                            color: '#1e293b'
                                        }}>
                                            {university.universityName}
                                        </h5>
                                        <div style={{ 
                                            display: 'flex', 
                                            gap: '20px', 
                                            flexWrap: 'wrap',
                                            fontSize: '14px',
                                            color: '#64748b'
                                        }}>
                                            <span>
                                                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px' }} />
                                                {university.location.city}, {university.location.state}
                                            </span>
                                            <span>
                                                <FontAwesomeIcon icon={faDollarSign} style={{ marginRight: '5px' }} />
                                                {university.tuitionFees.currency} {university.tuitionFees.lowFee.toLocaleString()} - {university.tuitionFees.highFee.toLocaleString()}
                                            </span>
                                            <span>
                                                <FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '5px' }} />
                                                {university.matchedSubjects.length} matching program{university.matchedSubjects.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </div>
                                    <FontAwesomeIcon 
                                        icon={expandedUniversities.has(university.universityId) ? faChevronUp : faChevronDown}
                                        style={{ fontSize: '20px', color: '#667eea' }}
                                    />
                                </div>

                                {/* Subjects List (Collapsible) */}
                                {expandedUniversities.has(university.universityId) && (
                                    <div style={{ 
                                        padding: '20px',
                                        background: 'white',
                                        animation: 'slideDown 0.3s ease-out'
                                    }}>
                                        <div style={{ display: 'grid', gap: '15px' }}>
                                            {university.matchedSubjects.map((subject) => (
                                                <div
                                                    key={subject.id}
                                                    style={{
                                                        border: '1px solid #e5e7eb',
                                                        borderRadius: '8px',
                                                        padding: '15px',
                                                        position: 'relative',
                                                        background: '#fafafa'
                                                    }}
                                                >
                                                    {/* Match Score */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '15px',
                                                        right: '15px',
                                                        background: subject.matchScore >= 80 ? '#10b981' : subject.matchScore >= 60 ? '#f59e0b' : '#6b7280',
                                                        color: 'white',
                                                        padding: '4px 12px',
                                                        borderRadius: '12px',
                                                        fontSize: '12px',
                                                        fontWeight: '600'
                                                    }}>
                                                        {subject.matchScore}% Match
                                                    </div>

                                                    <h6 style={{
                                                        margin: '0 0 5px 0',
                                                        fontSize: '16px',
                                                        fontWeight: '600',
                                                        color: '#1e293b',
                                                        paddingRight: '100px'
                                                    }}>
                                                        {subject.subjectName}
                                                    </h6>

                                                    <p style={{
                                                        margin: '0 0 15px 0',
                                                        fontSize: '14px',
                                                        color: '#64748b'
                                                    }}>
                                                        {subject.degree}
                                                    </p>

                                                    {/* Subject Details Grid */}
                                                    <div style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                                        gap: '12px',
                                                        marginBottom: '15px'
                                                    }}>
                                                        <DetailItem icon={faGraduationCap} label="Level" value={subject.programLevel} />
                                                        <DetailItem icon={faClock} label="Duration" value={`${subject.duration.value} ${subject.duration.unit}`} />
                                                        <DetailItem icon={faDollarSign} label="Cost" value={`$${subject.cost.toLocaleString()}`} />
                                                        <DetailItem label="Mode" value={subject.modeOfStudy} />
                                                        <DetailItem label="Intake" value={subject.intakes} />
                                                        <DetailItem label="Faculty" value={subject.faculty} />
                                                    </div>

                                                    {/* Match Reasons */}
                                                    {subject.matchReasons && subject.matchReasons.length > 0 && (
                                                        <div style={{
                                                            background: '#f0f9ff',
                                                            padding: '12px',
                                                            borderRadius: '6px',
                                                            marginBottom: '15px'
                                                        }}>
                                                            <p style={{
                                                                margin: '0 0 8px 0',
                                                                fontSize: '12px',
                                                                fontWeight: '600',
                                                                color: '#0369a1',
                                                                textTransform: 'uppercase'
                                                            }}>
                                                                Why This Matches:
                                                            </p>
                                                            <ul style={{
                                                                margin: 0,
                                                                paddingLeft: '20px',
                                                                fontSize: '13px',
                                                                color: '#0c4a6e'
                                                            }}>
                                                                {subject.matchReasons.map((reason, idx) => (
                                                                    <li key={idx} style={{ marginBottom: '4px' }}>{reason}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Select Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSelectSubject(university, subject)}
                                                        style={{
                                                            width: '100%',
                                                            padding: '12px',
                                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            cursor: 'pointer',
                                                            fontSize: '14px',
                                                            fontWeight: '600',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '8px',
                                                            transition: 'transform 0.2s'
                                                        }}
                                                        // onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                                        // onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                                    >
                                                        <FontAwesomeIcon icon={faCheck} />
                                                        Select This Program
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Selected Applications */}
            {fields.length > 0 && (
                <div>
                    <h4 style={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold', 
                        marginBottom: '20px',
                        color: '#1e293b'
                    }}>
                        Your Selected Applications ({fields.length})
                    </h4>

                    <div style={{ display: 'grid', gap: '15px' }}>
                        {fields.map((field, index) => (
                            <div key={field.id} style={{
                                border: '2px solid #e5e7eb',
                                borderRadius: '12px',
                                padding: '20px',
                                background: '#f8fafc'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <div>
                                        <h5 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
                                            {watch(`universityApplications.${index}.uniName`)}
                                        </h5>
                                        <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                                            {watch(`universityApplications.${index}.subject`)}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        style={{
                                            background: '#ef4444',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                                    <div className="input-container">
                                        <label>Scholarship Amount (Optional)</label>
                                        <input
                                            type="number"
                                            {...register(`universityApplications.${index}.scholarship` as const)}
                                            placeholder="Enter scholarship amount"
                                        />
                                    </div>

                                    <div className="input-container">
                                        <label>Course Start Date</label>
                                        <input
                                            type="date"
                                            {...register(`universityApplications.${index}.courseStartDate` as const)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
};

const ProfileItem = ({ label, value }: { label: string; value: string }) => (
    <div>
        <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>{label}</div>
        <div style={{ fontSize: '14px', fontWeight: '600' }}>{value}</div>
    </div>
);

const DetailItem = ({ icon, label, value }: { icon?: any; label: string; value: string }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    }}>
        <span style={{
            fontSize: '11px',
            color: '#64748b',
            textTransform: 'uppercase',
            fontWeight: '600'
        }}>
            {icon && <FontAwesomeIcon icon={icon} style={{ marginRight: '5px' }} />}
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