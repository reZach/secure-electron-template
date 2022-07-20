import React from "react";
import ROUTES from "Constants/routes";
import { useNavigate } from "react-router-dom";
import {
  validateLicenseRequest,
  validateLicenseResponse,
} from "secure-electron-license-keys";

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileMenuActive: false,
      licenseModalActive: false,

      // license-specific
      licenseValid: false,
      allowedMajorVersions: "",
      allowedMinorVersions: "",
      appVersion: "",
      licenseExpiry: "",
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleLicenseModal = this.toggleLicenseModal.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  componentWillUnmount() {
    window.api.licenseKeys.clearRendererBindings();
  }

  componentDidMount() {
    // Set up binding to listen when the license key is
    // validated by the main process
    const _ = this;

    window.api.licenseKeys.onReceive(validateLicenseResponse, function (data) {
      // If the license key/data is valid
      if (data.success) {
        // Here you would compare data.appVersion to
        // data.major, data.minor and data.patch to
        // ensure that the user's version of the app
        // matches their license
        _.setState({
          licenseValid: true,
          allowedMajorVersions: data.major,
          allowedMinorVersions: data.minor,
          allowedPatchVersions: data.patch,
          appVersion: data.appVersion,
          licenseExpiry: data.expire,
        });
      } else {
        _.setState({
          licenseValid: false,
        });
      }
    });
  }

  toggleMenu(_event) {
    this.setState({
      mobileMenuActive: !this.state.mobileMenuActive,
    });
  }

  toggleLicenseModal(_event) {
    const previous = this.state.licenseModalActive;

    // Only send license request if the modal
    // is not already open
    if (!previous) {
      window.api.licenseKeys.send(validateLicenseRequest);
    }

    this.setState({
      licenseModalActive: !this.state.licenseModalActive,
    });
  }

  // Using a custom method to navigate because we
  // need to close the mobile menu if we navigate to
  // another page
  navigate(url) {
    this.setState(
      {
        mobileMenuActive: false,
      },
      function () {
        this.props.navigate(url);
      }
    );
  }

  renderLicenseModal() {
    return (
      <div
        className={`modal ${this.state.licenseModalActive ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          {this.state.licenseValid ? (
            <div className="box">
              The license key for this product has been validated and the
              following versions of this app are allowed for your use:
              <div>
                <strong>Major versions:</strong>{" "}
                {this.state.allowedMajorVersions} <br />
                <strong>Minor versions:</strong>{" "}
                {this.state.allowedMinorVersions} <br />
                <strong>Patch versions:</strong>{" "}
                {this.state.allowedPatchVersions} <br />
                <strong>Expires on:</strong>{" "}
                {!this.state.licenseExpiry
                  ? "never!"
                  : this.state.licenseExpiry}{" "}
                <br />(
                <em>
                  App version:
                  {` v${this.state.appVersion.major}.${this.state.appVersion.minor}.${this.state.appVersion.patch}`}
                </em>
                )
                <br />
              </div>
            </div>
          ) : (
            <div className="box">
              <div>The license key is not valid.</div>
              <div>
                If you'd like to create a license key, follow these steps:
                <ol style={{ marginLeft: "30px" }}>
                  <li>
                    Install this package globally (
                    <strong>npm i secure-electron-license-keys-cli -g</strong>).
                  </li>
                  <li>
                    Run <strong>secure-electron-license-keys-cli</strong>.
                  </li>
                  <li>
                    Copy <strong>public.key</strong> and{" "}
                    <strong>license.data</strong> into the <em>root</em> folder
                    of this app.
                  </li>
                  <li>
                    Re-run this app (ie. <strong>npm run dev</strong>).
                  </li>
                  <li>
                    If you'd like to further customize your license keys, copy
                    this link into your browser:{" "}
                    <a href="https://github.com/reZach/secure-electron-license-keys-cli">
                      https://github.com/reZach/secure-electron-license-keys-cli
                    </a>
                    .
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={this.toggleLicenseModal}></button>
      </div>
    );
  }

  render() {
    return (
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation">
        <div className="navbar-brand">
          <a
            role="button"
            className={`navbar-burger ${
              this.state.mobileMenuActive ? "is-active" : ""
            }`}
            data-target="navbarBasicExample"
            aria-label="menu"
            aria-expanded="false"
            onClick={this.toggleMenu}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          id="navbarBasicExample"
          className={`navbar-menu ${
            this.state.mobileMenuActive ? "is-active" : ""
          }`}>
          <div className="navbar-start">
            <a
              className="navbar-item"
              onClick={() => this.navigate(ROUTES.WELCOME)}>
              Home
            </a>

            <a
              className="navbar-item"
              onClick={() => this.navigate(ROUTES.ABOUT)}>
              About
            </a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Sample pages</a>

              <div className="navbar-dropdown">
                <a
                  className="navbar-item"
                  onClick={() => this.navigate(ROUTES.MOTD)}>
                  Using the Electron store
                </a>
                <a
                  className="navbar-item"
                  onClick={() => this.navigate(ROUTES.LOCALIZATION)}>
                  Changing locales
                </a>
                <a
                  className="navbar-item"
                  onClick={() => this.navigate(ROUTES.UNDOREDO)}>
                  Undo/redoing actions
                </a>
                <a
                  className="navbar-item"
                  onClick={() => this.navigate(ROUTES.CONTEXTMENU)}>
                  Custom context menu
                </a>
                <a
                  className="navbar-item"
                  onClick={() => this.navigate(ROUTES.IMAGE)}>
                  Sample image loaded
                </a>
              </div>
            </div>
          </div>
          {this.renderLicenseModal()}
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a
                  className="button is-light"
                  onClick={this.toggleLicenseModal}>
                  Check license
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function WithNavigate(props){
  const navigate = useNavigate();
  return <Nav {...props} navigate={navigate} />
}

export default WithNavigate;
