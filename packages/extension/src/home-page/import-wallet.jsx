import {PureComponent} from 'react';
import {Button, FormGroup, InputGroup, TextArea, Checkbox, Intent} from '@blueprintjs/core';
// import {Navigate, useSearchParams} from 'react-router-dom';

import {Main} from './layout';

export default class ImportWallet extends PureComponent {
	state = {
		secrentRecoveryPhrase: '',
		showSecretRecoveryPhrase: false,
		password: '',
		confirmPassword: '',
		agreeToTerms: false,
	};
	onSecretRecoveryPhraseChange = e => {
		this.setState({secrentRecoveryPhrase: e.target.value});
	};
	handleShowSecretRecoveryPhraseChange = () => {
		this.setState({showSecretRecoveryPhrase: !this.state.showSecretRecoveryPhrase});
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
	render() {
		const {secrentRecoveryPhrase, showSecretRecoveryPhrase, password, confirmPassword, agreeToTerms} = this.state;
		const validSecret = [12, 15, 18, 21, 24].includes((secrentRecoveryPhrase || '').split(/\s+/).length);
		const passwordValid = password.length >= 8;
		const confirmPasswordValid = password === confirmPassword;
		const valid = password === confirmPassword && agreeToTerms;
		return (
			<Main className="form-place">
				<div className="title">Import a wallet with Secret Recovery Phrase</div>
				<div className="description">
					Only the first account on this wallet will auto load. After completing this process, to add additional accounts,
					click the drop down menu, then select Create Account.
				</div>
				<div className="form">
					<FormGroup label="Secret Recovery Phrase">
						{showSecretRecoveryPhrase ? (
							<TextArea
								growVertically={true}
								fill
								intent={!secrentRecoveryPhrase ? Intent.NONE : validSecret ? Intent.SUCCESS : Intent.DANGER}
								value={secrentRecoveryPhrase}
								large
								onChange={this.onSecretRecoveryPhraseChange}
							/>
						) : (
							<InputGroup
								type="password"
								intent={!secrentRecoveryPhrase ? Intent.NONE : validSecret ? Intent.SUCCESS : Intent.DANGER}
								value={secrentRecoveryPhrase}
								large
								onChange={this.onSecretRecoveryPhraseChange}
							/>
						)}
					</FormGroup>
					<Checkbox
						large
						checked={showSecretRecoveryPhrase}
						label="Show Secret Recovery Phrase"
						onChange={this.handleShowSecretRecoveryPhraseChange}
					/>
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
