# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


<Row className="g-4 mb-4">
        <Col>
          <Card className="box-card">
            <Card.Header className="activity-header">
              <h5 className="mb-0">Monthly Utilization Trend</h5>
            </Card.Header>
            <Card.Body>
              <div className="comparison-container">
                {monthlyData.map((item, index) => (
                  <div key={index} className="comparison-item">
                    <div className="comparison-header">
                      <span className="comparison-label">{item.month}</span>
                      <span className="comparison-value">{item.value}%</span>
                    </div>
                    <div className="comparison-bar-container">
                      <div 
                        className="comparison-bar comparison-bar-blue"
                        style={{ width: `${item.value}%` }}
                      >
                        {item.value}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
//////////////////////////////////////////////////////////////////////
          footer
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="modern-footer">
      <Container>
        <Row className="align-items-center py-4">
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <h5 className="footer-brand">GANDEEVAN TECHNOLOGIES</h5>
            <p className="footer-tagline">GANDEEVAN TECHNOLOGIES</p>
          </Col>
          
          <Col md={4} className="text-center mb-3 mb-md-0">
            <p className="footer-copyright mb-0">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
            <small className="footer-made">
              Made with <FaHeart className="text-danger pulse-icon" /> by Your Team
            </small>
          </Col>
          
          <Col md={4} className="text-center text-md-end">
            <div className="social-links">
              <a href="#" className="social-icon">
                <FaGithub />
              </a>
              <a href="#" className="social-icon">
                <FaLinkedin />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;               