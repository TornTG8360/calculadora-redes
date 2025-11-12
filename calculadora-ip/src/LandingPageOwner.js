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

    return (
        <div className="landing-wrapper">
            <div className="calculadora landing-calculadora">
                <h1 className="titulo-principal">Calculadora de Direcciones IP</h1>
                
                <div className="landing-content">
                    <div className="resultados">
                        <h3>Acerca de Esta Aplicación</h3>
                        <p>
                            Esta calculadora te permite realizar cálculos detallados sobre direcciones IP,
                            máscaras de red, y visualizar información sobre subredes de forma clara y precisa.
                        </p>
                    </div>

                    <div className="resultados">
                        <h3>Acerca del Desarrollador</h3>
                        <p><strong>Nombre:</strong> Daniel Sebastián Castro Figueredo</p>
                        <p><strong>Profesión:</strong> Ingeniero de Sistemas de la Universidad El Bosque - 6to Semestre</p>
                        
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
