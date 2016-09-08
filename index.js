import sinon from 'sinon';

// setup spies
const watchError = () => sinon.spy(console, 'error');

const watchWarn = () => sinon.spy(console, 'warn');

const watchErrorAndWarnings = () => {
	watchError();
	watchWarn();
};

// Get PropType Warnings
const getPropWarnings = (regex, consoleObj) => {
	if (consoleObj.args.length > 0) {
		return consoleObj.args[0].filter((message) => {
			return (
				message
				&& message.length > 0
				&& regex.test(message)
			);
		});
	} else {
		return [];
	}
};

const propErrors = (regex) => getPropWarnings(regex, console.error);

const propWarnings = (regex) => getPropWarnings(regex, console.warn);

const propErrorAndWarnings = (regex) =>
	propWarnings(regex).concat(propErrors(regex));

// Remove Spies & Restore Functions
const restoreError = () => console.error.restore();

const restoreWarn = () => console.warn.restore();

const restoreErrorAndWarnings = () => {
	restoreError();
	restoreWarn();
};

export {
	watchWarn,
	watchError,
	watchErrorAndWarnings,
	propWarnings,
	propErrors,
	propErrorAndWarnings,
	restoreError,
	restoreWarn,
	restoreErrorAndWarnings
};
