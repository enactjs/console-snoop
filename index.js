import sinon from 'sinon';

// setup spies
const watchError = () => sinon.spy(console, 'error');

const watchWarn = () => sinon.spy(console, 'warn');

const watchErrorAndWarnings = () => {
	watchError();
	watchWarn();
};

const getWarnings = (regex, consoleObj) => {
	if (consoleObj.args.length > 0) {
		return consoleObj.args[0].filter((message) => {
			if(regex){
				return (
					message
					&& message.length > 0
					&& regex.test(message)
				);
			}
			return (
				message
				&& message.length > 0
			);
		});
	} else {
		return [];
	}
};

const filterErrors = (regex) => getWarnings(regex, console.error);

const filterWarnings = (regex) => getWarnings(regex, console.warn);

const filterErrorAndWarnings = (regex) =>
	filterWarnings(regex).concat(filterErrors(regex));

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
	filterWarnings,
	filterErrors,
	filterErrorAndWarnings,
	restoreError,
	restoreWarn,
	restoreErrorAndWarnings
};
