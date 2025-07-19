'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import axios from 'axios';
import { url } from '@/config';
import Layout from '@/components/Layout';

interface UserData {
  name: string;
  email: string;
  phone: string;
  password: string;
  profilePicture: string;
  resume: string;
  experience: Experience[];
  skills: string[];
  courses: Course[];
  certifications: Certification[];
  id: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

interface Course {
  id: string;
  name: string;
  institution: string;
  completionDate: string;
  certificate: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
}

const TECH_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express.js',
  'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 'C++', 'C#', '.NET',
  'PHP', 'Laravel', 'Ruby', 'Ruby on Rails', 'Go', 'Rust', 'Swift',
  'Kotlin', 'Dart', 'Flutter', 'React Native', 'Vue.js', 'Angular',
  'HTML', 'CSS', 'SCSS', 'Tailwind CSS', 'Bootstrap', 'Material-UI',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite', 'Firebase',
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Git',
  'GraphQL', 'REST APIs', 'Microservices', 'DevOps', 'CI/CD',
  'Machine Learning', 'TensorFlow', 'PyTorch', 'Data Science',
  'Blockchain', 'Solidity', 'Unity', 'Unreal Engine'
];

const MyComponent = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    profilePicture: '',
    resume: '',
    experience: [],
    skills: [],
    courses: [],
    certifications: [],
    id: ''
  });

  const [editMode, setEditMode] = useState({
    personal: false,
    experience: false,
    skills: false,
    courses: false,
    certifications: false
  });

  const [newSkill, setNewSkill] = useState('');
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState(TECH_SKILLS);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${url}/api/get_user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const user = response.data.user;
      if (user) {
        setUserData({
          name: user.username || '',
          email: user.email || '',
          phone: user.phone || '',
          password: '********',
          profilePicture: user.profilePicture || '',
          resume: user.resume || '',
          experience: user.experience || [],
          skills: user.skills || [],
          courses: user.courses || [],
          certifications: user.certifications || [],
          id: user._id || ''
        });
        localStorage.setItem('userId', user._id || '');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const calculateProfileCompletion = () => {
    const fields = [
      userData.name,
      userData.email,
      userData.phone,
      userData.profilePicture,
      userData.resume,
      userData.experience.length > 0 ? 'yes' : '',
      userData.skills.length > 0 ? 'yes' : '',
      userData.courses.length > 0 ? 'yes' : '',
      userData.certifications.length > 0 ? 'yes' : ''
    ];
    
    const completedFields = fields.filter(field => field !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'resume') => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(`Uploading ${type}:`, file);
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(`${url}/upload_${type}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          setUserData(prev => ({
            ...prev,
            [type === 'profile' ? 'profilePicture' : 'resume']: response.data.url
          }));
        }
      } catch (error) {
        
      }
    }
  };

  const handleAddSkill = async (skill: string) => {
    // if (skill && !userData.skills.includes(skill)) {
    //   setUserData(prev => ({
    //     ...prev,
    //     skills: [...prev.skills, skill]
    //   }));
    // }
    // setNewSkill('');
    // setShowSkillDropdown(false);
    try {
      const res = await axios.post(`${url}/add_skill`, {'skill': skill}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      if(res.data.success){
        fetchUserData();
        setNewSkill('');
        setShowSkillDropdown(false);
      }
    } catch (error) {
      console.log("error while adding a skill", error);
    }
  };

  const handleRemoveSkill = async (skillToRemove: string) => {
    // setUserData(prev => ({
    //   ...prev,
    //   skills: prev.skills.filter(skill => skill !== skillToRemove)
    // }));
    try {
      const res = await axios.post(`${url}/remove_skill`, {'skill': skillToRemove},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      if(res.data.success){
        fetchUserData();
      }
    } catch (error) {
      console.log('error while removing the skill', error)
    }
  };

  const handleSkillSearch = (value: string) => {
    setNewSkill(value);
    setFilteredSkills(TECH_SKILLS.filter(skill => 
      skill.toLowerCase().includes(value.toLowerCase()) && 
      !userData.skills.includes(skill)
    ));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    };
    setUserData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const addExperienceToBackend = async () => {
    try {
      let experience = userData.experience;
      const res = await axios.post(`${url}/add_experience`, {'experience':experience},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      if(res.data.success){
        console.log('experience added successfully');
      }
    } catch (error) {
      console.log(`error while adding experience: ${error}`)
    }
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setUserData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setUserData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: '',
      institution: '',
      completionDate: '',
      certificate: ''
    };
    setUserData(prev => ({
      ...prev,
      courses: [...prev.courses, newCourse]
    }));
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setUserData(prev => ({
      ...prev,
      courses: prev.courses.map(course => 
        course.id === id ? { ...course, [field]: value } : course
      )
    }));
  };

  const handleAddCourse = async () =>{
    try {
      const res= await axios.post(`${url}/add_course`, {'courses': userData['courses']}, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        fetchUserData();
      }
    } catch (error) {
      console.log("error while adding courses", error);
    }
  }

  const removeCourse = (id: string) => {
    setUserData(prev => ({
      ...prev,
      courses: prev.courses.filter(course => course.id !== id)
    }));
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: ''
    };
    setUserData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setUserData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertification = (id: string) => {
    setUserData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  const handleAddCertification = async () =>{
    try {
      const res= await axios.post(`${url}/add_certification`, {'certifications': userData['certifications']}, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        fetchUserData();
      }
    } catch (error) {
      console.log("error while adding certifications", error);
    }
  }

  const completionPercentage = calculateProfileCompletion();

  return (
    <Layout>
      <div className={styles.container}>
        {/* Profile Completion Badge */}
        <div className={styles.completionBadge}>
          <div className={styles.completionCircle}>
            <div 
              className={styles.completionFill}
              style={{ 
                background: `conic-gradient(#4CAF50 ${completionPercentage * 3.6}deg, #e0e0e0 0deg)` 
              }}
            >
              <div className={styles.completionInner}>
                <span className={styles.completionText}>{completionPercentage}%</span>
              </div>
            </div>
          </div>
          <div className={styles.completionInfo}>
            <h3>Profile Completion</h3>
            <p>Complete your profile to get better opportunities</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Personal Information</h2>
            <button 
              className={styles.editBtn}
              onClick={() => setEditMode(prev => ({ ...prev, personal: !prev.personal }))}
            >
              {editMode.personal ? 'Save' : 'Edit'}
            </button>
          </div>

          <div className={styles.personalInfo}>
            <div className={styles.profilePictureSection}>
              <div className={styles.profilePicture}>
                {userData.profilePicture ? (
                  <img src={`${url}${userData.profilePicture}`} alt="Profile" />
                ) : (
                  <div className={styles.placeholderPicture}>
                    <span>+</span>
                    <p>Add Photo</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'profile')}
                className={styles.fileInput}
                id="profile-upload"
              />
              <label htmlFor="profile-upload" className={styles.uploadBtn}>
                {userData.profilePicture ? 'Change Photo' : 'Upload Photo'}
              </label>
            </div>

            <div className={styles.infoFields}>
              <div className={styles.field}>
                <label>Name</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  disabled={!editMode.personal}
                  placeholder="Enter your name"
                />
              </div>

              <div className={styles.field}>
                <label>Email</label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!editMode.personal}
                  placeholder="Enter your email"
                />
              </div>

              <div className={styles.field}>
                <label>Phone</label>
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!editMode.personal}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className={styles.field}>
                <label>Password</label>
                <input
                  type="password"
                  value={userData.password}
                  disabled
                  placeholder="********"
                />
                <button className={styles.changePasswordBtn}>Change Password</button>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Resume</h2>
          </div>
          <div className={styles.resumeSection}>
            {userData.resume ? (
              <div className={styles.resumeItem}>
                <span>{userData['resume'].split('/media/68570f5948d0edb55b27e09f/resumes/')}</span>
                <button className={styles.updateBtn}>Update Resume</button>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>No resume uploaded</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'resume')}
                  className={styles.fileInput}
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className={styles.uploadBtn}>
                  Upload Resume
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Experience Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Experience</h2>
            <button className={styles.addBtn} onClick={addExperience}>
              + Add Experience
            </button>
          </div>

          {userData.experience.length > 0 ? (
            <div className={styles.experienceList}>
              {userData.experience.map((exp) => (
                <div key={exp.id} className={styles.experienceItem}>
                  <div className={styles.experienceFields}>
                    <div className={styles.fieldRow}>
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      />
                    </div>
                    <div className={styles.fieldRow}>
                      <input
                        type="date"
                        placeholder="Start Date"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      />
                      <input
                        type="date"
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        disabled={exp.current}
                      />
                      <label className={styles.checkbox}>
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                        />
                        Currently working
                      </label>
                    </div>
                    <textarea
                          style={{color:'black'}}
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    />
                  </div>
                  <button 
                    className={styles.removeBtn}
                    onClick={() => removeExperience(exp.id)}
                  >
                    Remove
                  </button>
                  <button 
                    style={{marginLeft:"20px"}}
                    className={styles.addBtn}
                    onClick={() => addExperienceToBackend()}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No experience added yet</p>
              <button className={styles.addBtn} onClick={addExperience}>
                Add Your First Experience
              </button>
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Skills</h2>
          </div>

          <div className={styles.skillsSection}>
            <div className={styles.skillsInput}>
              <input
                type="text"
                placeholder="Search and add skills..."
                value={newSkill}
                onChange={(e) => handleSkillSearch(e.target.value)}
                onFocus={() => setShowSkillDropdown(true)}
              />
              {showSkillDropdown && (
                <div className={styles.skillsDropdown}>
                  {filteredSkills.slice(0, 10).map(skill => (
                    <div
                      key={skill}
                      className={styles.skillOption}
                      onClick={() => handleAddSkill(skill)}
                    >
                      {skill}
                    </div>
                  ))}
                  {newSkill && !TECH_SKILLS.includes(newSkill) && (
                    <div
                      className={styles.skillOption}
                      onClick={() => handleAddSkill(newSkill)}
                    >
                      Add "{newSkill}"
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={styles.skillsList}>
              {userData.skills.map(skill => (
                <div key={skill} className={styles.skillTag}>
                  <span>{skill}</span>
                  <button onClick={() => handleRemoveSkill(skill)}>×</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Courses</h2>
            <button className={styles.addBtn} onClick={addCourse}>
              + Add Course
            </button>
          </div>

          {userData.courses.length > 0 ? (
            <div className={styles.coursesList}>
              {userData.courses.map((course) => (
                <div key={course.id} className={styles.courseItem}>
                  <div className={styles.courseFields}>
                    <input
                      type="text"
                      placeholder="Course Name"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Institution"
                      value={course.institution}
                      onChange={(e) => updateCourse(course.id, 'institution', e.target.value)}
                    />
                    <input
                      type="date"
                      placeholder="Completion Date"
                      value={course.completionDate}
                      onChange={(e) => updateCourse(course.id, 'completionDate', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Certificate URL (optional)"
                      value={course.certificate}
                      onChange={(e) => updateCourse(course.id, 'certificate', e.target.value)}
                    />
                  </div>
                  <button 
                    className={styles.removeBtn}
                    onClick={() => removeCourse(course.id)}
                  >
                    Remove
                  </button>
                  <button 
                    className={styles.addBtn}
                    onClick={() => handleAddCourse()}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No courses added yet</p>
              <button className={styles.addBtn} onClick={addCourse}>
                Add Your First Course
              </button>
            </div>
          )}
        </div>

        {/* Certifications Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Certifications</h2>
            <button className={styles.addBtn} onClick={addCertification}>
              + Add Certification
            </button>
          </div>

          {userData.certifications.length > 0 ? (
            <div className={styles.certificationsList}>
              {userData.certifications.map((cert) => (
                <div key={cert.id} className={styles.certificationItem}>
                  <div className={styles.certificationFields}>
                    <input
                      type="text"
                      placeholder="Certification Name"
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Issuer"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                    />
                    <input
                      type="date"
                      placeholder="Issue Date"
                      value={cert.issueDate}
                      onChange={(e) => updateCertification(cert.id, 'issueDate', e.target.value)}
                    />
                    <input
                      type="date"
                      placeholder="Expiry Date (optional)"
                      value={cert.expiryDate}
                      onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Credential ID (optional)"
                      value={cert.credentialId}
                      onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                    />
                  </div>
                  <button 
                    className={styles.removeBtn}
                    onClick={() => removeCertification(cert.id)}
                  >
                    Remove
                  </button>
                  <button 
                    className={styles.addBtn}
                    onClick={() => handleAddCertification()}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No certifications added yet</p>
              <button className={styles.addBtn} onClick={addCertification}>
                Add Your First Certification
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyComponent;