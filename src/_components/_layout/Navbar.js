import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-light mb-4">
        <div className="container">
          <div className="collapse navbar-collapse" id="mobile-nav">
            {/* liquid studio logo - redirect to the liquid studio home page */}
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="navbar-brand" href="https://www.accenture.com/ca-en/capability-rapid-application-development-studio">
                  <img
                    className="rounded-circle"
                    src={require('../../_img/acc_lqd_std.png')}
                    alt="Logo"
                    style={{ width: '25px', marginRight: '0px' }}
                    title="Accenture Liquid Studio"
                  />
                </a>
              </li>
            </ul>
            {/* accenture logo - redirect to accenture home page */}
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="navbar-brand" href="https://www.accenture.com/ca-en/new-applied-now">
                      <img
                        src={require('../../_img/acc_logo_blk_prpl.png')}
                        alt="Logo"
                        style={{ width: '100px', marginRight: '5px' }}
                        title="Accenture"
                      />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
