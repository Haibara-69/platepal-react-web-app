import React from 'react';

const TeamGithub: React.FC = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Meet the Team</h1>
            <p>
                <h4>Yile Li & Yiqun Cao</h4>
            </p>
            <h2>GitHub Repository</h2>
            <p>
                <a 
                    href="https://github.com/lyle95/platepal-node-server-app.git" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'blue', textDecoration: 'underline' }}
                >
                    Node Serveice GitHub Repository
                </a>
                <br />
                <a 
                    href="https://github.com/Haibara-69/platepal-react-web-app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'blue', textDecoration: 'underline' }}
                >
                    React web GitHub Repository
                </a>
            </p>
        </div>
    );
};

export default TeamGithub;
