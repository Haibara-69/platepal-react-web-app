// import React from 'react';

// const TeamGithub: React.FC = () => {
//     return (
//         <div style={{ padding: '20px', textAlign: 'center' }}>
//             <h1>Meet the Team</h1>
//             <p>
//                 <h4>Yile Li & Yiqun Cao</h4>
//             </p>
//             <h2>GitHub Repository</h2>
//             <p>
//                 <a 
//                     href="https://github.com/lyle95/platepal-node-server-app.git" 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     style={{ color: 'blue', textDecoration: 'underline' }}
//                 >
//                     Node Serveice GitHub Repository
//                 </a>
//                 <br />
//                 <a 
//                     href="https://github.com/Haibara-69/platepal-react-web-app" 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     style={{ color: 'blue', textDecoration: 'underline' }}
//                 >
//                     React web GitHub Repository
//                 </a>
//             </p>
//         </div>
//     );
// };

// export default TeamGithub;
import React, { CSSProperties } from 'react';

const TeamGithub: React.FC = () => {
    const containerStyle: CSSProperties = {
        padding: '40px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        color: '#333',
    };

    const headingStyle: CSSProperties = {
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#2c3e50',
        textTransform: 'uppercase',
    };

    const subHeadingStyle: CSSProperties = {
        fontSize: '1.5rem',
        marginBottom: '30px',
        color: '#34495e',
    };

    const teamNamesStyle: CSSProperties = {
        fontSize: '1.25rem',
        fontWeight: 600,
        marginBottom: '40px',
        color: '#34495e',
    };

    const linkStyle: CSSProperties = {
        color: '#3498db',
        textDecoration: 'none',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        transition: 'color 0.3s ease',
    };

    const linkHoverStyle: CSSProperties = {
        color: '#2980b9',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Meet the Team</h1>
            <p style={teamNamesStyle}>Yile Li(sec2) & Yiqun Cao(sec1)</p>
            <h2 style={subHeadingStyle}>GitHub Repositories</h2>
            <div>
                <p>
                    <a
                        href="https://github.com/lyle95/platepal-node-server-app.git"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={linkStyle}
                        onMouseOver={(e) => {
                            e.currentTarget.style.color = linkHoverStyle.color as string;
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.color = linkStyle.color as string;
                        }}
                    >
                        Node Service GitHub Repository
                    </a>
                </p>
                <p>
                    <a
                        href="https://github.com/Haibara-69/platepal-react-web-app"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={linkStyle}
                        onMouseOver={(e) => {
                            e.currentTarget.style.color = linkHoverStyle.color as string;
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.color = linkStyle.color as string;
                        }}
                    >
                        React Web GitHub Repository
                    </a>
                </p>
            </div>
        </div>
    );
};

export default TeamGithub;


