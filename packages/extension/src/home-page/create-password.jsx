import {PureComponent} from 'react';
import {Button, FormGroup, InputGroup, Checkbox, Intent} from '@blueprintjs/core';
// import {Navigate, useSearchParams} from 'react-router-dom';

import {Main} from './layout';

export default class CreatePassword extends PureComponent {
	state = {
		agreeToTerms: false,
		password: '',
		confirmPassword: '',
	};
	onPassswordChange = e => {
		this.setState({password: e.target.value});
	};
	onConfirmPassswordChange = e => {
		this.setState({confirmPassword: e.target.value});
	};
	handleEnabledChange = () => {
		this.setState({agreeToTerms: !this.state.agreeToTerms});
	};
	onSubmit = async () => {
		const {password} = this.state;
		console.log('create password', password);
		const {createNewAccount} = this.props;

		try {
			const seedPhrase = await createNewAccount(password);
			this.setState({seedPhrase});
		} catch (error) {
			throw new Error(error.message);
		}
	};
	render() {
		const {password, confirmPassword, agreeToTerms} = this.state;
		const passwordValid = password.length >= 8;
		const confirmPasswordValid = password === confirmPassword;
		const valid = password === confirmPassword && agreeToTerms;
		return (
			<Main className="form-place">
				<div className="title">Create Password</div>
				<div className="form">
					<FormGroup label="New password" labelInfo="(min 8 chars)" labelFor="password">
						<InputGroup
							type="password"
							intent={!password ? Intent.NONE : passwordValid ? Intent.SUCCESS : Intent.DANGER}
							id="password"
							value={password}
							large
							onChange={this.onPassswordChange}
						/>
					</FormGroup>
					<FormGroup label="Confirm password" labelFor="confirm-password">
						<InputGroup
							type="password"
							id="confirm-password"
							value={confirmPassword}
							intent={!confirmPassword ? Intent.NONE : confirmPasswordValid ? Intent.SUCCESS : Intent.DANGER}
							large
							onChange={this.onConfirmPassswordChange}
						/>
					</FormGroup>
					<Checkbox
						large
						checked={agreeToTerms}
						labelElement={
							<span>
								I have read and agree to the <a>Terms of Service</a>
							</span>
						}
						onChange={this.handleEnabledChange}
					/>
					<div className="footer">
						<Button disabled={!(valid && !!password)} large intent={Intent.PRIMARY} onClick={this.onSubmit}>
							<span>Create</span>
						</Button>
					</div>
				</div>
			</Main>
		);
	}
}
