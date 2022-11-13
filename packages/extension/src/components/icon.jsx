import {PureComponent} from 'react';
import jazzicon from 'jazzicon';

// parseInt('0xb4124cEB3451635DAcedd11767f004d8a28c6eE7'.slice(2, 10), 16);

const jassiconFromAddress = (diameter, address) => jazzicon(diameter, parseInt(address.slice(2, 10), 16));

class Jazzicon extends PureComponent {
	static defaultProps = {
		diameter: 46,
	};
	container = null;
	componentDidMount() {
		this.appendIcon();
	}
	componentDidUpdate(prevProps) {
		const {address: prevAddress, diameter: prevDiameter} = prevProps;
		const {address, diameter} = this.props;

		if (address !== prevAddress || diameter !== prevDiameter) {
			this.clearChildren();
			this.appendJazzicon();
		}
	}
	appendIcon = () => {
		const {diameter, address = '0xabc'} = this.props;
		const icon = jassiconFromAddress(diameter, address);
		this.container && this.container.appendChild(icon);
	};
	clearChildren = () => {
		if (this.container) {
			const {children} = this.container;
			for (let i = 0; i < children.length; i++) {
				this.container.removeChild(children[i]);
			}
		}
	};
	cRef = el => {
		this.container = el;
	};
	render() {
		const {className, style} = this.props;
		return <div className={className} style={style} ref={this.cRef} />;
	}
}

export {Jazzicon};
