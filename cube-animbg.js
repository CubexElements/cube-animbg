import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@webcomponents/shadycss/apply-shim.min.js';
import './cube-hex.js';

/**
 Cubex- Animated Background

 Default Usage Example:

 <cube-animbg></cube-animbg>

 Add Custom Colour Example (any valid CSS background value):

 <cube-animbg color="red"></cube-animbg>

 Fill Containing Element Example:

 <cube-animbg fill></cube-animbg>

 Polygon Rotation Speed Example:

 <cube-animbg speed="8000"></cube-animbg>

 Define Fixed Polygon Size Example (polygon size = size):

 <cube-animbg size="200" fixed-size></cube-animbg>

 Define Dynamic Polygon Size Example (polygon size = (canvas.width + canvas.height) / size):

 <cube-animbg size="5"></cube-animbg>

 Default Polygon Size = (canvas.width + canvas.height) / 20)

 @demo demo/index.html
 */
class CubeAnimatedBackground extends PolymerElement {
  static get is() {return 'cube-animbg'}

  static get template()
  {
    return html`<style>
      :host {
        position: relative;
        display: inline-block;
        background-color: var(--cube-animbg-background-color);

        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }

      #overflowContainer {
        position: absolute;
        overflow: hidden;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
      }

      #contentContainer {
        position: relative;
      }

      #hexContainer {
        position: absolute;
        top: calc(var(--cube-hex-size) / 3 * -1);
        right: calc(var(--cube-hex-size) / 3 * -1);
        bottom: calc(var(--cube-hex-size) / 3 * -1);
        left: calc(var(--cube-hex-size) / 3 * -1);
      }

      #hexContainer > div {
        white-space: nowrap;
      }

      #hexContainer > div:nth-of-type(2n) {
        margin-left: calc(((var(--cube-hex-size) / 2) + var(--cube-hex-margin, 5px)) * -1);
      }
    </style>

    <div id="overflowContainer">
      <div id="hexContainer"></div>
    </div>
    <div id="contentContainer">
      <slot></slot>
    </div>`
  }

  static get properties()
  {
    return {
      color:      {
        type:     String,
        observer: '_colorChanged'
      },
      background: {
        type:     String,
        observer: '_backgroundChanged'
      },
      size:       {
        type:     Number,
        value:    80,
        observer: '_sizeChanged'
      },
      speed:      {
        type:  String,
        value: '8000'
      },
      strength:   {
        type:     Number,
        value:    1,
        notify:   true,
        observer: '_strengthChanged'
      }
    }
  }

  connectedCallback()
  {
    super.connectedCallback();
    this.redraw();
  }

  redraw()
  {
    let firstNode;
    while(firstNode = this.$.hexContainer.firstChild)
    {
      this.$.hexContainer.removeChild(firstNode);
    }

    let frag = document.createDocumentFragment();
    let currentHeight = 0;
    while(currentHeight < this.clientHeight + this.size)
    {
      let currentWidth = 0;
      let rowEle = document.createElement('div');
      while(currentWidth < this.clientWidth + this.size)
      {
        let ele = document.createElement('cube-hex');
        rowEle.appendChild(ele);
        currentWidth += this.size;
      }
      currentHeight += this.size;
      frag.appendChild(rowEle);
    }
    this.$.hexContainer.appendChild(frag);
  }

  _sizeChanged(newVal)
  {
    this.updateStyles({'--cube-hex-size': newVal + 'px'});
    this.redraw();
  }

  _colorChanged(newVal)
  {
    this.updateStyles({'--cube-hex-color': newVal});
  }

  _backgroundChanged(newVal)
  {
    this.updateStyles({'--cube-animbg-background-color': newVal});
  }

  _strengthChanged(newVal)
  {
    this.updateStyles({'--cube-hex-strength': newVal});
  }
}

customElements.define(CubeAnimatedBackground.is, CubeAnimatedBackground);