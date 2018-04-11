import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

class CubeHex extends PolymerElement {
  static get is() {return 'cube-hex'}

  static get template()
  {
    return html`
    <style>
      :host {
        --cube-hex-width: var(--cube-hex-size, 30px);
        --cube-hex-height: calc(var(--cube-hex-width) * 0.577333333333333);
        
        color: var(--cube-hex-color, red);
        position: relative;
        width: var(--cube-hex-width);
        height: var(--cube-hex-height);
        background: currentColor;
        display: inline-block;
        opacity: calc(var(--cube-hex-strength, 20) / 100);
        margin: calc((var(--cube-hex-height) / 5) + var(--cube-hex-margin, 5px)) var(--cube-hex-margin, 5px);

        animation-name: fade;
        animation-delay: var(--cube-hex-delay);
        animation-duration: var(--cube-hex-duration);
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-fill-mode: both;

        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }

      :host:before,
      :host:after {
        content: "";
        position: absolute;
        width: 0;
        border-left: calc(var(--cube-hex-width) / 2) solid transparent;
        border-right: calc(var(--cube-hex-width) / 2) solid transparent;
      }

      :host:before {
        bottom: 100%;
        border-bottom: calc(var(--cube-hex-height) / 2) solid currentColor;
      }

      :host:after {
        top: 100%;
        width: 0;
        border-top: calc(var(--cube-hex-height) / 2) solid currentColor;
      }

      @keyframes fade {
        from {
          opacity: 0.05;
        }
      }
    </style>`;
  }

  connectedCallback()
  {
    super.connectedCallback();
    this.updateStyles(
      {
        '--cube-hex-delay':    (Math.random() * 3000).toFixed(2) + 'ms',
        '--cube-hex-duration': (500 + (Math.random() * 1500)).toFixed(2) + 'ms'
      }
    );
  }
}

customElements.define(CubeHex.is, CubeHex);