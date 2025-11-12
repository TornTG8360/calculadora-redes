import React from "react";

function LandingPageOwner({ onStartCalculator }) {
    const programmingLanguages = [
        { name: "Python", level: 70 },
        { name: "Java", level: 80 },
        { name: "Javascript", level: 85 }
    ];

    const languages = [
        { name: "Inglés", level: 80 },
        { name: "Francés", level: 20 },
        { name: "Alemán", level: 10 }
    ];

    const courses = [
        { name: "JavaScript TOTAL - De Cero a Programador Web en 19 Días", provider: "Federico Garay, Escuela Directa", status: "100% completado" },
        { name: "Python TOTAL - Programador Avanzado en 16 días", provider: "Federico Garay, Escuela Directa", status: "100% completado" }
    ];

    const certifications = [
        { name: "Scrum Foundation Professional Certification", provider: "CertiProf", status: "Certificado" }
    ];

    const systemsEngineering = [
        { skill: "Diseño de Arquitectura de Software" },
        { skill: "Gestión de Proyectos de TI" },
        { skill: "Administración de Bases de Datos" },
        { skill: "Administración de Redes" },
        { skill: "Programación y Desarrollo de Software" }
    ];

    return (
        <div className="landing-wrapper">
            <div className="calculadora landing-calculadora">
                <h1 className="titulo-principal">Calculadora de Direcciones IP</h1>
                
                <div className="landing-content">
                    <div className="resultados">
                        <h3>Acerca del Desarrollador</h3>
                        <p><strong>Nombre:</strong> Daniel Sebastián Castro Figueredo</p>
                        <p><strong>Profesión:</strong> Estudiante de Ingeniería de Sistemas - Universidad El Bosque - 6to Semestre</p>
                        
                        <div className="skills-section">
                            <h4>Lenguajes de Programación</h4>
                            <div className="skills-container">
                                {programmingLanguages.map((lang, index) => (
                                    <div key={index} className="skill-item">
                                        <div className="skill-header">
                                            <span className="skill-name">{lang.name}</span>
                                            <span className="skill-percentage">{lang.level}%</span>
                                        </div>
                                        <div className="skill-bar">
                                            <div className="skill-progress" style={{ width: `${lang.level}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="skills-section">
                            <h4>Manejo de Idiomas</h4>
                            <div className="skills-container">
                                {languages.map((lang, index) => (
                                    <div key={index} className="skill-item">
                                        <div className="skill-header">
                                            <span className="skill-name">{lang.name}</span>
                                            <span className="skill-percentage">{lang.level}%</span>
                                        </div>
                                        <div className="skill-bar">
                                            <div className="skill-progress" style={{ width: `${lang.level}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="skills-section">
                            <h4>Cursos Completados</h4>
                            <div className="courses-container">
                                {courses.map((course, index) => (
                                    <div key={index} className="course-item">
                                        <p><strong>{course.name}</strong></p>
                                        <p className="course-provider">{course.provider}</p>
                                        <p className="course-status">✓ {course.status}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="skills-section">
                            <h4>Certificaciones</h4>
                            <div className="certifications-container">
                                {certifications.map((cert, index) => (
                                    <div key={index} className="certification-item">
                                        <p><strong>{cert.name}</strong></p>
                                        <p className="certification-provider">{cert.provider}</p>
                                        <p className="certification-status">✓ {cert.status}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="skills-section">
                            <h4>Habilidades:</h4>
                            <div className="systems-engineering-container">
                                {systemsEngineering.map((item, index) => (
                                    <div key={index} className="engineering-item">
                                        <span className="engineering-skill">• {item.skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={onStartCalculator} className="landing-button">
                    Comenzar a Calcular
                </button>
            </div>
        </div>
    );
}

export default LandingPageOwner;
