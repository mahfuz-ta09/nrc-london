'use client'
import React, { useState } from 'react'
// import './css/CountryDetails.css'
import '../UniversityTable/css/UniversityDetails.css'
type ModalProps = {
    countryDetails: {
        data: any,
        isOPen: boolean,
        name: string
    },
    setCountryDetails: React.Dispatch<React.SetStateAction<any>>
}

const CountryDetails = ({ countryDetails, setCountryDetails }: ModalProps) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'statistics' | 'seo' | 'analytics'>('overview')
    const country = countryDetails?.data || {}

    return (
        <div className={countryDetails?.isOPen ? 'modal-container openmoda-container' : 'modal-container'}>
            <div id='modal-body-id' className='modal-body'>
                <div className="uni-details-header">
                    <div className="uni-header-content">
                        {country.countryFlg?.url && (
                            <img 
                                src={country.countryFlg.url} 
                                alt={country.country || countryDetails?.name}
                                className="uni-header-image"
                            />
                        )}
                        <div className="uni-header-text">
                            <h1 className="uni-title">{country.country || countryDetails?.name}</h1>
                            {country.slug && (
                                <p className="uni-location">
                                    🔗 /{country.slug}
                                </p>
                            )}
                            {country.status && (
                                <span className={`uni-status-badge status-${country.status}`}>
                                    {country.status.toUpperCase()}
                                </span>
                            )}
                            {country.type && (
                                <span className="uni-status-badge status-published">
                                    {country.type.toUpperCase()}
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => setCountryDetails((prev: any) => ({ ...prev, data: '', name: '', isOPen: false }))}
                        className="cancel-btn"
                    >
                        ✕
                    </button>
                </div>

                <div className="uni-quick-stats">
                    {country.serial !== undefined && (
                        <div className="stat-card">
                            <div className="stat-icon">#</div>
                            <div className="stat-content">
                                <div className="stat-label">Serial</div>
                                <div className="stat-value">{country.serial}</div>
                            </div>
                        </div>
                    )}
                    {country.currency && (
                        <div className="stat-card">
                            <div className="stat-icon">💱</div>
                            <div className="stat-content">
                                <div className="stat-label">Currency</div>
                                <div className="stat-value">{country.currency}</div>
                            </div>
                        </div>
                    )}
                    {country.statistics?.totalUniversities !== undefined && (
                        <div className="stat-card">
                            <div className="stat-icon">🎓</div>
                            <div className="stat-content">
                                <div className="stat-label">Universities</div>
                                <div className="stat-value">{country.statistics.totalUniversities}</div>
                            </div>
                        </div>
                    )}
                    {country.analytics?.views !== undefined && (
                        <div className="stat-card">
                            <div className="stat-icon">👁️</div>
                            <div className="stat-content">
                                <div className="stat-label">Views</div>
                                <div className="stat-value">{country.analytics.views}</div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="uni-tabs">
                    <button 
                        className={`uni-tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button 
                        className={`uni-tab ${activeTab === 'statistics' ? 'active' : ''}`}
                        onClick={() => setActiveTab('statistics')}
                    >
                        Statistics
                    </button>
                    <button 
                        className={`uni-tab ${activeTab === 'seo' ? 'active' : ''}`}
                        onClick={() => setActiveTab('seo')}
                    >
                        SEO
                    </button>
                    <button 
                        className={`uni-tab ${activeTab === 'analytics' ? 'active' : ''}`}
                        onClick={() => setActiveTab('analytics')}
                    >
                        Analytics
                    </button>
                </div>

                <div className="uni-tab-content">
                    {activeTab === 'overview' && (
                        <div className="tab-panel">
                            {country.content && (
                                <div className="detail-section">
                                    <h3 className="section-title">About Studying in {country.country}</h3>
                                    <div 
                                        className="about-text content-with-images"
                                        dangerouslySetInnerHTML={{ __html: country.content }}
                                    />
                                </div>
                            )}

                            {country.famousFile?.url && (
                                <div className="detail-section">
                                    <h3 className="section-title">Featured Image</h3>
                                    <div className="image-preview">
                                        <img 
                                            src={country.famousFile.url} 
                                            alt={`${country.country} featured`}
                                            style={{
                                                maxWidth: '100%',
                                                margin:'0 auto',
                                                height: '400px',
                                                objectFit:'cover',
                                                borderRadius: '8px',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                            }}
                                        />
                                        {country.famousFile.publicId && (
                                            <p style={{ 
                                                fontSize: '12px', 
                                                color: '#64748b', 
                                                marginTop: '8px' 
                                            }}>
                                                Public ID: {country.famousFile.publicId}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {country.bodyImages && country.bodyImages.length > 0 && (
                                <div className="detail-section">
                                    <h3 className="section-title">Body Images ({country.bodyImages.length})</h3>
                                    <div className="subjects-list">
                                        {country.bodyImages.map((img: any, idx: number) => (
                                            <div key={idx} className="subject-card">
                                                <img 
                                                    src={img.url} 
                                                    alt={`Body image ${idx + 1}`}
                                                    style={{
                                                        width: '100%',
                                                        height: '200px',
                                                        objectFit: 'cover',
                                                        borderRadius: '6px',
                                                        marginBottom: '8px'
                                                    }}
                                                />
                                                {img.publicId && (
                                                    <p style={{ 
                                                        fontSize: '11px', 
                                                        color: '#94a3b8' 
                                                    }}>
                                                        {img.publicId}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="detail-section">
                                <h3 className="section-title">Timestamps</h3>
                                <div className="metadata-grid">
                                    {country.createdAt && (
                                        <div className="metadata-item">
                                            <span className="meta-label">Created:</span>
                                            <span className="meta-value">{country.createdAt}</span>
                                        </div>
                                    )}
                                    {country.updatedAt && (
                                        <div className="metadata-item">
                                            <span className="meta-label">Updated:</span>
                                            <span className="meta-value">{country.updatedAt}</span>
                                        </div>
                                    )}
                                    {country.publishedAt && (
                                        <div className="metadata-item">
                                            <span className="meta-label">Published:</span>
                                            <span className="meta-value">{country.publishedAt}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'statistics' && (
                        <div className="tab-panel">
                            {country.statistics && (
                                <div className="detail-section">
                                    <h3 className="section-title">Country Statistics</h3>
                                    <div className="demographics-grid">
                                        <div className="demo-card">
                                            <div className="demo-value">{country.statistics.totalUniversities || 0}</div>
                                            <div className="demo-label">Total Universities</div>
                                        </div>
                                        {country.statistics.internationalStudents && (
                                            <div className="demo-card">
                                                <div className="demo-value">{country.statistics.internationalStudents}</div>
                                                <div className="demo-label">International Students</div>
                                            </div>
                                        )}
                                    </div>

                                    {country.statistics.popularPrograms && country.statistics.popularPrograms.length > 0 && (
                                        <div style={{ marginTop: '24px' }}>
                                            <h4 className="subsection-title">Popular Programs</h4>
                                            <div className="badges-container">
                                                {country.statistics.popularPrograms.map((program: string, idx: number) => (
                                                    <span key={idx} className="badge badge-blue">
                                                        {program}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {country.analytics && (
                                <div className="detail-section">
                                    <h3 className="section-title">Performance Metrics</h3>
                                    <div className="requirements-grid">
                                        <div className="requirement-card">
                                            <div className="req-icon">👁️</div>
                                            <div className="req-content">
                                                <div className="req-label">Total Views</div>
                                                <div className="req-value">{country.analytics.views || 0}</div>
                                            </div>
                                        </div>
                                        <div className="requirement-card">
                                            <div className="req-icon">📩</div>
                                            <div className="req-content">
                                                <div className="req-label">Inquiries</div>
                                                <div className="req-value">{country.analytics.inquiries || 0}</div>
                                            </div>
                                        </div>
                                    </div>
                                    {country.analytics.lastViewedAt && (
                                        <p style={{ 
                                            marginTop: '16px', 
                                            fontSize: '14px', 
                                            color: '#64748b' 
                                        }}>
                                            Last viewed: {country.analytics.lastViewedAt}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'seo' && (
                        <div className="tab-panel">
                            {country.seo && (
                                <>
                                    <div className="detail-section">
                                        <h3 className="section-title">Meta Information</h3>
                                        <div className="info-grid">
                                            {country.seo.metaTitle && (
                                                <div className="info-item">
                                                    <div className="info-label">📝 Meta Title</div>
                                                    <div className="info-value">{country.seo.metaTitle}</div>
                                                </div>
                                            )}
                                            {country.seo.metaDescription && (
                                                <div className="info-item">
                                                    <div className="info-label">📄 Meta Description</div>
                                                    <div className="info-value">{country.seo.metaDescription}</div>
                                                </div>
                                            )}
                                            {country.seo.canonicalUrl && (
                                                <div className="info-item">
                                                    <div className="info-label">🔗 Canonical URL</div>
                                                    <a href={country.seo.canonicalUrl} target="_blank" rel="noopener noreferrer" className="info-link">
                                                        {country.seo.canonicalUrl}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {country.seo.keywords && country.seo.keywords.length > 0 && (
                                        <div className="detail-section">
                                            <h3 className="section-title">SEO Keywords</h3>
                                            <div className="badges-container">
                                                {country.seo.keywords.map((keyword: string, idx: number) => (
                                                    <span key={idx} className="badge badge-purple">
                                                        {keyword}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="detail-section">
                                        <h3 className="section-title">Open Graph</h3>
                                        <div className="info-grid">
                                            {country.seo.ogTitle && (
                                                <div className="info-item">
                                                    <div className="info-label">📱 OG Title</div>
                                                    <div className="info-value">{country.seo.ogTitle}</div>
                                                </div>
                                            )}
                                            {country.seo.ogDescription && (
                                                <div className="info-item">
                                                    <div className="info-label">💬 OG Description</div>
                                                    <div className="info-value">{country.seo.ogDescription}</div>
                                                </div>
                                            )}
                                            {country.seo.ogImage && (
                                                <div className="info-item">
                                                    <div className="info-label">🖼️ OG Image</div>
                                                    <img 
                                                        src={country.seo.ogImage} 
                                                        alt="OG Preview"
                                                        style={{
                                                            maxWidth: '300px',
                                                            height: 'auto',
                                                            borderRadius: '6px',
                                                            marginTop: '8px'
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="tab-panel">
                            <div className="detail-section">
                                <h3 className="section-title">Page Analytics</h3>
                                <div className="process-card">
                                    <div className="process-method">
                                        <div className="method-icon">📊</div>
                                        <div className="method-content">
                                            <h4>Engagement Overview</h4>
                                            <p>Track how users interact with this study option</p>
                                        </div>
                                    </div>

                                    <div className="gpa-equivalents">
                                        <div className="equivalents-grid">
                                            <div className="equiv-item">
                                                <span className="equiv-scale">Total Views:</span>
                                                <span className="equiv-value">{country.analytics?.views || 0}</span>
                                            </div>
                                            <div className="equiv-item">
                                                <span className="equiv-scale">Inquiries:</span>
                                                <span className="equiv-value">{country.analytics?.inquiries || 0}</span>
                                            </div>
                                            {country.analytics?.lastViewedAt && (
                                                <div className="equiv-item">
                                                    <span className="equiv-scale">Last Viewed:</span>
                                                    <span className="equiv-value">{country.analytics.lastViewedAt}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h3 className="section-title">Content Status</h3>
                                <div className="rankings-grid">
                                    <div className="ranking-card">
                                        <div className="ranking-icon">📄</div>
                                        <div className="ranking-content">
                                            <div className="ranking-value">{country.status || 'N/A'}</div>
                                            <div className="ranking-label">Publication Status</div>
                                        </div>
                                    </div>
                                    <div className="ranking-card">
                                        <div className="ranking-icon">🔢</div>
                                        <div className="ranking-content">
                                            <div className="ranking-value">{country.serial || 'N/A'}</div>
                                            <div className="ranking-label">Display Order</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {country.countryFlg?.publicId || country.famousFile?.publicId ? (
                                <div className="detail-section">
                                    <h3 className="section-title">Media Assets</h3>
                                    <div className="metadata-grid">
                                        {country.countryFlg?.publicId && (
                                            <div className="metadata-item">
                                                <span className="meta-label">Flag Image ID:</span>
                                                <span className="meta-value">{country.countryFlg.publicId}</span>
                                            </div>
                                        )}
                                        {country.famousFile?.publicId && (
                                            <div className="metadata-item">
                                                <span className="meta-label">Featured Image ID:</span>
                                                <span className="meta-value">{country.famousFile.publicId}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CountryDetails